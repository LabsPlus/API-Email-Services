import { Key } from "../../model/index";
import { IKey } from "../../interfaces/key/keyInterface";
import bycript from 'bcrypt';

export default class KeyDao {

    public async createKey(keyData: IKey): Promise<IKey> {

        try {

            const key = await Key.create({
                name: keyData.name,
                value: keyData.value,
                user_id: keyData.user_id,
            });

            return key;

        } catch (error) {
            throw new Error(`Erro ao criar chave: ${error}`);
        }
    }

    public async getKeyById(id: number): Promise<IKey | null> {
        try {
            const key = await Key.findByPk(id);
            return key;
        } catch (error) {
            throw new Error(`Erro ao buscar chave por ID: ${error}`);
        }
    }

    public async updateKey(id: number, keyData: Partial<IKey>): Promise<IKey | null> {
        try {
            const key = await Key.findByPk(id);
            if (!key) {
                return null;
            }
            const updatedKey = await key.update(keyData);
            return updatedKey;
        } catch (error) {
            throw new Error(`Erro ao atualizar chave: ${error}`);
        }
    }

    public async deleteKey(id: number): Promise<void> {
        try {
            const key = await Key.findByPk(id);
            if (!key) {
                throw new Error('Chave não encontrada');
            }
            await key.destroy();
        } catch (error) {
            throw new Error(`Erro ao excluir chave: ${error}`);
        }
    }

    public async keyExists(key: string): Promise<boolean> {
        try {
            const keys = await this.getAllKeys() as IKey[];

            for (const k of keys) {
                const exists = await bycript.compare(key, k.value);
                if (exists) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw new Error(`Erro ao buscar chave: ${error}`);
        }
    }

    private async getAllKeys(): Promise<IKey[]> {
        try {
            let keys = await Key.findAll() as IKey[];
            return keys;
        } catch (error) {
            throw new Error(`Erro ao buscar chaves: ${error}`);
        }
    }

    public async getAllKeysByUserId(user_id: number): Promise<IKey[]> {
        try {
            
            let keys = await Key.findAll({ where: { user_id } }) as IKey[];

            return keys;

        }
        catch (error) {
            throw new Error(`Erro ao buscar chaves por ID do usuário: ${error}`);
        }
    }


    public async toggleKeyStatus(id: number, is_active: boolean): Promise<string> {
        try {
            
            const key = await Key.findByPk(id);
            
            if (!key) {
                return ('Chave não encontrada');
            }

            const response = await key.update({ is_active });
            
            return response as any;

        } catch (error) {
            throw new Error(`Erro ao alterar status da chave: ${error}`);
        }
    }

}