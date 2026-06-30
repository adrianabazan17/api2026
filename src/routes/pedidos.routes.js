import { Router } from 'express';

import {
    guardarPedido,
    getPedidos,
    getPedidoxId
} from '../controladores/pedidosCtrl.js';

import {
    verificarToken
} from '../middlewares/auth.js';

const router = Router();

// Obtener todos los pedidos
router.get(
    '/pedidos',
    verificarToken,
    getPedidos
);

// Obtener pedido por ID
router.get(
    '/pedidos/:id',
    verificarToken,
    getPedidoxId
);

// Registrar pedido
router.post(
    '/pedidos',
    verificarToken,
    guardarPedido
);

export default router;