import { Request, Response, NextFunction } from 'express';
import configs from '../config';

const {
  HTTP_STATUS: { NOT_FOUND, INTERNAL_SERVER_ERROR },
} = configs;

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(NOT_FOUND).send({ message: "Sorry can't find this endpoint!" });
}

function fallBack(err: Error, req: Request, res: Response, next: NextFunction) {
  res
    .status(INTERNAL_SERVER_ERROR)
    .send({ stack: err.stack, message: `Fruit API error: ${err.message}` });
}

export default {
  notFound,
  fallBack,
};
