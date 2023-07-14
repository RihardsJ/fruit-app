'use strict';

import { Router } from 'express';
import handler from '../handlers/product.handler';

const router: Router = Router();

// GET endpoints
router.get('/', handler.list);
router.get('/:id', handler.read);

// POST endpoints
router.post('/', handler.create);

// PUT endpoints
router.put('/:id', handler.update);

// DELETE endpoints
router.delete('/:id', handler.delete);

export default router;
