import "dotenv/config";
import { ExpressServer } from "./api";
import { connectMongo } from "./config/mongo.connection"; // novo arquivo de conexão com o MongoDB

async function main() {
  try {
    await connectMongo(); // conecta ao MongoDB
    console.log("MongoDB database running...");

    const server = new ExpressServer(); // não precisa mais passar dbConnection
    server.registerRoutes();

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    await server.start(port);
  } catch (error) {
    console.error("Error during application initialization:", error);
    process.exit(1);
  }
}

main();
