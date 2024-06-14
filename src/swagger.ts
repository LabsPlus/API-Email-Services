import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: `Esta API é responsável pelo envio de e-mails e é consumida por softwares externos.
                          Utiliza TypeScript, Jest para testes, Express como framework, Nodemailer para o envio de e-mails,
                          Cloud Functions para escalabilidade, RabbitMQ para mensageria e Swagger para documentação.`,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    tags: [
        { name: 'User', description: 'Operações relacionadas a usuários' },
        { name: 'E-mail', description: 'Operações relacionadas a e-mails' },
        { name: 'Chave', description: 'Operações relacionadas a chaves' },
        { name: 'Fila de Enfileiramento', description: 'Operações relacionadas a fila de enfileiramento' },
    ],
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
