import { Key } from "../../model/index";
import { IKey } from "../../interfaces/key/keyInterface";

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
            await key.update(keyData);
            return key;
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

    public async hasKey(value: string): Promise<boolean> {
        try {
            
            const key = await Key.findOne({
                where: {
                    value
                }
            });

            return key !== null;

        } catch (error) {
            throw new Error(`Erro ao buscar chave: ${error}`);
        }
    }
}