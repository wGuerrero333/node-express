// la forma por defualt es type= jscommon la otra es la forma modular
// const express = required('express')
import express from "express"
import  bodyParser from 'body-parser'
// permite ver por consola las solicitudes get, post ...
import  morgan  from'morgan'
// var morgan = require('morgan') esta forma NO LA ACEPTA 



// import ejs from "ejs" se importa pero como viene intergado a node no es necesario
// estas son utiles para encontrar la direccion absoluta de la carpeta views


import { dirname, join } from 'path';
import { fileURLToPath } from 'url'

// dotenv detecta las variavles de entorno
// import {config } from 'dotenv' 
// config()


// pg es un modulo para conectarse a PostgreSQL
import pg from 'pg'

import indexRouters from './routes/index.js'

const app = express()

// conexion a la db postgres asignada por RENDER
// const conexion = new pg.Pool({
//     // Esta conexion con la db fuciona para localhost 5432 al parecer no detecta la variable de entorno en .ENV
//     connectionString: "postgres://djangocruddb_yf1v_user:a17MmMBm9HYf8PPpE5OXEBlsV3hvgYCt@dpg-cm6ravud3nmc73ar9nq0-a.oregon-postgres.render.com/djangocruddb_yf1v",
//     // conexion con la db para despliegue en RENDER
//     // connectionString: process.env.DATABASE_URL,

//     // ssl solo necesario en DEVELOPMENT
//     ssl:true
// })

// esta es la conexion a la db local


const poolLocal = new pg.Pool({
    host:'localhost',
    user:'postgres',
    password:'delcamino333',
    database:'node2_express2',
    port:4000,

})


// la forma dinamica de encontar la ruta ABSOLUTA
const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname) 
// join() concatena las rutas sin importar que sean windows o linux es equivalente a
app.set('view engine', 'ejs')

app.set('views', join(__dirname, 'vistas'))
// establece el view engine para incorporar ejs  ~~ ( html enriquecido osea .ejs)


app.get('/conexion2', async (req, res) => {
    const resultado = await poolLocal.query('SELECT * FROM  registroNew')
    return res.json(resultado.rows)
})
// HTTP request logger middleware for node.js muestra info en consola
app.use(morgan('dev'));

// Node.js body parsing middleware.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


// app.post("/productos",  bodyParser, async (req,res) => 
// {
//     console.log(req.body);
//     const nombre = req.body.nombre
//     const email = req.body.email
//     console.log( "nombre "  +nombre)
//  })   
// REVISAR EL BODY PARSE
    // const postear = await poolLocal.query('INSERT INTO registroNew (nombre, email) VALUES ($1, $2)' , [nombre, email])
    // return res.json(postear.rows)

    app.post('/productos', async (req, res)=>{
        // const { nombre, email} = req.body;
// En el form el name es lo que identifica los campos NO el ID 
        const nombre =   req.body.nombre
        const email = req.body.email

       
console.log(nombre)

        try{
            const result = await poolLocal.query(`INSERT INTO registronew (nombre, email) VALUES ($1, $2) RETURNING *`, [nombre, email])
            res.redirect('/productos')
        }
        catch(error){
            console.error('Ha surgido error: ', error);
            res.status(500).json({ error: 'Ha surgido un error' });
        }
    })
     


app.get('/text', (req, res) => {
    res.send("Respuesta send solo textos")
})

//Aqui estan las ROUTES cuando envie una peticion GET importa indexRoutes desde routes y haga la peticion
app.use(indexRouters)

app.get('/respuestadb', async (req, res) => {
    const resultado = await poolLocal.query('SELECT * FROM  registroNew')
    return res.json(resultado.rows)
})

// para ue express le permita usar la carpeta public ~~ static
app.use(express.static(join(__dirname, 'public')))
// en el navegar se puede acceder al main.css asi: http://localhost:3000/main.css



app.listen(process.env.PORT || 5432)
console.log("Escucha por", process.env.PORT || 5432)