document.getElementById("btnBuscar").addEventListener("click", buscarPais);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);

async function buscarPais() {
    const nombrePais = document.getElementById("inputPais").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!nombrePais) {
        mensaje.textContent = "Por favor, ingresa un nombre de país.";
        return;
    }

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}?fullText=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se encontró el país.");

        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No se encontró información.");

        const pais = data[0]; // Primer resultado de la API

        document.getElementById("nombreComun").textContent = `Nombre común: ${pais.name?.common || "No disponible"}`;
        document.getElementById("nombreOficial").textContent = `Nombre oficial: ${pais.name?.official || "No disponible"}`;
        document.getElementById("capital").textContent = pais.capital?.[0] || "No disponible";
        document.getElementById("poblacion").textContent = pais.population ? pais.population.toLocaleString() + " habitantes" : "No disponible";

        // Cargar la bandera del país
        const bandera = pais.flags?.svg || pais.flags?.png || "/img/apipais.png";
        document.getElementById("bandera").src = bandera;
        document.getElementById("bandera").alt = `Bandera de ${pais.name?.common || "Desconocido"}`;

        mensaje.textContent = ""; // Limpiar mensaje de error si hay éxito
    } catch (error) {
        mensaje.textContent = "No se encontró el país. Intenta nuevamente.";
        limpiar();
    }
}

function limpiar() {
    document.getElementById("inputPais").value = "";
    document.getElementById("nombreComun").textContent = "";
    document.getElementById("nombreOficial").textContent = "";
    document.getElementById("capital").textContent = "";
    document.getElementById("poblacion").textContent = "";
    document.getElementById("bandera").src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    document.getElementById("bandera").alt = "Bandera";
    document.getElementById("mensaje").textContent = "";
}
