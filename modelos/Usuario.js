const mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema({
    iddocumentoIdentificacion: Number,
    tipoDocumento: String,
    nombres: String,
    apellidos: String,
    direccion: String,
    correoElectronico: String,
    telefonoFijo: String,
    telefonoCelular: String,
    enlaceSitioWeb: String,
    descripcionPerfil: String
});

module.exports = mongoose.model('usuario', UsuarioSchema, 'Usuarios');