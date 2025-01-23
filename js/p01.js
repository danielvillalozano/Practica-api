const btnCargar = document.getElementById("cargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");


btnCargar.addEventListener('click', cargar);
btnLimpiar.addEventListener('click', limpiar);

function cargar(){
    var registros = 0;
    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/albums";
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function(){
        // Validar
        if(this.status == 200 && this.readyState == 4){
            const datos = JSON.parse(this.responseText);
            datos.forEach(item => {
                ++registros;
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

        }else mensaje.innerHTML = "Surgio un error o aun no termina";
    }

}

function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
}