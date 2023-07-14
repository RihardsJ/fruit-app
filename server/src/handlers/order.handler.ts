'use-strict';

import { Request, Response, NextFunction } from 'express';
import configs from '../config';
import db from '../database/prisma';

const {
  QUERIES: { INCLUDE_ORDER_ITEMS },
  HTTP_STATUS: { OK, CREATED, NOT_FOUND },
} = configs;

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await db.order.findMany(INCLUDE_ORDER_ITEMS);
    if (!orders) {
      res.status(NOT_FOUND).json({ message: 'No orders found in database!' });
    }
    console.log(orders);
    res.status(OK).json({ data: orders });
  } catch (error) {
    next(error);
  }
}

async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId }: { id?: string } = req.params;
    const order = await db.order.findUnique({
      where: { orderId },
      ...INCLUDE_ORDER_ITEMS,
    });
    if (!order) {
      res
        .status(NOT_FOUND)
        .json({ message: `Order data for orderId [${orderId}] is not found!` });
    }
    res.status(OK).json({ data: order });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, products }: { userId: string; products: [] } = req.body;
    const order = await db.order.create({
      data: {
        customerId: userId,
        orderItems: {
          create: products,
        },
      },
    });
    res.status(CREATED).json({ data: order });
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId }: { id?: string } = req.params;
    const { products }: { products: [{ productId: string; quantity: number }] } =
      req.body;

    await db.orderItem.deleteMany({ where: { orderId } });
    const newOrder = await db.orderItem.createMany({
      data: products.map((product: { productId: string; quantity: number }) => ({
        orderId,
        productId: product.productId,
        quantity: product.quantity,
      })),
    });

    res.status(CREATED).json({ data: newOrder });
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId }: { id?: string } = req.params;
    const order = await db.order.delete({
      where: { orderId },
    });
    res.status(OK).json({ data: order });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  list,
  read,
  update,
  delete: remove,
};
