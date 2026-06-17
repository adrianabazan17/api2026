import { Router } from 'express';

import {
    getProductos,
    getProductoxId,
    postProducto,
    putProducto,
    deleteProducto
} from '../controladores/productosCtrl.js';

import { verificarToken } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = Router();


// =======================
// GET TODOS
// =======================
router.get(
    '/productos',
    verificarToken,
    getProductos
);


// =======================
// GET POR ID
// =======================
router.get(
    '/productos/:id',
    verificarToken,
    getProductoxId
);


// =======================
// POST (CON IMAGEN)
// =======================
router.post(
    '/productos',
    verificarToken,
    upload.single('imagen'),
    postProducto
);


// =======================
// PUT (CON IMAGEN OPCIONAL)
// =======================
router.put(
    '/productos/:id',
    verificarToken,
    upload.single('imagen'),
    putProducto
);


// =======================
// DELETE
// =======================
router.delete(
    '/productos/:id',
    verificarToken,
    deleteProducto
);

export default router;