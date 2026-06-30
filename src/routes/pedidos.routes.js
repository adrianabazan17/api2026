import { Router } from 'express';

import {
    guardarPedido
} from '../controladores/pedidosCtrl.js';

import {
    verificarToken
} from '../middlewares/auth.js';

const router = Router();

// Registrar pedido
router.post(
    '/pedidos',
    verificarToken,
    guardarPedido
);

export default router;