import express from 'express';
import LoginController from '../controllers/loginController';

const router = express.Router();
const loginController = new LoginController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticação do usuário.
 *     description: Autentica o usuário com o email e a senha fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login bem-sucedido, retorna um token JWT.
 *       '401':
 *         description: Senha incorreta.
 *       '404':
 *         description: Usuário não encontrado.
 */
router.post('/login', async (req, res) => {
    await loginController.login(req, res);
});


/**
 * @swagger
 * /api/auth/create:
 *   post:
 *     summary: Criar um novo login.
 *     description: Cria um novo login com o email, email de recuperação e senha fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               email_recovery:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Login criado com sucesso.
 *       '400':
 *         description: Erro ao criar login.
 */
router.post('/create', async (req, res) => {
    await loginController.createLogin(req, res);
});


/**
 * @swagger
 * /api/auth/{id}:
 *   get:
 *     summary: Obter login por ID.
 *     description: Retorna os detalhes do login com o ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do login a ser obtido.
 *     responses:
 *       '200':
 *         description: Login encontrado.
 *       '400':
 *         description: Erro ao buscar login.
 *       '404':
 *         description: Login não encontrado.
 */
router.get('/:id', async (req, res) => {
    await loginController.getLoginById(req, res);
});

/**
 * @swagger
 * /api/auth/email/{email}:
 *   get:
 *     summary: Obter login por e-mail.
 *     description: Retorna os detalhes do login com o e-mail fornecido.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: E-mail do login a ser obtido.
 *     responses:
 *       '200':
 *         description: Login encontrado.
 *       '400':
 *         description: Erro ao buscar login.
 *       '404':
 *         description: Login não encontrado.
 */
router.get('/email/:email', async (req, res) => {
    await loginController.getLoginByEmail(req, res);
});

export default router;
