const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function actualizar_usuario(id, dato) {
    return new Promise((resolve, reject) => {
        if (!dato.nombre || !dato.apellido) {
            reject('Los datos se encuentran incompletos.');
        } else {
            resolve(storage.actualizar(id, dato));
        }
    });
}

function eliminar_usuario(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('No se proporcionó el ID del usuario.');
        } else {
            resolve(storage.eliminar(id));
        }
    });
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario 
}