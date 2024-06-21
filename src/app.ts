import express from "express";
import cors from "cors";
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
import UserServices from "./services/userService";
import { CronJob } from "cron"; // Import the CronJob class

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Intervalo de tempo para execução da função consumeEmailQueue
const queueJobInterval = parseInt(process.env.QUEUE_JOB_INTERVAL ?? "30000");
const userService = new UserServices();

// Middleware
app.use(express.json());
app.use(corsConfig);
app.use(errorMiddleware);
app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }

));
function setupRoutes(): void {
  app.use("/api/documentation/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/email/", emailRoutes);
  app.use("/api/", statusRoutes);
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

    const job = new CronJob('00 00 00 * * *', async () => {
      console.log('Executando a rotina de deleção de usuários agendados');
      await userService.deleteUserByDeletionScheduledAt();
    });

    const jobSendEmails = new CronJob('12 00 00 * * *', async () => {
      console.log('Executando a rotina de envio de emails de solicitação de mundaça de senha');
      await userService.sendRememberPasswordChangeEmail();
    });

    job.start();
    jobSendEmails.start();

    const emailQueueInstance = new EnqueueService(); 
    setInterval(() => {
      emailQueueInstance.consumeEmailQueue().catch(error => console.error(error));
    }, queueJobInterval); // 30000 milissegundos = 30 segundos
  });
});

