'use strict';

// External modules
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
// Configs
import configs from './config';
// Routers
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
// Handlers
import healthHandler from './handlers/health.handler';
import errorHandler from './handlers/error.handler';

const {
  ENDPOINTS,
  LOGGING: { FORMAT: LOG_FORMAT },
} = configs;

const app: Express = express();

// Middleware
app.use(cors());
app.use(morgan(LOG_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(ENDPOINTS.BASE, healthHandler.serverCheck);
app.get(ENDPOINTS.DATABASE, healthHandler.databaseCheck);

// Routes
app.use(ENDPOINTS.PRODUCTS, productRouter);
app.use(ENDPOINTS.USERS, userRouter);
app.use(ENDPOINTS.ORDERS, orderRouter);

// Not found handler
app.use(errorHandler.notFound);
// Error handler
app.use(errorHandler.fallBack);

export default app;
