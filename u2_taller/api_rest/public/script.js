function guardar() {

    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value

    let data = { nombre:nombre_, apellido:apellido_ }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar_usuario() {
    guardar()
        .then( (response) => {
            alert('Registro exitoso.')
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}

function actualizar_usuario() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre_actualizar').value;
    const apellido = document.getElementById('apellido_actualizar').value;

    let data = { nombre, apellido };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(`/usuario/${id}`, request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
    .then(response => alert('Usuario actualizado exitosamente.'))
    .catch(error => alert('Error al actualizar el usuario.'));
}



function eliminar_usuario() {
    const id = document.getElementById('id_eliminar').value;
    console.log('Valor del ID:', id);
    if (!id) {
        alert('Por favor, ingresa un ID válido');
        return;
    }

    
    fetch(`/usuario/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert(`Usuario con ID ${id} eliminado exitosamente`);
        } else {
            return response.json().then(data => {
                alert(`Error al eliminar usuario: ${data.message}`);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el usuario');
    });


}