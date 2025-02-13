document.addEventListener("DOMContentLoaded", function () {
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const inputCoctel = document.getElementById("inputCoctel");
    const nombreCoctel = document.getElementById("nombreCoctel");
    const poster = document.getElementById("poster");
    const instrucciones = document.getElementById("instrucciones");
    const mensaje = document.getElementById("mensaje");

    btnBuscar.addEventListener("click", () => {
        const nombre = inputCoctel.value.trim();
        if (nombre) {
            obtenerCocktail(nombre);
        } else {
            mensaje.innerHTML = "Por favor, escribe el nombre de un cóctel ❌";
        }
    });

    btnLimpiar.addEventListener("click", limpiar);

    async function obtenerCocktail(nombre) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(nombre)}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }

            const data = await response.json();

            if (data.drinks && data.drinks.length > 0) {
                const cocktail = data.drinks[0]; // Toma el primer resultado
                nombreCoctel.textContent = cocktail.strDrink || "Sin nombre";
                poster.src = cocktail.strDrinkThumb || "/img/apipostercoctel.png";
                poster.alt = cocktail.strDrink || "Imagen no disponible";
                instrucciones.textContent = cocktail.strInstructions || "No hay instrucciones disponibles.";
                mensaje.innerHTML = "Cóctel encontrado correctamente ✅";
            } else {
                mensaje.innerHTML = "No se encontró el cóctel ❌";
                limpiar(); // Limpia la imagen y el texto si no se encuentra nada
            }
        } catch (error) {
            console.error("Error al obtener el cóctel:", error);
            mensaje.innerHTML = "Error al obtener el cóctel ❌. Inténtalo de nuevo.";
        }
    }

    function limpiar() {
        mensaje.innerHTML = "";
        inputCoctel.value = "";
        nombreCoctel.textContent = "";
        poster.src = "/img/apipostercoctel.png"; // Imagen por defecto
        poster.alt = "Cóctel";
        instrucciones.textContent = "";
    }
})
