import { conmysql } from '../db.js';

// 🔥 CREAR PEDIDO COMPLETO
export const postPedido = async (req, res) => {

  try {

    const { cliente_id, total, productos } = req.body;

    // 1. crear pedido
    const numero_pedido = `PED-${Date.now()}`;

    const [pedido] = await conmysql.query(
      `INSERT INTO pedidos (cliente_id, total, numero_pedido)
       VALUES (?, ?, ?)`,
      [cliente_id, total, numero_pedido]
    );

    const pedido_id = pedido.insertId;

    // 2. insertar detalle del pedido
    for (const item of productos) {

      await conmysql.query(
        `INSERT INTO detalle_pedido 
        (pedido_id, producto_id, cantidad, precio)
        VALUES (?, ?, ?, ?)`,
        [
          pedido_id,
          item.id,
          item.cantidad,
          item.precio
        ]
      );

    }

    res.json({
      message: "Pedido creado correctamente",
      pedido_id,
      numero_pedido
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear pedido" });
  }

};