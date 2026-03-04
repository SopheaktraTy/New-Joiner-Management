import { Router } from "express";
import { testDbConnection } from "../db/access";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
    try {
        await testDbConnection();
        res.json({ ok: true });
    } catch (err: any) {
        res.status(500).json({ ok: false, error: err?.message || "DB error" });
    }
});