// la forma por defualt es type= jscommon la otra es la forma modular
// const express = required('express')
import  express  from "express"


// import ejs from "ejs" se importa pero como viene intergado a node no es necesario
// estas son utiles para encontrar la direccion absoluta de la carpeta views


import {dirname, join} from 'path';
import { fileURLToPath} from 'url'

// dotenv detecta las variavles de entorno
// import {config } from 'dotenv' 
// config()


// pg es un modulo para conectarse a PostgreSQL
import pg from 'pg'

import indexRouters from './routes/index.js'

const app = express()

const conexion = new pg.Pool({
    // Esta conexion con la db fuciona para localhost 5432 al parecer no detecta la variable de entorno en .ENV
    // connectionString: "postgres://djangocruddb_yf1v_user:a17MmMBm9HYf8PPpE5OXEBlsV3hvgYCt@dpg-cm6ravud3nmc73ar9nq0-a.oregon-postgres.render.com/djangocruddb_yf1v",
    // conexion con la db para despliegue en RENDER
    connectionString: process.env.DATABASE_URL,

    // ssl solo necesario en DEVELOPMENT
    // ssl:true
})



// la forma dinamica de encontar la ruta ABSOLUTA
const __dirname =  dirname(fileURLToPath(import.meta.url))
// console.log(__dirname) 
// join() concatena las rutas sin importar que sean windows o linux es equivalente a
app.set('views',join(__dirname,'vistas'))
// establece el view engine para incorporar ejs  ~~ ( html enriquecido osea .ejs)
app.set('view engine', 'ejs')

app.get('/conexion2', async(req,res)=>{
    const resultado =  await conexion.query('SELECT NOW()')
    return res.json(resultado.rows[0])
})
app.get('/text',(req,res)=>{
    res.send("Respuesta send text ")
})

// cuando envie una peticion GET importa indexRoutes desde routes y haga la peticion
app.use(indexRouters)

app.get('/respuestadb', async (req,res) => {
    const resultado = await poolObjeto.query('SELECT_NOW()')
    return res.json(resultado.rows[0])
})

// para ue express le permita usar la carpeta public ~~ static
app.use(express.static(join (__dirname, 'public') ))
// en el navegar se puede acceder al main.css asi: http://localhost:3000/main.css

app.listen( process.env.PORT || 5432)
console.log("Escucha por" ,process.env.PORT || 5432)