document.addEventListener("DOMContentLoaded", function () {
    const btnCargar = document.getElementById("btnCargar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const selectRaza = document.getElementById("selectRaza");
    const mensaje = document.getElementById("mensaje");
    const poster = document.getElementById("poster");

    
    cargarRazas();

    // Eventos
    btnCargar.addEventListener("click", mostrarImagen); // 
    selectRaza.addEventListener("change", mostrarImagen);
    btnLimpiar.addEventListener("click", limpiar);

    function cargarRazas() {
        const url = "https://dog.ceo/api/breeds/list/all";

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la lista de razas");
                }
                return response.json();
            })
            .then(data => {
                if (!data.message || Object.keys(data.message).length === 0) {
                    throw new Error("No se encontraron razas disponibles");
                }

                selectRaza.innerHTML = '<option value="">Selecciona una raza</option>'; // 

                for (const raza in data.message) {
                    if (data.message.hasOwnProperty(raza)) {
                        const option = document.createElement("option");
                        option.value = raza;
                        option.textContent = raza.charAt(0).toUpperCase() + raza.slice(1); // 
                        selectRaza.appendChild(option);
                    }
                }

                mensaje.innerHTML = "Razas cargadas correctamente ✅";
            })
            .catch(error => {
                mensaje.innerHTML = "Error al cargar las razas: " + error.message;
            });
    }

    function mostrarImagen() {
        const raza = selectRaza.value;
        if (raza === "") {
            mensaje.innerHTML = "Por favor, selecciona una raza";
            return;
        }

        const url = `https://dog.ceo/api/breed/${raza}/images/random`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la imagen");
                }
                return response.json();
            })
            .then(data => {
                poster.src = data.message;
                mensaje.innerHTML = `Imagen de un ${raza} 🐶`;
            })
            .catch(error => {
                mensaje.innerHTML = "Error al cargar la imagen: " + error.message;
            });
    }

    function limpiar() {
        mensaje.innerHTML = "";
        poster.src = "/img/dogapiposter.png"; // 
    }
});
