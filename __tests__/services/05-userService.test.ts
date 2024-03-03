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
            company_name: 'ABC Company',
            login_id: 1,
            id: 0
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
            id: userId,
            name: 'John Doe',
            company_name: 'ABC Company',
            login_id: 1,
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
            name: 'Updated Name',
            company_name: 'ABC Company',
            login_id: 1,
        };
        (UserDao.prototype.updateuser as jest.Mock).mockResolvedValueOnce(updatedUser);

        const result = await userService.updateUser(userId, userDataToUpdate);
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        const userId = 1;
        (UserDao.prototype.deleteuser as jest.Mock).mockResolvedValueOnce(userId);

        await userService.deleteUser(userId);
        expect(UserDao.prototype.deleteuser).toHaveBeenCalledWith(userId);
    });
});
