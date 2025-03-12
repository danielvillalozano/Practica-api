document.getElementById("btnCalcular").addEventListener("click", calcularPago);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);

function calcularPago() {
    const puesto = document.getElementById("puesto").value;
    const nivel = document.getElementById("nivel").value;
    const dias = parseInt(document.getElementById("dias").value);
    const resultado = document.getElementById("resultado");

    
    if (isNaN(dias) || dias <= 0) {
        alert("Por favor, ingresa un número válido de días trabajados.");
        return;
    }

    
    let salarioBase = 0;
    if (puesto === "1") salarioBase = 300; 
    else if (puesto === "2") salarioBase = 500; 
    else if (puesto === "3") salarioBase = 1000; 

    
    if (nivel === "2") salarioBase *= 1.2; 

   
    const pago = salarioBase * dias;
    const impuesto = pago * 0.15; 
    const total = pago - impuesto;

    
    document.getElementById("pago").textContent = pago.toFixed(2);
    document.getElementById("impuesto").textContent = impuesto.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

function limpiar() {
    document.getElementById("puesto").value = "1";
    document.getElementById("nivel").value = "1";
    document.getElementById("dias").value = "";
    document.getElementById("pago").textContent = "";
    document.getElementById("impuesto").textContent = "";
    document.getElementById("total").textContent = "";
}
