'use-strict';

import { Request, Response, NextFunction } from 'express';
import db from '../database/prisma';
import configs from '../config';

const {
  QUERIES: { INCLUDE_ORDER_ITEMS },
  HTTP_STATUS: { OK, CREATED, NOT_FOUND },
} = configs;

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await db.user.findMany();
    if (!users.length) {
      res.status(NOT_FOUND).json({ data: [], message: 'No users found in database!' });
    }
    res.status(OK).json({ data: users });
  } catch (error) {
    next(error);
  }
}

async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.params;
    const user = await db.user.findUnique({ where: { userId } });
    if (!user) {
      res
        .status(NOT_FOUND)
        .json({ message: `User data for userId [${userId}] is not found!` });
    }
    res.status(OK).json({ data: user });
  } catch (error) {
    next(error);
  }
}

async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.params;
    const userOrders = await db.order.findMany({
      where: { customerId: userId },
      ...INCLUDE_ORDER_ITEMS,
    });
    if (!userOrders) {
      res
        .status(NOT_FOUND)
        .json({ data: [], message: `No orders found for the user :[${userId}]!` });
    }
    res.status(OK).json({ data: userOrders });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email }: { name: string; email: string } = req.body;
    const user = await db.user.create({ data: { name, email } });
    res.status(CREATED).json({ data: user });
  } catch (error) {
    next(error);
  }
}

export default {
  list,
  read,
  create,
  orders: {
    list: listOrders,
  },
};
