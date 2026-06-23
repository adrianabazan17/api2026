import { Router } from 'express';
import { getPedidos, postPedido } from "../controladores/pedidosCtrl.js";

const router = Router();

// ✔ SIN /pedidos porque ya está en app.js
router.post('/', postPedido);

export default router;