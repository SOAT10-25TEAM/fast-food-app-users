import 'dotenv/config';
import express from 'express';
import { connectMongo } from './config/mongo.connection';
import { userRoutes } from './User/routes';
import { swaggerRouter } from './api/middlewares/swaggerMiddleware';
import { errorHandler } from './api/middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use("/soat-api", userRoutes());
app.use(swaggerRouter);
app.use(errorHandler);

connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
