const express = require("express");
const controladorUsuario = require("../controllers/usuarios.js");
const { validaRegistro,validaLogin } = require("../middleware/validaciones.js");

const registroActividad = require("../utils/registro_actividad.js");

const router = express.Router();

router.use(registroActividad);

router.get("/usuarios",  controladorUsuario.retornarUsuario);
router.post("/usuarios", validaRegistro, controladorUsuario.registrarUsuario);

router.post("/login", validaLogin, controladorUsuario.validaUsuario);





module.exports =  router ;