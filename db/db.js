import pg from "pg";
import { config } from "dotenv";
config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const connectDatabase = async () => {
  try {

    const client = await pool.connect();
    console.log(`App connected on DB: ${client.database}`);

    client.release();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default pool;