'use-strict';

import { Request, Response, NextFunction } from 'express';
import db from '../database/prisma';
import configs from '../config';

const {
  HTTP_STATUS: { OK, CREATED, NOT_FOUND },
} = configs;

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await db.product.findMany();
    if (!products) {
      res.status(NOT_FOUND).json({ message: 'No products found in database!' });
    }
    res.status(OK).json({ data: products });
  } catch (error) {
    next(error);
  }
}

async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;
    const product = await db.product.findUnique({ where: { productId } });
    if (!product) {
      res
        .status(NOT_FOUND)
        .json({ message: `Product data for productId [${productId}] is not found!` });
    }
    res.status(OK).json({ data: product });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      label,
      description,
      price,
      unit,
      category,
    }: {
      label: string;
      description?: string;
      price: number;
      unit: string;
      category: string;
    } = req.body;
    const product = await db.product.create({
      data: { label, description, price, unit, category },
    });
    res.status(CREATED).json({ data: product });
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;
    const {
      label,
      description,
      price,
      unit,
      category,
    }: {
      label: string;
      description?: string;
      price: number;
      unit: string;
      category: string;
    } = req.body;
    const product = await db.product.update({
      where: { productId },
      data: { label, description, price, unit, category },
    });
    res.status(CREATED).json({ data: product });
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;
    const product = await db.product.delete({ where: { productId } });
    res.status(OK).json({ data: product });
  } catch (error) {
    next(error);
  }
}

export default {
  list,
  read,
  create,
  update,
  delete: remove,
};
