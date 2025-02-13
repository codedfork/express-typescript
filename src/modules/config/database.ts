import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
const AppDataSource = new DataSource({
  type: "postgres", // Database type
  host: process.env.DB_HOST || "localhost", // Database host (e.g., "localhost" or a remote URL)
  port: Number(process.env.DB_PORT) || 5432, // Database port (default for PostgreSQL is 5432)
  username: process.env.DB_USERNAME || "your_username", // Database username
  password: process.env.DB_PASSWORD || "your_password", // Database password
  database: process.env.DB_NAME || "your_database_name", // Database name
  synchronize: true, // Automatically synchronize your schema (useful in development)
  logging: true, // Enable query logging (for development and debugging)
  entities: [], // Specify your entities here
  migrations: [], // Optionally, specify migrations if you're using them
  subscribers: [], // Optional, for event listeners
});

export default AppDataSource;
