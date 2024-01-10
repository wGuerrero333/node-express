// la forma por defualt es type= jscommon la otra es la forma modular
// const express = required('express')
import  express  from "express"
// import ejs from "ejs" se importa pero como viene intergado a node no es necesario
// estas son utiles para encontrar la direccion absoluta de la carpeta views
import {dirname, join} from 'path';
import { fileURLToPath} from 'url'

import indexRouters from './routes/index.js'

const app = express()
// forma dinamica de encontar la ruta ABSOLUTA
const __dirname =  dirname(fileURLToPath(import.meta.url))
// console.log(__dirname) 
// join() concatena las rutas sin importar que sean windows o linux es equivalente a
app.set('views',join(__dirname,'vistas'))
// establece el view engine para incorporar ejs  ~~ ( html enriquecido osea .ejs)
app.set('view engine', 'ejs')



// cuando envie una peticion GET importa indexRoutes desde routes y haga la peticion
app.use(indexRouters)

// para ue express le permita usar la carpeta public ~~ static
app.use(express.static(join (__dirname, 'public') ))
// en el navegar se puede acceder al main.css asi: http://localhost:3000/main.css

app.listen( process.env.PORT || 3000)
console.log("Escucha por" ,process.env.PORT || 3000)