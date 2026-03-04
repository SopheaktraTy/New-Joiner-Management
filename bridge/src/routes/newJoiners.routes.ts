import { Router } from "express";
import { withDb } from "../db/access";

export const newJoinersRouter = Router();

newJoinersRouter.get("/", async (_req, res) => {
    try {
        const rows = await withDb(async (conn) => {
            // TODO: replace table name/fields to match your ACCDB schema
            const result = await conn.query("SELECT * FROM NewJoiners");
            return result;
        });
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err?.message || "Server error" });
    }
});