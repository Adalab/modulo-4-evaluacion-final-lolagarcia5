// Servidor Express

// Para probar los ficheros estáticos del fronend, entrar en <http://localhost:4500/>
// Para probar el API, entrar en <http://localhost:4500/api/items>

// Imports

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require('dotenv').config()

// Arracar el servidor

const server = express();

// Configuración del servidor

server.use(cors());
server.use(express.json({limit: "25mb"}));

// Conexion a la base de datos

async function getConnection() {
  const connection = await mysql.createConnection(
    {
      host: process.env.DB_HOST || "sql.freedb.tech",
      user: process.env.DB_USER || "freedb_lola garcia",
      password: process.env.DB_PASS,  // <-- Pon aquí tu contraseña o en el fichero /.env en la carpeta raíz
      database: process.env.DB_NAME || "freedb_evaluación",
    }
  );

  connection.connect();

  return connection;
}

// Poner a escuchar el servidor

const port = process.env.PORT || 3306;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});



// Endpoints

// GET /api/items

server.get('GET/recetas/:id', async (req, res) => {

  const user = req.params.id;
  const select = 'select * from recetas where id = ?';
  const conn = await getConnection();
  const [result] = await conn.query (select,user);
  conn.end();
  res.jason ({
      "info": { "count": result.length}, // número de elementos  
      "results": result, // listado 
  })
});

// nueva receta
server.post('POST/recetas', async (req,res)=>{
const user = req.params.user;
const nuevareceta = req.body;

try{
const insert = "insert into recetas (`nombre`,`ingredientes`,`instrucciones`)values(?,?,?)";
const conn = await getConnection();
const [result] = await conn.query (insert, [
  user,
  recetas.nombre,
  recetas.ingrediente,
  recetas.instrucciones,
])
conn.end();
res.json({
  sucess: true,
  id: nuevo_id,
});
}catch (error){
  res.json({
    sucess: false,
    message: "texto mínimamente descriptivo del error",
  });
}
});

// Actualizar receta

server.put('PUT/recetas', async (req,res)) => {
  const user = req.params.user,
  const recetasid = req.params.recetas_id,
  const {nombre, ingredientes, instrucciones} = req.body;

  try{
    const update = 'UPDATE recectas SET nombre = ?, ingredientes = ?, instrucciones =? WHERE id = ?';
    const conn = await getConnection();
    const [result] = await conn.query (update, [
      nombre,ingredientes, instrucciones,recetasid
    ])
    conn.end()
    res.json({
      sucess: true,});


  }catch (error){
    res.json({
      sucess: false,
      message: "texto mínimamente descriptivo del error",
  });
}};

//eliminar una receta
server.put('DELETE/recetas/:id', async (req,res))=>
const {user, recetas_id}  = req.params;

try{
  const deletesql = delete from recetas where id=?;
  const conn = await getConnection();
  const [result] = await conn.query (deltesql, [recetas_id, user]);
  conn.end();
  res.json({
    sucess: false,
    message: "texto mínimamente descriptivo del error",
  });



}catch (error){
  res.json({
    sucess: false,
    message: "texto mínimamente descriptivo del error",
})};

