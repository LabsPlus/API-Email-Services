import UserService from '../../src/services/userService';
import UserDao from '../../src/repositories/dao/userDao';
import { IUser } from '../../src/interfaces/user/userInterface';

jest.mock('../../src/repositories/dao/UserDao');

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user', async () => {
        const userData: IUser = {
            name: 'John Doe',
            cpf_cnpj: '422.855.700-74',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: 'Rio123456@',
            id: 0,
            reset_password_token: '',
            reset_password_expires: new Date(),
        };
        const createdUser: IUser = {
            ...userData,
        };
        (UserDao.prototype.createuser as jest.Mock).mockResolvedValueOnce(createdUser);

        const result = await userService.createUser(userData);
        expect(result).toEqual(createdUser);
    });

    it('should get a user by ID', async () => {
        const userId = 1;
        const user: IUser = {
            name: 'John Doe',
            cpf_cnpj: '422.855.700-74',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: 'Rio123456@',
            id: 0,
            reset_password_token: '',
            reset_password_expires: new Date(),
        };
        (UserDao.prototype.getuserById as jest.Mock).mockResolvedValueOnce(user);

        const result = await userService.getUserById(userId);
        expect(result).toEqual(user);
    });

    it('should update a user', async () => {
        const userId = 1;
        const userDataToUpdate: Partial<IUser> = {
            name: 'Updated Name',
        };
        const updatedUser: IUser = {
            id: userId,
            name: 'John Doe',
            cpf_cnpj: '422.855.700-74',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: 'Rio123456@',
            reset_password_token: '',
            reset_password_expires: new Date(),
        };
        (UserDao.prototype.updateuser as jest.Mock).mockResolvedValueOnce(updatedUser);
        const accessToken = 'Bearer token123';
        const result = await userService.updateUser(accessToken, userDataToUpdate);
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        const userId = 1;
        (UserDao.prototype.deleteuser as jest.Mock).mockResolvedValueOnce(userId);

        await userService.deleteUser(userId);
        expect(UserDao.prototype.deleteuser).toHaveBeenCalledWith(userId);
    });
});
