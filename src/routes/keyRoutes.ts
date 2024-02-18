import express from 'express';
import KeyController from '../controllers/keyController';

const router = express.Router();
const keyController = new KeyController();

/**
 * @swagger
 * /api/key/create:
 *   post:
 *     summary: Criar uma nova chave.
 *     description: Cria uma nova chave com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               value:
 *                 type: string
 *               user_id:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Chave criada com sucesso.
 *       '400':
 *         description: Erro ao criar chave.
 */
router.post('/create', async (req, res) => {
    await keyController.createKey(req, res);
});

/**
 * @swagger
 * /api/key/{id}:
 *   get:
 *     summary: Buscar uma chave.
 *     description: Busca uma chave pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da chave.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Chave encontrada.
 *       '400':
 *         description: Erro ao buscar chave.
 */
router.get('/:id', async (req, res) => {
    await keyController.getKeyById(req, res);
});

/**
 * @swagger
 * /api/key/{id}:
 *   put:
 *     summary: Atualizar uma chave.
 *     description: Atualiza uma chave pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da chave.
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
 *                type: string
 *               value:
 *                 type: string
 *               user_id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Chave atualizada com sucesso.
 *       '400':
 *         description: Erro ao atualizar chave.
 */
router.put('/:id', async (req, res) => {
    await keyController.updateKey(req, res);
});

/**
 * @swagger
 * /api/key/{id}:
 *   delete:
 *     summary: Excluir uma chave.
 *     description: Exclui uma chave pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da chave.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Chave excluída com sucesso.
 *       '400':
 *         description: Erro ao excluir chave.
 */
router.delete('/:id', async (req, res) => {
    await keyController.deleteKey(req, res);
});

export default router;