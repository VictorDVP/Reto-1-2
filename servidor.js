
const express = require('express');
const mongoose = require('mongoose');
const UsuarioSchema = require("./modelos/Usuario.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Conexión a base de datos
mongoose.connect("mongodb+srv://prog_web:ProgWebMintic2022@clusterprogweb.zkayp.mongodb.net/UsuariosBD?retryWrites=true&w=majority");

//Operaciones CRUD
router.get('/', (req, res) => {
    res.send("El inicio de mi API");
})

router.get('/usuario', (req, res) => {
    UsuarioSchema.find(function(err, datos){
        if(err){
            console.log("Error leyendo los usuarios");
        }else{
            res.send(datos);
        }
    })
})

router.post('/usuario', (req, res) => {
    let nuevoUsuario= new UsuarioSchema({
        tipoDocumento: req.body.tipoId,
        iddocumentoIdentificacion: req.body.id,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        correoElectronico: req.body.correo,
        telefonoFijo: req.body.fijo,
        telefonoCelular: req.body.celular,
        enlaceSitioWeb: req.body.enlace,
        descripcionPerfil: req.body.perfil
    })

    nuevoUsuario.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Usuario almacenado correctamente")
    })
}); 

router.put('/usuario/:idUsuario',(req, res)=>{
    const filter = { idUsuario: req.params.id };
    UsuarioSchema.findOne(filter,function(err, usuario){
        if(err){
            console.log("Error leyendo el usuario");
        }else{
            usuario.tipoDocumento=req.body.tipoId;
            usuario.nombres= req.body.nombres;
            usuario.apellidos= req.body.apellidos;
            usuario.direccion= req.body.direccion;
            usuario.correoElectronico= req.body.correo;
            usuario.telefonoFijo= req.body.fijo;
            usuario.telefonoCelular= req.body.celular;
            usuario.enlaceSitioWeb= req.body.enlace;
            usuario.descripcionPerfil= req.body.perfil
            usuario.save(function(err, datos){
                if(err){
                    console.log(err);
                }
                res.send("Usuario actualizado correctamente")
            })
        }
    })
});

router.delete('/usuario/:idUsuario',(req, res)=>{
    const filter = { idUsuario: req.params.idUsuario };
    UsuarioSchema.findOneAndDelete(filter,function(err, usuario){
        if(err){
            console.log("Error leyendo el usuario");
        }else{
            if(err){
                console.log(err);
            }
                res.send("Usuario eliminado correctamente")
        }
    })
});

app.use(router);
app.listen(3000, () => {
    console.log("servidor corriendo en el puerto 3000")
});