import express from 'express';
import UsuarioController from '../controllers/usuarioController';

const router = express.Router();
const usuarioController = new UsuarioController();

/**
 * @swagger
 * /api/usuario/create:
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
 *                 type: string
 *               company_name:
 *                 type: string
 *               login_id:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *       '400':
 *         description: Erro ao criar usuário.
 */
router.post('/create', async (req, res) => {
    await usuarioController.createUsuario(req, res);
});

/**
 * @swagger
 * /api/usuario/{id}:
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
    await usuarioController.getUsuarioById(req, res);
});

/**
 * @swagger
 * /api/usuario/{id}:
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
    await usuarioController.updateUsuario(req, res);
});

/**
 * @swagger
 * /api/usuario/{id}:
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
    await usuarioController.deleteUsuario(req, res);
});

export default router;