import  KeyDao  from "../repositories/dao/keyDao";
import { IKey } from "../interfaces/key/keyInterface";

export default class KeyService {

    private keyDao: KeyDao;

    constructor() {
        this.keyDao = new KeyDao();
    }

    public async generateUniqueKey(length: number): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*/+_@#$%&*';
        let key = '';
        for (let i = 0; i < length; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (await this.keyDao.hasKey(key)) {
            return this.generateUniqueKey(length);
        }

        return key;
    }

    public async createKey(keyData: IKey): Promise<IKey> {
        
        try {
            const value = await this.generateUniqueKey(120);
            keyData.value = value;

            const key = await this.keyDao.createKey(keyData);

            return key;
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
}