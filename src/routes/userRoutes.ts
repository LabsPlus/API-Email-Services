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

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Deslogar usuário.
 *     description: Desloga o usuário utilizando o token de acesso fornecido no corpo da requisição.
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
 *                 description: Token de acesso do usuário
 *     responses:
 *       '200':
 *         description: Usuário deslogado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuário deslogado com sucesso'
 *       '400':
 *         description: Erro ao deslogar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     tokenNaoInformado:
 *                       summary: Token não informado
 *                       value: 'Token não informado'
 *                     tokenInvalido:
 *                       summary: Token inválido
 *                       value: 'Token inválido'
 *                     falhaAoDeslogar:
 *                       summary: Falha ao deslogar
 *                       value: 'Falha ao deslogar'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.post('/logout', async (req, res) => {
    await userController.logout(req, res);
});


/**
 * @swagger
 * /api/user/validateUserPassword:
 *   post:
 *     summary: Validar senha do usuário.
 *     description: Valida a senha do usuário utilizando o token de acesso fornecido no cabeçalho da requisição e a senha no corpo da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: 'senha123'
 *     responses:
 *       '200':
 *         description: Resultado da validação da senha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     senhaInvalida:
 *                       summary: Senha inválida
 *                       value: 'Senha inválida'
 *                     senhaValida:
 *                       summary: Senha válida
 *                       value: 'Senha válida'
 *                 isValidPassword:
 *                   type: boolean
 *                   example: false
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token não informado'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.post('/validateUserPassword', async (req, res) => {
    await userController.validateUserPassword(req, res);
});


/**
 * @swagger
 * /api/user/isLoggedIn:
 *   get:
 *     summary: Verifica se o usuário está logado.
 *     description: Verifica se o usuário está logado usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     responses:
 *       '200':
 *         description: Resultado da verificação de login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     usuarioNaoLogado:
 *                       summary: Usuário não está logado
 *                       value: 'Usuário não está logado'
 *                     usuarioLogado:
 *                       summary: Usuário está logado
 *                       value: 'Usuário está logado'
 *                 isLoggedIn:
 *                   type: boolean
 *                   example: false
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token não informado'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/isLoggedIn', async (req, res) => {
    await userController.isLoggedIn(req, res);
});


/**
 * @swagger
 * /api/user/scheduleUserDeletion:
 *   get:
 *     summary: Agenda a deleção de um usuário.
 *     description: Agenda a deleção de um usuário usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     responses:
 *       '200':
 *         description: Deleção agendada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleção agendada com sucesso"
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token não informado'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/scheduleUserDeletion', async (req, res) => {
    await userController.scheduleUserDeletion(req, res);
});


/**
 * @swagger
 * /api/user/reactivateUserProfile:
 *   get:
 *     summary: Reativa o perfil de um usuário.
 *     description: Reativa o perfil de um usuário usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     responses:
 *       '200':
 *         description: Perfil reativado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil reativado com sucesso"
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token não informado'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/reactivateUserProfile', async (req, res) => {
    await userController.reactivateUserProfile(req, res);
});


/**
 * @swagger
 * /api/user/getAllKeysFromUser:
 *   get:
 *     summary: Obtém todas as chaves de um usuário.
 *     description: Retorna uma lista de todas as chaves associadas ao usuário usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de acesso JWT no formato Bearer.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2xleS51bGlzc2VzQGxhYnNpZi5jb20uYnIiLCJpYXQiOjE3MTgzMTQ5NjIsImV4cCI6MTcxODMyMjE2Mn0.XxRSES4uOHxvGEiqQm_A8jKl5F3QwnE6jMtjHnG3cJc"
 *     responses:
 *       '200':
 *         description: Lista de chaves obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Chave API 1"
 *                   value:
 *                     type: string
 *                     example: "abc123"
 *                   user_id:
 *                     type: number
 *                     example: 63
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-14T00:02:47.012Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-14T00:02:47.012Z"
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Token não informado'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/getAllKeysFromUser', async (req, res) => {
    await userController.getAllKeysFromUser(req, res);
});


/**
 * @swagger
 * /api/user/requestUpdateEmail:
 *   post:
 *     summary: Solicita a atualização do e-mail do usuário.
 *     description: Solicita a atualização do e-mail do usuário usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               email:
 *                 type: string
 *                 description: Novo e-mail do usuário.
 *                 example: "novo.email@exemplo.com"
 *     responses:
 *       '200':
 *         description: E-mail parcialmente atualizado. Um e-mail de confirmação foi enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nome do Usuário"
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "12345678901"
 *                 phone_number:
 *                   type: string
 *                   example: "123456789"
 *                 email:
 *                   type: string
 *                   example: "novo.email@exemplo.com"
 *                 email_recovery:
 *                   type: string
 *                   example: "email.recovery@exemplo.com"
 *                 password:
 *                   type: string
 *                   example: "$2b$10$saltsaltsaltsaltsaltsaltsalt"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 message:
 *                   type: string
 *                   example: "Um e-mail de confirmação foi enviado."
 *       '400':
 *         description: Falha ao atualizar e-mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Falha ao atualizar email'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.post('/requestUpdateEmail', async (req, res) => {
    await userController.requestUpdateEmail(req, res);
});


/**
 * @swagger
 * /api/user/requestUpdateEmailRecovery:
 *   post:
 *     summary: Solicita a atualização do e-mail de recuperação do usuário.
 *     description: Solicita a atualização do e-mail de recuperação do usuário usando o token de acesso fornecido no cabeçalho da requisição.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               email_recovery:
 *                 type: string
 *                 description: Novo e-mail de recuperação do usuário.
 *                 example: "novo.email.recovery@exemplo.com"
 *     responses:
 *       '200':
 *         description: E-mail de recuperação parcialmente atualizado. Um e-mail de confirmação foi enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nome do Usuário"
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "12345678901"
 *                 phone_number:
 *                   type: string
 *                   example: "123456789"
 *                 email:
 *                   type: string
 *                   example: "email@exemplo.com"
 *                 email_recovery:
 *                   type: string
 *                   example: "novo.email.recovery@exemplo.com"
 *                 password:
 *                   type: string
 *                   example: "$2b$10$saltsaltsaltsaltsaltsaltsalt"
 *                 reset_password_token:
 *                   type: string
 *                   example: null
 *                 reset_password_expires:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_requested_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 deletion_scheduled_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 profile_photo:
 *                   type: string
 *                   example: null
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-14T00:02:47.012Z"
 *                 message:
 *                   type: string
 *                   example: "Um e-mail de confirmação foi enviado."
 *       '400':
 *         description: Falha ao atualizar e-mail de recuperação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Falha ao atualizar email de recuperação'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.post('/requestUpdateEmailRecovery', async (req, res) => {
    await userController.requestUpdateEmailRecovery(req, res);
});


/**
 * @swagger
 * /api/user/updateEmail:
 *   get:
 *     summary: Confirma a atualização do e-mail do usuário.
 *     description: Esta rota é acionada quando o usuário clica no link de confirmação para atualizar o e-mail. Os tokens são passados como parâmetros na URL.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: UpdateEmailToken
 *         required: true
 *         description: Token de atualização de e-mail.
 *         schema:
 *           type: string
 *           example: "exampleUpdateEmailToken"
 *       - in: query
 *         name: IdUser
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: string
 *           example: "exampleUserId"
 *     responses:
 *       '200':
 *         description: E-mail atualizado com sucesso.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |
 *                 <!DOCTYPE html>
 *                 <html lang="pt-BR">
 *                 <head>
 *                   <meta charset="UTF-8">
 *                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *                   <title>Alteração de Email</title>
 *                   <style>
 *                     body {
 *                       font-family: Arial, sans-serif;
 *                       background-color: #f4f4f4;
 *                       display: flex;
 *                       justify-content: center;
 *                       align-items: center;
 *                       height: 100vh;
 *                       margin: 0;
 *                     }
 *                     .container {
 *                       background-color: #fff;
 *                       padding: 20px;
 *                       border-radius: 8px;
 *                       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 *                       text-align: center;
 *                     }
 *                     .message {
 *                       font-size: 1.2em;
 *                       color: #333;
 *                     }
 *                   </style>
 *                 </head>
 *                 <body>
 *                   <div class="container">
 *                     <h1>Alteração de Email</h1>
 *                     <p class="message">O seu email foi alterado com sucesso!</p>
 *                   </div>
 *                 </body>
 *                 </html>
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     tokensNaoInformados:
 *                       summary: Tokens não informados
 *                       value: 'Tokens não informados'
 *                     falhaAoAtualizarEmail:
 *                       summary: Falha ao atualizar e-mail
 *                       value: 'Falha ao atualizar email'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/updateEmail', async (req, res) => {
    await userController.updateEmail(req, res);
});


/**
 * @swagger
 * /api/user/updateEmailRecovery:
 *   get:
 *     summary: Confirma a atualização do e-mail de recuperação do usuário.
 *     description: Esta rota é acionada quando o usuário clica no link de confirmação para atualizar o e-mail de recuperação. Os tokens são passados como parâmetros na URL.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: UpdateEmailRecoveryToken
 *         required: true
 *         description: Token de atualização de e-mail de recuperação.
 *         schema:
 *           type: string
 *           example: "exampleUpdateEmailRecoveryToken"
 *       - in: query
 *         name: IdUser
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: string
 *           example: "exampleUserId"
 *     responses:
 *       '200':
 *         description: E-mail de recuperação atualizado com sucesso.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |
 *                 <!DOCTYPE html>
 *                 <html lang="pt-BR">
 *                 <head>
 *                   <meta charset="UTF-8">
 *                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *                   <title>Alteração de Email</title>
 *                   <style>
 *                     body {
 *                       font-family: Arial, sans-serif;
 *                       background-color: #f4f4f4;
 *                       display: flex;
 *                       justify-content: center;
 *                       align-items: center;
 *                       height: 100vh;
 *                       margin: 0;
 *                     }
 *                     .container {
 *                       background-color: #fff;
 *                       padding: 20px;
 *                       border-radius: 8px;
 *                       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 *                       text-align: center;
 *                     }
 *                     .message {
 *                       font-size: 1.2em;
 *                       color: #333;
 *                     }
 *                   </style>
 *                 </head>
 *                 <body>
 *                   <div class="container">
 *                     <h1>Alteração de Email</h1>
 *                     <p class="message">O seu email de recuperação foi alterado com sucesso!</p>
 *                   </div>
 *                 </body>
 *                 </html>
 *       '400':
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     tokensNaoInformados:
 *                       summary: Tokens não informados
 *                       value: 'Tokens não informados'
 *                     falhaAoAtualizarEmail:
 *                       summary: Falha ao atualizar e-mail de recuperação
 *                       value: 'Falha ao atualizar email de recuperação'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal Server Error'
 */
router.get('/updateEmailRecovery', async (req, res) => {
    await userController.updateEmailRecovery(req, res);
});

export default router;