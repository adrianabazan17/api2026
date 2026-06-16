import { conmysql } from '../db.js'

export const getProductos = async(req,res)=>{
    try{

        const [result] = await conmysql.query(
            'select * from productos'
        )

        res.json(result)

    }catch(error){

        return res.status(500).json({
            message:'Error al consultar productos'
        })

    }
}

export const getProductoxId = async(req,res)=>{

    try{

        const [result] = await conmysql.query(
            'select * from productos where prod_id=?',
            [req.params.id]
        )

        if(result.length<=0){

            return res.json({
                cantidad:0,
                mensaje:'Producto no encontrado'
            })

        }

        res.json({
            cantidad:result.length,
            data:result[0]
        })

    }catch(error){

        return res.status(500).json({
            message:'Error servidor'
        })

    }

}

export const putProducto = async(req,res)=>{

    try{

        const {id}=req.params

        const {
            prod_codigo,
            prod_nombre,
            prod_stock,
            prod_precio,
            prod_activo,
            prod_imagen
        } = req.body

        await conmysql.query(
            `update productos set
            prod_codigo=?,
            prod_nombre=?,
            prod_stock=?,
            prod_precio=?,
            prod_activo=?,
            prod_imagen=?
            where prod_id=?`,
            [
                prod_codigo,
                prod_nombre,
                prod_stock,
                prod_precio,
                prod_activo,
                prod_imagen,
                id
            ]
        )

        res.json({
            mensaje:'Producto actualizado'
        })

    }catch(error){

        return res.status(500).json({
            message:'Error servidor'
        })

    }

}

export const deleteProducto = async(req,res)=>{

    try{

        const {id}=req.params

        await conmysql.query(
            'delete from productos where prod_id=?',
            [id]
        )

        res.json({
            mensaje:'Producto eliminado'
        })

    }catch(error){

        if(error.code === 'ER_ROW_IS_REFERENCED_2'){

            return res.status(400).json({
                message:'No se puede eliminar el producto porque tiene pedidos asociados'
            })

        }

        return res.status(500).json({
            message:error.message
        })

    }

}