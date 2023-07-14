'use-strict';

import { Request, Response } from 'express';
import configs from '../config';
import db from '../database/prisma';

const {
  HTTP_STATUS: { OK, INTERNAL_SERVER_ERROR },
} = configs;

async function databaseCheck(req: Request, res: Response) {
  try {
    await db.$connect();
    res.status(OK).send({ message: 'Database connection is healthy' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Database connection error' });
  } finally {
    await db.$disconnect();
  }
}

async function serverCheck(req: Request, res: Response) {
  res.status(OK).send({ message: 'Server is healthy' });
}

export default {
  databaseCheck,
  serverCheck,
};
