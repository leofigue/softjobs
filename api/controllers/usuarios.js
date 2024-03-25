const { registraUsuario, validaUsuario, retornarUsuario } = require('../models/usuarios.js');
const jwt = require("jsonwebtoken");

class softController{
    constructor(){}
    async registrarUsuario (req, res) {
        try {
            const usuarios = await registraUsuario(req.body);
            res.status(200).json({usuarios})
        } catch ({ code, message }) {
            console.log(message);
            res.status(code || 500).json({message});
        }
    }
    
    async retornarUsuario (req, res) {
        try {
            console.log("HEADER: " + req.header("Authorization"))
            const Authorization = req.header("Authorization")
            const token = Authorization.split("Bearer ")[1]
            console.log("TOKEN: " + token)
            jwt.verify(token, process.env.CLAVE_JWT)
            const { email } = jwt.decode(token)
            const user = await retornarUsuario(email);
            console.log(user)
            res.status(200).json(user)
        } catch ({ code, message }) {
            console.log(message);
            res.status(code || 500).json({message});
        }
    }
    
    async validaUsuario (req, res) {
        try {
            const { email } = req.body
            const acceso = await validaUsuario(req.body);
            const token = jwt.sign( {email} , process.env.CLAVE_JWT);
            console.log("Token generado para usuario: ",email);
            console.log(token);
            res.status(200).json({token});    
        } catch ({ code, message }) {
            console.log(message);
            res.status(code || 500).json({message});
        }
    }
    
}

module.exports = new softController();