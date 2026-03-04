import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { healthRouter } from "./routes/health.routes";
import { newJoinersRouter } from "./routes/newJoiners.routes";

dotenv.config({ path: "../../.env" }); // load the ONE root .env

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use("/api/health", healthRouter);
app.use("/api/new-joiners", newJoinersRouter);

const port = Number(process.env.BRIDGE_PORT || 5179);
app.listen(port, () => {
    console.log(`Bridge running on http://127.0.0.1:${port}`);
});