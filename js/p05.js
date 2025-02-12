document.addEventListener("DOMContentLoaded", () => {
    const selectCategoria = document.getElementById("selectCategoria");
    const selectCoctel = document.getElementById("selectCoctel");
    const btnCargar = document.getElementById("btnCargar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const poster = document.getElementById("poster");
    const mensaje = document.getElementById("mensaje");

    // Cargar categorías de cócteles
    function cargarCategorias() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
            .then(response => response.json())
            .then(data => {
                selectCategoria.innerHTML = '<option selected>Selecciona una categoría</option>';
                data.drinks.forEach(drink => {
                    let option = document.createElement("option");
                    option.value = drink.strCategory;
                    option.textContent = drink.strCategory;
                    selectCategoria.appendChild(option);
                });
            })
            .catch(error => console.error("Error al cargar categorías:", error));
    }

    // Cargar cócteles por categoría
    function cargarCocteles() {
        let categoriaSeleccionada = selectCategoria.value;
        if (categoriaSeleccionada === "Selecciona una categoría") {
            mensaje.textContent = "Por favor, elige una categoría.";
            selectCoctel.innerHTML = '<option selected>Selecciona un cóctel</option>';
            return;
        }

        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoriaSeleccionada}`)
            .then(response => {
                selectCoctel.innerHTML = '<option selected>Selecciona un cóctel</option>';
                response.data.drinks.forEach(coctel => {
                    let option = document.createElement("option");
                    option.value = coctel.idDrink;
                    option.textContent = coctel.strDrink;
                    selectCoctel.appendChild(option);
                });
            })
            .catch(error => console.error("Error al obtener cócteles:", error));
    }

    // Obtener detalles completos del cóctel
    function obtenerDetallesCoctel() {
        let coctelId = selectCoctel.value;
        if (coctelId === "Selecciona un cóctel") {
            mensaje.textContent = "Por favor, elige un cóctel.";
            return;
        }

        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${coctelId}`)
            .then(response => {
                let detalle = response.data.drinks[0];
                mensaje.innerHTML = `
                    <strong>Nombre:</strong> ${detalle.strDrink} <br>
                    <strong>Alcohol:</strong> ${detalle.strAlcoholic} <br>
                    <strong>Categoría:</strong> ${detalle.strCategory} <br>
                    <strong>Ingredientes:</strong> ${obtenerIngredientes(detalle)} <br>
                    <strong>Instrucciones:</strong> ${detalle.strInstructions}
                `;
                poster.src = detalle.strDrinkThumb || "/img/apipostercoctel.png";
                poster.alt = `Imagen de ${detalle.strDrink}`;
                poster.style.display = "block";
            })
            .catch(error => {
                console.error("Error al obtener detalles del cóctel:", error);
                mensaje.innerHTML = "Ocurrió un error al obtener el cóctel.";
                poster.style.display = "none";
            });
    }

    // Función para obtener ingredientes y medidas
    function obtenerIngredientes(coctel) {
        let ingredientes = [];
        for (let i = 1; i <= 15; i++) {
            let ingrediente = coctel[`strIngredient${i}`];
            let medida = coctel[`strMeasure${i}`];
            if (ingrediente) {
                ingredientes.push(`${medida ? medida : ""} ${ingrediente}`);
            }
        }
        return ingredientes.join(", ");
    }

    // Cargar cóctel aleatorio
    function cargarCoctelAleatorio() {
        axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => {
                let detalle = response.data.drinks[0];
                mensaje.innerHTML = `
                    <strong>Nombre:</strong> ${detalle.strDrink} <br>
                    <strong>Alcohol:</strong> ${detalle.strAlcoholic} <br>
                    <strong>Categoría:</strong> ${detalle.strCategory} <br>
                    <strong>Ingredientes:</strong> ${obtenerIngredientes(detalle)} <br>
                    <strong>Instrucciones:</strong> ${detalle.strInstructions}
                `;
                poster.src = detalle.strDrinkThumb;
                poster.alt = `Imagen de ${detalle.strDrink}`;
                poster.style.display = "block";
            })
            .catch(error => console.error("Error al obtener cóctel aleatorio:", error));
    }

    // Limpiar resultados
    function limpiarResultados() {
        selectCategoria.selectedIndex = 0;
        selectCoctel.innerHTML = '<option selected>Selecciona un cóctel</option>';
        mensaje.textContent = "";
        poster.src = "/img/apipostercoctel.png";
        poster.style.display = "none";
    }

    // Eventos
    selectCategoria.addEventListener("change", cargarCocteles);
    selectCoctel.addEventListener("change", obtenerDetallesCoctel);
    btnCargar.addEventListener("click", cargarCoctelAleatorio);
    btnLimpiar.addEventListener("click", limpiarResultados);

    // Cargar categorías al iniciar
    cargarCategorias();
});
