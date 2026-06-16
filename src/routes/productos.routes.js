import { Router } from 'express'

import {
    getProductos,
    getProductoxId,
    putProducto,
    deleteProducto
}
from '../controladores/productosCtrl.js'

import { verificarToken } from '../middlewares/auth.js'

const router = Router()

router.get(
    '/productos',
    verificarToken,
    getProductos
)

router.get(
    '/productos/:id',
    verificarToken,
    getProductoxId
)

router.put(
    '/productos/:id',
    verificarToken,
    putProducto
)

router.delete(
    '/productos/:id',
    verificarToken,
    deleteProducto
)

export default router