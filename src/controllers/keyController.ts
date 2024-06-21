import KeyService from '../services/keyService';
import { Request, Response } from 'express';
import { IKey } from '../interfaces/key/keyInterface';

export default class KeyController {

    private keyService: KeyService;

    constructor() {
        this.keyService = new KeyService();
    }

    public async createKey(req: Request, res: Response) {
        try {
            const keyData: IKey = req.body;
        if(keyData.user_id === 0){
            return res.status(401).json({ message: 'userId not found'});
        } 
            const key = await this.keyService.createKey(keyData);
            return res.status(201).json(key);
        } catch (error: any) {
            return res.status(400).json({ message: "Failed to create key" });
        }
    }

    public async getKeyById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const key = await this.keyService.getKeyById(id);
            if (!key) {
                return res.status(404).json({ message: 'Chave não encontrada' });
            }
            return res.status(200).json(key);
        } catch (error) {
            return res.status(400).json({ message: "Failed to create key" });
        }
    }

    public async updateKey(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const keyData: Partial<IKey> = req.body;
            const key = await this.keyService.updateKey(keyData.id as number, keyData);
            if (!key) {
                return res.status(404).json({ message: 'Chave não encontrada' });
            }
            return res.status(200).json(key);
        } catch (error) {
            return res.status(400).json({ message: "Failed to create key"});
        }
    }

    public async deleteKey(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.keyService.deleteKey(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    public async generateUniqueKey(req: Request, res: Response) {
        try {
            const length = parseInt(req.params.length);
            const key = await this.keyService.generateUniqueKey(length);
            return res.status(200).json({ key });
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    public async keyExists(req: Request, res: Response) {
        try {
            const key = req.params.key;
            const exists = await this.keyService.keyExists(key);
            return res.status(200).json({ exists });
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }


    public async toggleKeyStatus(request: Request, response: Response) {
        try {

            if (!request.headers.authorization) {
                return response.status(401).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(401).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const { id, is_active } = request.body;


            const message = await this.keyService.toggleKeyStatus(id, is_active, accessToken);

            return response.status(200).json({ message });
            
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}