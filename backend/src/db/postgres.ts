import { Client } from "pg";

// Create a new instance of the Client with type annotations
const client: Client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = async function () {
  try {
    await client.connect();
    console.log("client connected");
  } catch (err) {
    console.log("error connecting to db");
    process.exit(1);
  }
};

export { client, connectDB };
