const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");
const titulo = document.getElementById("txtPelicula").value;
const poster = document.getElementById("poster");


btnBuscar.addEventListener('click',buscarPelicula);
btnLimpiar.addEventListener('click', limpiar);

function buscarPelicula(){
const titulo = document.getElementById("txtPelicula").value;
const apiKey = "30063268"
const url = "https://www.omdbapi.com/?apiKey=" + apiKey + "&t=" + titulo

fetch(url)
.then ((response)=>{
    if(!response.ok){
        alert("no se encontro el servicio")
    }
    return response.json();
})
.then(data=>{
    if(data.response=="False") mensaje.innerHTML = data.Error;
    else {
        mostrar(data)
    }})
    .catch((error)=>{
        mensaje.innerHTML = "Surgio un error " + error
        
    })
    }
    function mostrar (data){
        const fila = document.createElement('tr');
        let registros = 1;
                const columna1 = document.createElement('td');
                columna1.textContent = registros;
                fila.appendChild(columna1);

                const columna2 = document.createElement('td');
                columna2.textContent = data.Title;
                fila.appendChild(columna2);

                const columna3 = document.createElement('td');
                columna3.textContent = data.Released;
                fila.appendChild(columna3);

                const columna4 = document.createElement('td');
                columna4.textContent = data.Plot;
                fila.appendChild(columna4);
                tbody.appendChild(fila);
                tabla.appendChild(tbody)
                poster.src = data.Poster;

    }
    function limpiar(){
        tbody.innerHTML = "";
        mensaje.innerHTML = "";
        poster.src ="/img/api poster1.png"
    }

