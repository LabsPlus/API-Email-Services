import KeyService from '../../src/services/keyService';
import KeyDao from '../../src/repositories/dao/keyDao';
import { IKey } from '../../src/interfaces/key/keyInterface';
import bycript from 'bcrypt';

jest.mock('../../src/repositories/dao/keyDao');

describe('KeyService', () => {
    let keyService: KeyService;

    beforeEach(() => {
        keyService = new KeyService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a unique key', async () => {
        const length = 10;
        const generatedKey = await keyService.generateUniqueKey(length);
        expect(generatedKey.length).toBe(length);
    });

    it('should encrypt a key', async () => {
        const keyValue = 'testKey';
        const hashedKey = await keyService.encriptKey(keyValue);
        expect(hashedKey).toBeTruthy();
    });

    it('should compare keys correctly', async () => {
        const key = 'testKey';
        const hashedKey = await bycript.hash(key, 10); // Simulate hashing a key
        const result = await keyService.compareKeys(key, hashedKey);
        expect(result).toBeTruthy();
    });

    it('should create a key', async () => {
        const keyData: IKey = {
            value: 'testKey',
            id: 0,
            name: '',
            user_id: 0
        };
        (KeyDao.prototype.createKey as jest.Mock).mockResolvedValueOnce(keyData);
        const createdKey = await keyService.createKey(keyData);
        expect(createdKey).toEqual(keyData);
    });

    it('should get a key by ID', async () => {
        const keyId = 1;
        const mockKeyData: IKey = {
            id: keyId, value: 'testKey',
            name: '',
            user_id: 0
        };
        (KeyDao.prototype.getKeyById as jest.Mock).mockResolvedValueOnce(mockKeyData);
        const fetchedKey = await keyService.getKeyById(keyId);
        expect(fetchedKey).toEqual(mockKeyData);
    });

    it('should check if a key exists', async () => {
        const key = 'testKey';
        (KeyDao.prototype.keyExists as jest.Mock).mockResolvedValueOnce(true);
        const exists = await keyService.keyExists(key);
        expect(exists).toBeTruthy();
    });
});
