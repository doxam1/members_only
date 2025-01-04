#!/usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
BEGIN;

CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ) UNIQUE,
   password VARCHAR ( 255 )
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
