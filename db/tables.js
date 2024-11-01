import pool from "./db.js";

export const createTables = async () => {
  try {
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS columns (
            id SERIAL PRIMARY KEY, 
            column_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS boards (
            id SERIAL PRIMARY KEY, 
            title VARCHAR(255) UNIQUE NOT NULL,
            columns INT REFERENCES columns(id),
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS tasks (
              id SERIAL PRIMARY KEY, 
              title VARCHAR(255) NOT NULL,
              orders VARCHAR(255) NOT NULL,
              description TEXT,
              user_id INT REFERENCES users(id) ON DELETE SET NULL,
              board_id INT REFERENCES boards(id) ON DELETE CASCADE,
              column_id INT REFERENCES columns(id),
              createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
              updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          )`
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const dropTables = async () => {
  try {
    const tables = [
      `DROP TABLE tasks`,
      `DROP TABLE boards`,
      `DROP TABLE users`,
      `DROP TABLE columns `
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}