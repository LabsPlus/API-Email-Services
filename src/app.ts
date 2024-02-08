import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import statusRoutes from './routes/statusRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { AppDataSource } from './data-source';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

function setupRoutes(): void{
    app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/email', emailRoutes);
    app.use('/api/', statusRoutes);
};

// Start the server
app.listen(port, () => {

    AppDataSource.sync({force: false});
    console.log(`Server is running on port ${port}`);
    return setupRoutes();
});
