import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description:
                `Esta API é responsável pelo envio de e-mails e é consumida por softwares externos.
                Utiliza TypeScript, Jest para testes, Express como framework, Nodemailer para o envio de e-mails,
                Cloud Functions para escalabilidade, RabbitMQ para mensageria e Swagger para documentação.`,
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;