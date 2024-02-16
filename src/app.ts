import express from "express";
import cors from "cors";
import loginRoutes from "./routes/loginRoutes";
import emailRoutes from "./routes/emailRoutes";
import statusRoutes from "./routes/statusRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { database } from "./data-source";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

function setupRoutes(): void {
  app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/email", emailRoutes);
  app.use("/api/", statusRoutes);
  app.use("/api", loginRoutes);
  app.use("/api/usuario", usuarioRoutes);
}

database.sync({ force: true }).then(() => {
  console.log(database.models);

  console.log("Database and tables created!");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    return setupRoutes();
  });
});
