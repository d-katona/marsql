import postgres from "postgres";

let sql;
const globalForPostgres = globalThis;

if (process.env.NODE_ENV === "development") {
    if (!globalForPostgres.__sql) {
        // console.log("SQL ::: creating connection");
        globalForPostgres.__sql = postgres();
    } else {
        // console.log("SQL ::: From globalThis");
    }

    sql = globalForPostgres.__sql;
} else {
    // console.log("SQL ::: creating connection");
    sql = postgres();
}

export default sql;