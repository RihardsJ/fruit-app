export interface IConfigs {
  PORT: number | string;
  ENDPOINTS: {
    BASE: string;
    DATABASE: string;
    PRODUCTS: string;
    USERS: string;
    ORDERS: string;
  };
  HTTP_STATUS: {
    OK: number;
    CREATED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    INTERNAL_SERVER_ERROR: number;
  };
  LOGGING: {
    FORMAT: string;
  };
  QUERIES: {
    INCLUDE_ORDER_ITEMS: {
      include: {
        orderItems: {
          include: {
            product: boolean;
          };
        };
      };
    };
  };
}
