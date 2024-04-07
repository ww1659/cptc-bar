import { Pool } from "pg";

interface Config {
  connectionString?: string;
  max?: number;
}

const ENV = "production";
const config: Config = {};

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 4;
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE not set");
}

console.log(ENV, "database");

export const db = new Pool(config);
