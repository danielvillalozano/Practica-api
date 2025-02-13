document.addEventListener("DOMContentLoaded", function () {
    const btnCargar = document.getElementById("btnCargar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const selectCategoria = document.getElementById("selectCategoria");
    const selectCoctel = document.getElementById("selectCoctel");
    const nombreCoctel = document.getElementById("nombreCoctel");
    const poster = document.getElementById("poster");
    const instrucciones = document.getElementById("instrucciones");
    const mensaje = document.getElementById("mensaje");

    btnCargar.addEventListener("click", cargarCategorias);
    selectCategoria.addEventListener("change", () => cargarCocteles(selectCategoria.value));
    btnBuscar.addEventListener("click", () => obtenerCocktail(selectCoctel.value));
    btnLimpiar.addEventListener("click", limpiar);

    async function cargarCategorias() {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error al obtener categorías");

            const data = await response.json();
            selectCategoria.innerHTML = '<option selected>Seleccionar categoría</option>';

            data.drinks.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria.strCategory;
                option.textContent = categoria.strCategory;
                selectCategoria.appendChild(option);
            });

            mensaje.innerHTML = "Categorías cargadas correctamente ✅";
        } catch (error) {
            mensaje.innerHTML = "Error al cargar categorías ❌";
        }
    }

    async function cargarCocteles(categoria) {
        if (!categoria || categoria === "Seleccionar categoría") return;
        
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoria)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error al obtener cócteles");

            const data = await response.json();
            selectCoctel.innerHTML = '<option selected>Seleccionar cóctel</option>';

            data.drinks.forEach(coctel => {
                const option = document.createElement("option");
                option.value = coctel.strDrink;
                option.textContent = coctel.strDrink;
                selectCoctel.appendChild(option);
            });

            mensaje.innerHTML = "Cócteles cargados correctamente ✅";
        } catch (error) {
            mensaje.innerHTML = "Error al cargar cócteles ❌";
        }
    }

    async function obtenerCocktail(nombre) {
        if (!nombre || nombre === "Seleccionar cóctel") return;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(nombre)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error en la respuesta de la API");

            const data = await response.json();

            if (data.drinks && data.drinks.length > 0) {
                const cocktail = data.drinks[0];
                nombreCoctel.textContent = cocktail.strDrink || "Sin nombre";
                poster.src = cocktail.strDrinkThumb || "/img/apipostercoctel.png";
                poster.alt = cocktail.strDrink || "Imagen no disponible";

                
                instrucciones.textContent = cocktail.strInstructionsES 
                    ? cocktail.strInstructionsES 
                    : cocktail.strInstructions 
                        ? cocktail.strInstructions 
                        : "No hay instrucciones disponibles.";

                mensaje.innerHTML = "Cóctel encontrado correctamente ✅";
            } else {
                mensaje.innerHTML = "No se encontró el cóctel ❌";
                limpiar();
            }
        } catch (error) {
            console.error("Error al obtener el cóctel:", error);
            mensaje.innerHTML = "Error al obtener el cóctel ❌. Inténtalo de nuevo.";
        }
    }

    function limpiar() {
        mensaje.innerHTML = "";
        selectCategoria.innerHTML = '<option selected>Seleccionar categoría</option>';
        selectCoctel.innerHTML = '<option selected>Seleccionar cóctel</option>';
        nombreCoctel.textContent = "";
        poster.src = "/img/apipostercoctel.png";
        poster.alt = "Cóctel";
        instrucciones.textContent = "";
    }
});
