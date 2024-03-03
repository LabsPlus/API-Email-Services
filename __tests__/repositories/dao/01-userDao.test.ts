import UserDao from '../../../src/repositories/dao/userDao';
import { IUser } from '../../../src/interfaces/user/userInterface';

// Mock do UserDao
jest.mock('../../../src/repositories/dao/userDao');

describe('UserDao', () => {
    let userDao: UserDao;

    beforeEach(() => {
        userDao = new UserDao();
    });

    it('should create a user', async () => {
        // Dados do usuário para criação
        const userData: IUser = {
            name: 'John Doe',
            company_name: 'ABC Company',
            login_id: 1, // ID de login válido
            id: 0
        };

        // Mock da função createuser para retornar o usuário criado
        (userDao.createuser as jest.Mock).mockResolvedValue(userData);

        // Criar o usuário
        const createdUser = await userDao.createuser(userData);

        // Verificar se o usuário foi criado corretamente
        expect(createdUser).toBeTruthy();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.company_name).toBe(userData.company_name);
        expect(createdUser.login_id).toBe(userData.login_id);
    });

    it('should get a user by ID', async () => {
        // Dados do usuário para criação
        const userData: IUser = {
            name: 'John Doe',
            company_name: 'ABC Company',
            login_id: 1, // ID de login válido
            id: 0
        };

        // Mock da função getuserById para retornar o usuário criado
        (userDao.getuserById as jest.Mock).mockResolvedValue(userData);

        // Obter o usuário pelo ID
        const fetchedUser = await userDao.getuserById(1); // ID válido

        // Verificar se o usuário foi obtido corretamente
        expect(fetchedUser).toBeTruthy();
        expect(fetchedUser?.id).toBe(userData.id);
        expect(fetchedUser?.name).toBe(userData.name);
        expect(fetchedUser?.company_name).toBe(userData.company_name);
        expect(fetchedUser?.login_id).toBe(userData.login_id);
    });
});
