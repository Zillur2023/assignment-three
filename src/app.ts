import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5000"] }));

// app.use('/api/v1/', router);
app.use("/api", router);

// const test = async (req:Request, res: Response) => {
// }

// app.get('/', test)

app.use(globalErrorHandler);

app.use(notFound);

export default app;
