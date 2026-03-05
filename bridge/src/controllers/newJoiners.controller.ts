import { Request, Response } from "express";
import type { Connection } from "odbc";
import { withDb } from "../db/access";
import { NEW_JOINER_SQL } from "../db/sql";
import type { NewJoiner } from "../types/newJoiner";

const run = (conn: Connection, sql: string) => (conn as any).query(sql);

const isValidEmail = (email: unknown) =>
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getAll = async (_req: Request, res: Response) => {
    try {
        const rows = await withDb((conn) => run(conn, NEW_JOINER_SQL.getAll()));
        return res.json(rows);
    } catch (err: any) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const data = (req.body ?? {}) as Partial<NewJoiner>;

        const firstName = data.firstName?.trim();
        const lastName = data.lastName?.trim();

        if (!firstName || !lastName) {
            return res.status(400).json({
                status: "error",
                message: "firstName and lastName are required",
            });
        }

        if (data.companyEmail && !isValidEmail(data.companyEmail)) {
            return res.status(400).json({ status: "error", message: "Invalid companyEmail format" });
        }

        // Build escaped INSERT SQL in sql.ts
        const insertSql = NEW_JOINER_SQL.insert({
            ...data,
            firstName,
            lastName,
        });

        const latest = await withDb(async (conn) => {
            await run(conn, insertSql);
            return await run(conn, NEW_JOINER_SQL.getLatest());
        });

        return res.status(201).json({
            status: "success",
            message: "Joiner created successfully",
            data: latest,
        });
    } catch (err: any) {
        return res.status(500).json({ status: "error", message: "Failed to create: " + err.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ status: "error", message: "Invalid id" });
        }

        await withDb(async (conn) => {
            await run(conn, NEW_JOINER_SQL.deleteById(id));
        });

        return res.json({ status: "success", message: `Record with ID ${id} deleted.` });
    } catch (err: any) {
        return res.status(500).json({ status: "error", message: "Delete operation failed: " + err.message });
    }
};