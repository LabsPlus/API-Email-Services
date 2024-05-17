import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();


/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Criar um novo usuário.
 *     description: Cria um novo usuário com o nome, nome da empresa e login fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               cpf_cnpj:
 *                type: string
 *               phone_number:
 *                type: string
 *               email:
 *                type: string
 *               email_recovery:
 *                type: string
 *               password:
 *                type: string
 *               created_at:
 *                type: string
 *                format: date-time
 *                description: Data da criação do usuário (opcional)
 *               updated_at:
 *                type: string
 *                format: date-time
 *                description: Data da criação do usuário (opcional)
 * 
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *       '400':
 *         description: Erro ao criar usuário.
 */
router.post('/create', async (req, res) => {
    await userController.createUser(req, res);
});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Buscar um usuário.
 *     description: Busca um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     responses:
 *       '200':
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 cpf_cnpj:
 *                   type: string
 *                 phone_number:
 *                   type: string
 *                 email:
 *                   type: string
 *                 email_recovery:
 *                   type: string
 *                 password:
 *                   type: string
 *                 reset_password_token:
 *                   type: string
 *                 reset_password_expires:
 *                   type: string
 *                   format: date
 *       '400':
 *         description: Erro ao buscar usuário.
 */


/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Atualizar um usuário.
 *     description: Atualiza um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               company_name:
 *                 type: string
 *               login_id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *       '400':
 *         description: Erro ao atualizar usuário.
 */
router.put('/:id', async (req, res) => {
    await userController.updateUser(req, res);
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Excluir um usuário.
 *     description: Exclui um usuário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuário excluído com sucesso.
 *       '400':
 *         description: Erro ao excluir usuário.
 */
router.delete('/:id', async (req, res) => {
    await userController.deleteUser(req, res);
});


router.post('/login', async (req, res) => {
    await userController.login(req, res);
});

router.post('/forgot-password', async (req, res) => {
    await userController.forgotPassword(req, res);
});

router.post('/update-password', async (req, res) => {
    await userController.updatePassword(req, res);
});

//retorna um usuario, o parametro é o token no header e a resposta é um objeto do tipo IUser

/**
 * @swagger
 * /api/user/getUserByAccessToken:
 *      get:
 *          summary: Buscar usuário pelo token de acesso.
 *          description: Busca um usuário pelo token de acesso.
 *          responses:
 *              '200':
 *                  description: Usuário encontrado.
 *              '400':
 *                  description: Erro ao buscar usuário.
 *              '401':
 *                  description: Usuário não autorizado.
 *              '404':
 *                  description: Usuário não encontrado.
 *              '500':
 *                  description: Erro interno do servidor.
 * 
 * 
 */
router.get('/getUserByAccessToken', async (req, res) => {
    await userController.getUserByAccessToken(req, res);
});

//passamos o token no body
router.post('/logout', async (req, res) => {
    await userController.logout(req, res);
});

export default router;