import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import statusRoutes from './routes/statusRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import {sequelize} from './data-source';


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

function setupRoutes(): void {
    app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api/email', emailRoutes);
    app.use('/api/', statusRoutes);
};

sequelize.sync({ force: true }).then(() => {
    console.log("Database and tables created!");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        return setupRoutes();
    });
});