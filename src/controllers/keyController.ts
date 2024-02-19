import KeyService from '../services/keyService';
import { Request, Response } from 'express';
import { IKey } from '../interfaces/key/keyInterface';

export default class KeyController {

    private keyService: KeyService;

    constructor() {
        this.keyService = new KeyService();
    }

    public async createKey(req: Request, res: Response): Promise<void> {
        try {
            const keyData: IKey = req.body;
            const key = await this.keyService.createKey(keyData);
            res.status(201).json(key);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    public async getKeyById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const key = await this.keyService.getKeyById(id);
            if (!key) {
                res.status(404).json({ message: 'Chave não encontrada' });
                return;
            }
            res.status(200).json(key);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    public async updateKey(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const keyData: Partial<IKey> = req.body;
            const key = await this.keyService.updateKey(id, keyData);
            if (!key) {
                res.status(404).json({ message: 'Chave não encontrada' });
                return;
            }
            res.status(200).json(key);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    public async deleteKey(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.keyService.deleteKey(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}