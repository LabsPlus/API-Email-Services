import Login from '../../../src/model/login_model';
import LoginDao from '../../../src/repositories/dao/loginDao';
import { ILogin } from '../../../src/interfaces/login/loginInterface';

describe('LoginDao', () => {
    let loginDao: LoginDao;

    beforeAll(async () => {
        // Configuração do banco de dados em memória ou conexão com o banco de dados de teste
        // Isso pode envolver a configuração de uma instância do banco de dados em memória usando SQLite ou uma conexão com um banco de dados de teste separado
        // Por exemplo, você pode usar um pacote como "sqlite3" para configurar um banco de dados em memória para testes
        // Aqui, vamos supor que você já configurou um banco de dados de teste e que o modelo Login está corretamente definido
    });

    beforeEach(() => {
        loginDao = new LoginDao();
    });

    afterEach(async () => {
        // Limpar o banco de dados após cada teste
        await Login.destroy({ where: {} });
    });

    afterAll(async () => {
        // Fechar conexão com o banco de dados após todos os testes
        // Por exemplo, se você estiver usando um banco de dados em memória, pode fechar a conexão aqui
    });

    it('should create a login', async () => {
        const loginData: ILogin = {
            email: 'test@example.com',
            email_recovery: 'recovery@example.com',
            password: 'password123',
            id: 0,
            created_at: new Date(),
            updated_at: new Date()
        };

        const createdLogin = await loginDao.createLogin(loginData);
        expect(createdLogin).toBeTruthy();
        expect(createdLogin.email).toBe(loginData.email);
        expect(createdLogin.email_recovery).toBe(loginData.email_recovery);
        // Verifique outras propriedades, se necessário
    });

    it('should get a login by ID', async () => {
        // Crie um login no banco de dados de teste
        const loginData: ILogin = {
            email: 'test@example.com',
            email_recovery: 'recovery@example.com',
            password: 'password123',
            id: 0,
            created_at: new Date(),
            updated_at: new Date()
        };
        const createdLogin = await loginDao.createLogin(loginData);

        // Obtenha o login pelo ID usando o LoginDao
        const fetchedLogin = await loginDao.getLoginById(createdLogin.id!);

        // Verifique se o login recuperado é igual ao login criado
        expect(fetchedLogin).toBeTruthy();
        expect(fetchedLogin?.id).toBe(createdLogin.id);
        expect(fetchedLogin?.email).toBe(createdLogin.email);
        // Verifique outras propriedades, se necessário
    });

    it('should get a login by email', async () => {
        // Crie um login no banco de dados de teste
        const loginData: ILogin = {
            email: 'test@example.com',
            email_recovery: 'recovery@example.com',
            password: 'password123',
            id: 0,
            created_at: new Date(),
            updated_at: new Date()
        };
        const createdLogin = await loginDao.createLogin(loginData);

        // Obtenha o login pelo email usando o LoginDao
        const fetchedLogin = await loginDao.getLoginByEmail(createdLogin.email);

        // Verifique se o login recuperado é igual ao login criado
        expect(fetchedLogin).toBeTruthy();
        expect(fetchedLogin?.id).toBe(createdLogin.id);
        expect(fetchedLogin?.email).toBe(createdLogin.email);
        // Verifique outras propriedades, se necessário
    });
});
