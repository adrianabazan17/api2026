import{conmysql} from '../db.js'

export const getClientes=
    async (req,res)=>{
    try {
        const [result]= await conmysql.query(' select * from clientes')
        res.json(result)
    }catch (error) {
        return res.status(500).json({message:"Error al consultar clientes"})
    }
    }
    

export const getclientesxid=async(req,res)=>{
    try{
        const [result]= await conmysql.query(
            'select * from clientes where cli_id=?' ,[req.params.id]);
        if(result.length<=0) return res.json(
            {
            cantidad:0,
            mensaje:"Cliente no encontrado"
            }
        )
        res.json(
            {
            cantidad:result.length,
            data:result[0]
            }
        );
    } catch(error){
        return res.status(500).json({mensage:"error en el servidor"});
    }
}

export const postInsertarCliente=async(req,res)=>{
    try{
        const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad}=req.body
        //console.log(req.body)
        const [result]= await conmysql.query(
            'insert into clientes(cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad) values (?,?,?,?,?,?,?)',
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad]
        )
        res.send({cli_id:result.insertId})

    } catch(error){
        return res.status(500).json({mensage:"error en el servidor"});
    }
}

export const putCliente=async(req,res)=>{
    try{
        const {id}=req.params
        const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad}=req.body
        //console.log(req.body)
        const [result]= await conmysql.query(
            'update clientes set cli_identificacion=?,cli_nombre=?,cli_telefono=?,cli_correo=?,cli_direccion=?,cli_pais=?,cli_ciudad=? where cli_id=? ',
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad,id]
        )
        res.send({message:"Cliente Modificado"})

    } catch(error){
        return res.status(500).json({mensage:"error en el servidor"});
    }
}

export const patchCliente=async(req,res)=>{
    try{
        const {id}=req.params
        const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad}=req.body

        const [result]= await conmysql.query(
            `update clientes set
            cli_identificacion=IFNULL(?,cli_identificacion),
            cli_nombre=IFNULL(?,cli_nombre),
            cli_telefono=IFNULL(?,cli_telefono),
            cli_correo=IFNULL(?,cli_correo),
            cli_direccion=IFNULL(?,cli_direccion),
            cli_pais=IFNULL(?,cli_pais),
            cli_ciudad=IFNULL(?,cli_ciudad)
            where cli_id=?`,
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad,id]
        )

        res.send({message:"Cliente Modificado"})

    }catch(error){
        return res.status(500).json({mensage:"error en el servidor"});
    }
}

export const deleteCliente=async(req,res)=>{
    try{
        const {id}=req.params

        const [result]= await conmysql.query(
            'delete from clientes where cli_id=?',
            [id]
        )

        res.send({message:"Cliente Eliminado"})

    }catch(error){
        return res.status(500).json({mensage:"error en el servidor"});
    }
}