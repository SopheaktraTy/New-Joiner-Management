import odbc from "odbc";

function getConnectionString() {
    const driver = process.env.ODBC_DRIVER;
    const dbPath = process.env.ACCDB_PATH;

    if (!driver) throw new Error("ODBC_DRIVER is missing");
    if (!dbPath) throw new Error("ACCDB_PATH is missing");

    // Note: Dbq= must be an absolute path on Windows
    return `Driver={${driver}};Dbq=${dbPath};`;
}

export async function withDb<T>(fn: (conn: odbc.Connection) => Promise<T>) {
    const connStr = getConnectionString();
    const conn = await odbc.connect(connStr);
    try {
        return await fn(conn);
    } finally {
        await conn.close();
    }
}

export async function testDbConnection() {
    return withDb(async (conn) => {
        await conn.query("SELECT 1");
        return true;
    });
}