import { Request, Response, Router, response } from "express";
import router from "./routes/emailRoutes";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
    response.json({ message: "Server is Runing" });
});

routes.post("/send-email", router);


export default routes;