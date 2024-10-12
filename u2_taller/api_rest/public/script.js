function guardar() {

    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value

    let data = { nombre:nombre_, apellido:apellido_ }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
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
            listar_usuarios();
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
            listar_usuarios();
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
            listar_usuarios();
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


function listar_usuarios() {
    fetch('/usuario')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error al obtener usuarios: ' + data.error);
                return;
            }
            
            const usuarios = data.body;
            const tbody = document.getElementById('lista-usuarios');
            tbody.innerHTML = ''; 
            
            usuarios.forEach(usuario => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = usuario._id;
                row.insertCell(1).textContent = usuario.nombre;
                row.insertCell(2).textContent = usuario.apellido;
                row.insertCell(3).textContent = new Date(usuario.fecha_registro).toLocaleString();
                row.insertCell(4).textContent = new Date(usuario.fecha_actualizacion).toLocaleString();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al obtener la lista de usuarios');
        });
}

document.addEventListener('DOMContentLoaded', listar_usuarios);