#!/usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
BEGIN;

CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   user_id INT NOT NULL REFERENCES users(id),
   parent_id INT REFERENCES messages(id),
   title VARCHAR(100) NOT NULL,
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   content VARCHAR(1000) NOT NULL,
   status VARCHAR(20) DEFAULT 'active'
);
COMMIT;
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error during database seeding:", error.stack);
  } finally {
    await client.end();
  }
}

main();
