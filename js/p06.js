document.addEventListener("DOMContentLoaded", function () {
    const btnCargar = document.getElementById("btnCargar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const nombreCoctel = document.getElementById("nombreCoctel");
    const poster = document.getElementById("poster");
    const instrucciones = document.getElementById("instrucciones");
    const mensaje = document.getElementById("mensaje");

    btnCargar.addEventListener("click", obtenerCocktail);
    btnLimpiar.addEventListener("click", limpiar);

    async function obtenerCocktail() {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.drinks && data.drinks.length > 0) {
                const cocktail = data.drinks[0];
                nombreCoctel.textContent = cocktail.strDrink;
                poster.src = cocktail.strDrinkThumb;
                poster.alt = cocktail.strDrink;
                instrucciones.textContent = cocktail.strInstructions;
                mensaje.innerHTML = "Cóctel cargado correctamente ✅";
            } else {
                mensaje.innerHTML = "No se encontró un cóctel";
            }
        } catch (error) {
            mensaje.innerHTML = "Error al obtener el cóctel: " + error.message;
        }
    }

    function limpiar() {
        mensaje.innerHTML = "";
        nombreCoctel.textContent = "";
        poster.src = "/img/apipostercoctel.png"; // Imagen por defecto
        poster.alt = "Cóctel";
        instrucciones.textContent = "";
    }
});
