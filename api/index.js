require('dotenv').config();


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PGPORT || 3000;
const route = require("./routes/route.js");

app.use(express.json());
app.use(cors());
app.use("/", route);

 

//Levanta el servidor
app.listen(PORT,console.log("Servidor iniciado!!!"));