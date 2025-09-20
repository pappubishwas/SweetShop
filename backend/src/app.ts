import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import sweetsRoutes from "./routes/sweets";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.use(errorHandler);

export default app;
