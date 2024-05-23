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
            cpf_cnpj: '123456789',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: '123456',
            id: 0,
            reset_password_token: '',
            reset_password_expires: new Date(),
        };

        // Mock da função createuser para retornar o usuário criado
        (userDao.createuser as jest.Mock).mockResolvedValue(userData);

        // Criar o usuário
        const createdUser = await userDao.createuser(userData);

        // Verificar se o usuário foi criado corretamente
        expect(createdUser).toBeTruthy();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.cpf_cnpj).toBe(userData.cpf_cnpj);
        expect(createdUser.phone_number).toBe(userData.phone_number);
        expect(createdUser.email).toBe(userData.email);
        expect(createdUser.email_recovery).toBe(userData.email_recovery);
        expect(createdUser.password).toBe(userData.password);

    });

    it('should get a user by ID', async () => {
        // Dados do usuário para criação
        const userData: IUser = {
            name: 'John Doe',
            cpf_cnpj: '123456789',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: '123456',
            id: 0,
            reset_password_token: '',
            reset_password_expires: new Date(),
        };

        // Mock da função getuserById para retornar o usuário criado
        (userDao.getuserById as jest.Mock).mockResolvedValue(userData);

        // Obter o usuário pelo ID
        const fetchedUser = await userDao.getuserById(1); // ID válido

        // Verificar se o usuário foi obtido corretamente
        expect(fetchedUser).toBeTruthy();
        expect(fetchedUser?.id).toBe(userData.id);
        expect(fetchedUser?.name).toBe(userData.name);
        expect(fetchedUser?.cpf_cnpj).toBe(userData.cpf_cnpj);
        expect(fetchedUser?.phone_number).toBe(userData.phone_number);
        expect(fetchedUser?.email).toBe(userData.email);
        expect(fetchedUser?.email_recovery).toBe(userData.email_recovery);
        expect(fetchedUser?.password).toBe(userData.password);
    
    });
});
