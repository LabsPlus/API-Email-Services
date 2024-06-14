/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operações relacionadas a usuários
 */


import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();


/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Criar um novo usuário.
 *     description: Cria um novo usuário com o nome, CPF/CNPJ, telefone, e-mail, senha, etc.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf_cnpj:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               email_recovery:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - cpf_cnpj
 *               - phone_number
 *               - email
 *               - email_recovery
 *               - password
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 id:
 *                   type: integer
 *                   example: 63
 *                 name:
 *                   type: string
 *                   example: Regis
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "49763079055"
 *                 phone_number:
 *                   type: string
 *                   example: "77981025555"
 *                 email:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 email_recovery:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 password:
 *                   type: string
 *                   example: "$2b$10$454pMS5iD6wZ0JxI/zHBXe.c64XQIAn0eOWlVefGneifqGcIs.rLu"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '400':
 *         description: Erro ao criar usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar login, faltam dados"
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/create', async (req, res) => {
    await userController.createUser(req, res);
});


/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Atualizar um usuário.
 *     description: Atualiza um usuário pelo ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf_cnpj:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               email_recovery:
 *                 type: string
 *               password:
 *                 type: string
 *               reset_password_token:
 *                 type: string
 *               reset_password_expires:
 *                 type: string
 *                 format: date-time
 *               deletion_requested_at:
 *                 type: string
 *                 format: date-time
 *               deletion_scheduled_at:
 *                 type: string
 *                 format: date-time
 *               profile_photo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 id:
 *                   type: integer
 *                   example: 63
 *                 name:
 *                   type: string
 *                   example: Regis
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "49763079055"
 *                 phone_number:
 *                   type: string
 *                   example: "77981025555"
 *                 email:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 email_recovery:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 password:
 *                   type: string
 *                   example: "$2b$10$454pMS5iD6wZ0JxI/zHBXe.c64XQIAn0eOWlVefGneifqGcIs.rLu"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '400':
 *         description: Erro ao atualizar usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar usuário."
 *       '401':
 *         description: Não autorizado. Token de acesso não fornecido ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não autorizado. Token de acesso não fornecido ou inválido."
 *       '404':
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put('/:id', async (req, res) => {
    await userController.updateUser(req, res);
});

/**
 * @swagger
 * /api/user/updateUser:
 *   put:
 *     summary: Atualizar um usuário.
 *     description: Atualiza um usuário pelo ID.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf_cnpj:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               email_recovery:
 *                 type: string
 *               password:
 *                 type: string
 *               reset_password_token:
 *                 type: string
 *               reset_password_expires:
 *                 type: string
 *                 format: date-time
 *               deletion_requested_at:
 *                 type: string
 *                 format: date-time
 *               deletion_scheduled_at:
 *                 type: string
 *                 format: date-time
 *               profile_photo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 id:
 *                   type: integer
 *                   example: 63
 *                 name:
 *                   type: string
 *                   example: Regis
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "49763079055"
 *                 phone_number:
 *                   type: string
 *                   example: "77981025555"
 *                 email:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 email_recovery:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 password:
 *                   type: string
 *                   example: "$2b$10$454pMS5iD6wZ0JxI/zHBXe.c64XQIAn0eOWlVefGneifqGcIs.rLu"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '400':
 *         description: Erro ao atualizar usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar usuário."
 *       '401':
 *         description: Não autorizado. Token de acesso não fornecido ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não autorizado. Token de acesso não fornecido ou inválido."
 *       '404':
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put('/updateUser:', async (req, res) => {
    await userController.updateUser(req, res);
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Excluir um usuário.
 *     description: Exclui um usuário pelo ID.
 *     tags: [User]
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

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login de usuário.
 *     description: Autentica um usuário utilizando email e senha.
 *     tags: [User]
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
 *             example:
 *               email: wesley.ulisses@labsif.com.br
 *               password: senha
 *     responses:
 *       '200':
 *         description: Login bem sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMjUzMDksImV4cCI6MTcxODMzMjUwOX0.61in7sruCpy5s7QQz8PgHPQUML9mElZ7GFHV1oYJUTc"
 *       '400':
 *         description: Dados inválidos. Falha ao processar requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos. Verifique seu email e senha."
 *       '401':
 *         description: Falha ao autenticar. Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Credenciais inválidas. Verifique seu email e senha."
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/login', async (req, res) => {
    await userController.login(req, res);
});

/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     summary: Solicitar redefinição de senha.
 *     description: Envia um e-mail de recuperação de senha para o endereço de e-mail fornecido.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_recovery:
 *                 type: string
 *               ip:
 *                 type: string
 *             example:
 *               email_recovery: "email@example.com"
 *               ip: "1010101010"
 *     responses:
 *       '200':
 *         description: E-mail de recuperação enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail sent with success"
 *       '400':
 *         description: Dados inválidos. Falha ao processar requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email não informado"
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falha ao enviar email"
 */

router.post('/forgot-password', async (req, res) => {
    await userController.forgotPassword(req, res);
});

/**
 * @swagger
 * /api/user/update-password:
 *   post:
 *     summary: Atualizar senha do usuário.
 *     description: Atualiza a senha do usuário autenticado.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de acesso do usuário.
 *               password:
 *                 type: string
 *                 description: Nova senha do usuário.
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               password: "novaSenha123"
 *     responses:
 *       '200':
 *         description: Senha alterada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha alterada com sucesso"
 *       '400':
 *         description: Dados inválidos. Falha ao processar requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dados inválidos"
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falha ao alterar senha"
 */
router.post('/update-password', async (req, res) => {
    await userController.updatePassword(req, res);
});

/**
 * @swagger
 * /api/user/getUserByAccessToken:
 *   get:
 *     summary: Obter usuário pelo token de acesso.
 *     description: Retorna o usuário associado ao token de acesso fornecido.
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso no formato 'Bearer token'
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               schema:
 *               type: object
 *               properties:
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 id:
 *                   type: integer
 *                   example: 63
 *                 name:
 *                   type: string
 *                   example: Regis
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "49763079055"
 *                 phone_number:
 *                   type: string
 *                   example: "77981025555"
 *                 email:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 email_recovery:
 *                   type: string
 *                   example: Regis@gmail.com
 *                 password:
 *                   type: string
 *                   example: "$2b$10$454pMS5iD6wZ0JxI/zHBXe.c64XQIAn0eOWlVefGneifqGcIs.rLu"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '401':
 *         description: Token não informado ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token não informado"
 *       '404':
 *         description: Cache not found. Token expirado ou usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cache not found"
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/getUserByAccessToken', async (req, res) => {
    await userController.getUserByAccessToken(req, res);
});


router.post('/logout', async (req, res) => {
    await userController.logout(req, res);
});

router.post('/validateUserPassword', async (req, res) => {
    await userController.validateUserPassword(req, res);
});

router.get('/isLoggedIn', async (req, res) => {
    await userController.isLoggedIn(req, res);
});

router.post('/scheduleUserDeletion', async (req, res) => {
    await userController.scheduleUserDeletion(req, res);
});

router.get('/reactivateUserProfile', async (req, res) => {
    await userController.reactivateUserProfile(req, res);
});

router.get('/getAllKeysFromUser', async (req, res) => {
    await userController.getAllKeysFromUser(req, res);
});

router.post('/requestUpdateEmail', async (req, res) => {
    await userController.requestUpdateEmail(req, res);
});

router.post('/requestUpdateEmailRecovery', async (req, res) => {
    await userController.requestUpdateEmailRecovery(req, res);
});

router.get('/updateEmail', async (req, res) => {
    await userController.updateEmail(req, res);
});

router.get('/updateEmailRecovery', async (req, res) => {
    await userController.updateEmailRecovery(req, res);
});

export default router;