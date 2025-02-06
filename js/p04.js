document.addEventListener("DOMContentLoaded", function () {
    const btnCargar = document.getElementById("btnCargar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const selectRaza = document.getElementById("selectRaza");
    const mensaje = document.getElementById("mensaje");
    const poster = document.getElementById("poster");

    // Cargar las razas automáticamente al iniciar la página
    cargarRazas();

    // Eventos
    btnCargar.addEventListener("click", mostrarImagen);
    selectRaza.addEventListener("change", mostrarImagen);
    btnLimpiar.addEventListener("click", limpiar);

    async function cargarRazas() {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            if (!response.ok) throw new Error("No se pudo obtener la lista de razas");
            const data = await response.json();

            selectRaza.innerHTML = '<option value="">Selecciona una raza</option>';
            for (const raza in data.message) {
                if (data.message[raza].length > 0) {
                    data.message[raza].forEach(subraza => {
                        const option = document.createElement("option");
                        option.value = `${raza}/${subraza}`;
                        option.textContent = `${raza.charAt(0).toUpperCase() + raza.slice(1)} - ${subraza.charAt(0).toUpperCase() + subraza.slice(1)}`;
                        selectRaza.appendChild(option);
                    });
                } else {
                    const option = document.createElement("option");
                    option.value = raza;
                    option.textContent = raza.charAt(0).toUpperCase() + raza.slice(1);
                    selectRaza.appendChild(option);
                }
            }
            mensaje.innerHTML = "Razas y subrazas cargadas correctamente ✅";
        } catch (error) {
            mensaje.innerHTML = "Error al cargar las razas: " + error.message;
        }
    }

    async function mostrarImagen() {
        const razaSeleccionada = selectRaza.value;
        if (!razaSeleccionada) {
            mensaje.innerHTML = "Por favor, selecciona una raza";
            return;
        }

        const url = `https://dog.ceo/api/breed/${razaSeleccionada}/images/random`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            poster.src = data.message;
            mensaje.innerHTML = `Imagen de un ${razaSeleccionada.replace('/', ' ')} 🐶`;
        } catch (error) {
            mensaje.innerHTML = "Error al cargar la imagen: " + error.message;
        }
    }

    function limpiar() {
        mensaje.innerHTML = "";
        poster.src = "/img/dogapiposter.png";
        selectRaza.value = "";
    }
});
