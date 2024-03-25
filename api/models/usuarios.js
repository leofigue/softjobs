const { pool } = require('../database/connection.js');

const bcrypt = require('bcryptjs');
const format = require('pg-format');

const existeEmail = async (email) => {
  const formattedQueryValida = format(`select * from existe_correo('%s')`, email)
  const  data  = await pool.query(formattedQueryValida)
  const {existe_correo} = data.rows[0]
  return existe_correo
  
};


const retornarUsuario = async (email) => {

  // console.log(email)

  const usuario ={
    text: 'SELECT email, rol, lenguage FROM usuarios WHERE email=$1',
    values: [email],
  }
 
  // console.log(usuario)
  const { rows } = await pool.query(usuario)


  return rows
  
};

const registraUsuario = async ({email, password, rol, lenguage}) => {
    
    const passwordEncriptada = bcrypt.hashSync(password);  

    const consulta ={
      text: 'INSERT INTO usuarios VALUES (DEFAULT,$1, $2,$3, $4)',
      values: [email, passwordEncriptada, rol, lenguage],
    }
   
    // console.log(consulta)
    const { rows } = await pool.query(consulta)


    return rows
    
  };

  const validaUsuario = async ({email, password}) => {

    const consulta ={
      text: 'SELECT password clave_registrada FROM usuarios where email=$1',
      values: [email]
    }
    const {rows} = await pool.query(consulta)
    const  { clave_registrada }  = rows[0]
   
    const passwordValida = bcrypt.compareSync(password, clave_registrada);

    if (passwordValida){
      return "OK"
    }
    else {
      throw { code: 401, message: "Password Incorrecta" };
    }

  };

  
module.exports= { existeEmail, registraUsuario, validaUsuario, retornarUsuario };