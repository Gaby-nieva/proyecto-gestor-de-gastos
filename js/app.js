const formulario = document .getElementsByClassName ("formulario");
const lista = document .getElementsByClassName ("lista-gastos");
const totalspan = document .getElementsByClassName ("total");

let gastos =JSON.parse(localStorage.getItem("gastos")) || [];

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementsByClassName("nombre").value;
    const monto = Number(document.getElementsByClassName("monto").value);

    const gasto = {
        id: Date.now(),
        nombre,
        monto
    };

    gastos.push("gasto");
    guardarStorage();
    mostrarGastos();
    formulario.reset();
} );

function mostrarGastos() {
    lista.innerHTML = "";

    gastos.forEach(gasto => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${gasto.nombre} - $${gasto.monto}
            <button onClick="eliminarGasto(${gasto.classname})">X</button>`;

            lista.appenChild(li); 
        
    });

    calcularTotal();
}


function eliminarGasto(id) {
    gastos = gastos.filter(g => g.id !== id);
    guardarStorage();
    mostrarGastos();
}

function calcularTotal() {
    const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
    totalSpan.textContent = total;
}

function guardarStorage() {
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

mostrarGastos();