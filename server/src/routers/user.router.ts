'use strict';

import { Router } from 'express';
import handler from '../handlers/user.handler';

const router: Router = Router();

// GET endpoints
router.get('/', handler.list);
router.get('/:id', handler.read);
router.get('/:id/orders', handler.orders.list);

// POST endpoints
router.post('/', handler.create);

export default router;
