const btnBuscar = document.getElementById("buscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tbody = document.getElementById("tbody");

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);

function buscar() {
    limpiar();
    const id = document.getElementById("idjson").value;

    if (!id) {
        mensaje.innerHTML = "No capturaste ningún ID";
        return;
    }
    
    const http = new XMLHttpRequest();
    const url = `https://jsonplaceholder.typicode.com/albums/` + id; // Corregido aquí
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const album = JSON.parse(this.responseText);

                // Crear fila en la tabla con los datos obtenidos
                const fila = document.createElement('tr');

                const columnaUserId = document.createElement('td');
                columnaUserId.textContent = album.userId;
                fila.appendChild(columnaUserId);

                const columnaId = document.createElement('td');
                columnaId.textContent = album.id;
                fila.appendChild(columnaId);

                const columnaTitle = document.createElement('td');
                columnaTitle.textContent = album.title;
                fila.appendChild(columnaTitle);

                tbody.appendChild(fila);

                mensaje.innerHTML = "Datos cargados correctamente";
            } else if (this.status === 404) {
                mensaje.innerHTML = "ID no identificado";
            } else {
                mensaje.innerHTML = "Ocurrió un error inesperado";
            }
        }
    };
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
}
