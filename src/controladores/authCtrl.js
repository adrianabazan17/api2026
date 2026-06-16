import jwt from 'jsonwebtoken'
import { conmysql } from '../db.js'

export const login = async (req, res) => {

    try {

        const { usuario, clave } = req.body

        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE usr_usuario=? AND usr_clave=?',
            [usuario, clave]
        )

        if (rows.length === 0) {
            return res.status(401).json({
                mensaje: 'Usuario o clave incorrectos'
            })
        }

        const token = jwt.sign(
            {
                id: rows[0].usr_id,
                usuario: rows[0].usr_usuario,
                nombre: rows[0].usr_nombre
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.json({
            mensaje: 'Login correcto',
            token
        })

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        })

    }

}