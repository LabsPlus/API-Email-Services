import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import statusRoutes from './routes/statusRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { Key, Login, Usuario } from './model/index';
import SequelizeORM from './repositories/config/sequelize_orm.config';
import { Sequelize } from "sequelize-typescript";


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const sequelizeORM = new SequelizeORM();

sequelizeORM.connect();

function setupRoutes(): void {
    app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/email', emailRoutes);
    app.use('/api/', statusRoutes);
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    return setupRoutes();
});
