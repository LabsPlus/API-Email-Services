import express from "express";
import cors from "cors";
import loginRoutes from "./routes/loginRoutes";
import emailRoutes from "./routes/emailRoutes";
import statusRoutes from "./routes/statusRoutes";
import userRoutes from "./routes/userRoutes";
import keyRoutes from "./routes/keyRoutes";
import equeueRoutes from "./routes/enqueueRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { database } from "./data-source";
import { errorMiddleware } from "./middlewares/error";
import EnqueueService from "./services/enqueueService";
import RedisClient from "./clients/redis/redis_client";
import { corsConfig } from "./middlewares/cors.config";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Intervalo de tempo para execução da função consumeEmailQueue
const queueJobInterval = parseInt(process.env.QUEUE_JOB_INTERVAL ?? "30000");


// Middleware
app.use(express.json());
app.use(corsConfig);
app.use(errorMiddleware);

function setupRoutes(): void {
  app.use("/api/documentation/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/email/", emailRoutes);
  app.use("/api/", statusRoutes);
  app.use("/api/auth/", loginRoutes);
  app.use("/api/user/", userRoutes);
  app.use("/api/key/", keyRoutes);
  app.use("/api/enqueue/", equeueRoutes);
}

database.authenticate().then(() => {
  database.sync({ force: false }).then(() => {

    RedisClient.ping((err: any, result: any) => console.log('Redis connection status:', result));
    console.log(database.models);
    console.log("Database and tables created!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      return setupRoutes();
    });


    // Iniciar a execução da função consumeEmailQueue em intervalos regulares (aqui a cada 1 minuto)
    const emailQueueInstance = new EnqueueService(); // Substitua YourEmailQueueClass pela sua classe real
    setInterval(() => {
      emailQueueInstance.consumeEmailQueue().catch(error => console.error(error));
    }, queueJobInterval); // 30000 milissegundos = 30 segundos
  });
});

