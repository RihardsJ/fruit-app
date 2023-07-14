'use strict';
import { IConfigs } from './interfaces/configs.interface';

const configs: IConfigs = Object.freeze({
  PORT: process.env.PORT || 5001,
  ENDPOINTS: {
    BASE: '/',
    DATABASE: '/database',
    USERS: '/api/users',
    PRODUCTS: '/api/products',
    ORDERS: '/api/orders',
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  LOGGING: {
    FORMAT: process.env.LOGGING_FORMAT || 'tiny',
  },
  QUERIES: {
    INCLUDE_ORDER_ITEMS: {
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    },
  },
});

export default configs;
