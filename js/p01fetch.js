const btnCargar = document.getElementById("cargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnCargar.addEventListener('click', cargar);
btnLimpiar.addEventListener('click', limpiar);

let registros = 0; 

function cargar() {
    const url = "https://jsonplaceholder.typicode.com/albums";

    fetch(url)
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            
            tbody.innerHTML = ''; 
            registros = 0; 
            datos.forEach(item => {
                registros++; 
                const fila = document.createElement('tr');

                const columna1 = document.createElement('td');
                columna1.textContent = registros;
                fila.appendChild(columna1);

                const columna2 = document.createElement('td');
                columna2.textContent = item.userId;
                fila.appendChild(columna2);

                const columna3 = document.createElement('td');
                columna3.textContent = item.id;
                fila.appendChild(columna3);

                const columna4 = document.createElement('td');
                columna4.textContent = item.title;
                fila.appendChild(columna4);

                tbody.appendChild(fila);
            });
            tabla.appendChild(tbody);
            mensaje.innerHTML = "Cantidad de Registros: " + registros;
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error: " + error.message;
        });
}

function limpiar() {
    
    tbody.innerHTML = '';
    mensaje.innerHTML = '';
    registros = 0; 
}