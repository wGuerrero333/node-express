import { Router } from "express"
// estas variables inyectadas se usan en el .ejs <%= variable %>
const router = Router()
// pasar variables es de gran utlidad para pasar datos de la db
router.get("/", (req, res) => res.render("index", {titulo : "Titulo desde backends" ,variable : "Desdebackend"}))
router.get("/productos", (req, res) => res.render("productos"))

router.get("/about", (req, res) => res.render("about",{titulo : "Titulo desde backends" ,variable : "Abby Hot desde Backend"}))
// router.get("/respuestadb", (req, res) => { await }) .get.. 


export default router