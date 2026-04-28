const formulario = document.querySelector(".formulario");
const lista = document.querySelector(".lista-gastos");
const totalSpan = document.querySelector(".total");
const btnLimpiar = document.querySelector(".limpiar");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.querySelector(".nombre").value;
    const monto = Number(document.querySelector(".monto").value);

    if (nombre.trim() === "" || isNaN(monto) || monto <= 0) {
        alert("Todos los campos son obligatorios y el monto debe ser mayor a 0");
        return;
    }

    const gasto = {
        id: Date.now(),
        nombre,
        monto
    };

    gastos.push(gasto); 
    guardarStorage();
    mostrarGastos();
    formulario.reset();
});

btnLimpiar.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que querés eliminar todos los gastos?");
    if (confirmar) {
        gastos = [];
        guardarStorage();
        mostrarGastos();
    }
});

function mostrarGastos() {
    lista.innerHTML = "";

    if (gastos.length === 0) {
        lista.innerHTML = "<p>No hay gastos aún</p>";
        totalSpan.textContent = 0;
        return;
    }

    gastos.forEach(gasto => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${gasto.nombre} - $${gasto.monto}
            <button onclick="eliminarGasto(${gasto.id})">X</button>
        `;

        lista.appendChild(li); 
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