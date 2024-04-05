import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();
/**
 * id: number;
    name: string;
    cpf_cnpj: string;
    phone_number: string;
    email: string;
    email_recovery: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
 */
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
 *     responses:
 *       '200':
 *         description: Usuário encontrado.
 *       '400':
 *         description: Erro ao buscar usuário.
 */
router.get('/:id', async (req, res) => {
    await userController.getUserById(req, res);
});

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

export default router;