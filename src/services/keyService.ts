import KeyDao from "../repositories/dao/keyDao";
import { IKey } from "../interfaces/key/keyInterface";
import bycript from 'bcrypt';
import UserService from "./userService";
import CacheService from "./cacheService";

export default class KeyService {

    private keyDao: KeyDao;
    private cacheService: CacheService;
    
    constructor() {
        this.keyDao = new KeyDao();
        this.cacheService = new CacheService();
    }

    public async generateUniqueKey(length: number): Promise<string> {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*/+_@#$%&*';
        let key = '';

        for (let i = 0; i < length; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (await this.keyExists(key)) {
            return this.generateUniqueKey(length);
        }

        return key;
    }

    public async encriptKey(keyValue: string): Promise<string> {

        const salt = await bycript.genSalt(10);
        const encriptedKey = await bycript.hash(keyValue, salt);

        return encriptedKey;
    }

    public async compareKeys(key: string, hashedKey: string): Promise<boolean> {

        const equals = await bycript.compare(key, hashedKey);
        return equals;

    }

    public async createKey(keyData: IKey): Promise<IKey> {

        try {

            if (!keyData.value) {
                throw new Error('Chave não pode ser vazia');
            }

            else if (await this.keyExists(keyData.value)) {
                throw new Error('Chave já existe');
            }

            else {
                
                keyData.value = await this.encriptKey(keyData.value);

                const key = await this.keyDao.createKey(keyData);

                return key;
            }
        } catch (error) {
            throw new Error(`Erro ao criar chave: ${error}`);
        }
    }

    public async getKeyById(id: number): Promise<IKey | null> {
        try {
            const key = await this.keyDao.getKeyById(id);
            return key;
        } catch (error) {
            throw new Error(`Erro ao buscar chave por ID: ${error}`);
        }
    }

    public async getAllKeysByUserId(user_id: number): Promise<IKey[]> {
        try {
            const keys = await this.keyDao.getAllKeysByUserId(user_id);
            return keys;
        } catch (error) {
            throw new Error(`Erro ao buscar chaves por ID do usuário: ${error}`);
        }
    }

    public async updateKey(id: number, keyData: Partial<IKey>): Promise<IKey | null> {
        try {
            const key = await this.keyDao.updateKey(id, keyData);
            return key;
        } catch (error) {
            throw new Error(`Erro ao atualizar chave: ${error}`);
        }
    }

    public async deleteKey(id: number): Promise<void> {
        try {
            await this.keyDao.deleteKey(id);
        } catch (error) {
            throw new Error(`Erro ao excluir chave: ${error}`);
        }
    }

    public async keyExists(key: string): Promise<boolean> {
        try {

            return await this.keyDao.keyExists(key);

        } catch (error) {
            throw new Error(`Erro ao buscar chave: ${error}`);
        }
    }


    public async toggleKeyStatus(id: number, is_active: boolean, accessToken: string): Promise<string> {

        try {

            if ( !accessToken ) {
                throw 'Token de acesso não informado';
            }

            const isAuthorized = await this.isAuthorized(accessToken);

            if ( !isAuthorized ) {
                throw 'Você não tem permissão para realizar esta ação';
            }

            const key = await this.getKeyById(id);

            if (!key) {
                throw ('Chave não encontrada');
            }

            const response = this.keyDao.toggleKeyStatus(key.id, is_active);

            if ( !response ) {
                throw 'Falha ao ativar/desativar chave';
            }

            if ( is_active === true ) {
                return 'Chave ativada com sucesso';
            }

            return 'Chave desativada com sucesso';
        }
        catch (error) {
            
            if ( is_active === true ) {
                throw (`Erro ao ativar chave: ${error}`);
            }
            else {
                throw (`Erro ao desativar chave: ${error}`);
            }
        }
    }

    private async isAuthorized(accessToken: string): Promise<boolean> {

        try {
            const session = await this.cacheService.getCache(accessToken);

            if ( !session ) {
                return false;
            }

            return true;
        }
        catch (error) {
            throw new Error(`Erro ao verificar autorização`);
        }
    }
}