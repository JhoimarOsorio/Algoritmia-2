const Nodo = require("../src/Nodo");

const primerNodo = new Nodo({
    fecha: "02/02",
    motivo: "Vacunación",
    veterinario: "Dra. Ríos",
    costo: 85000
});
const segundoNodo = new Nodo({
    fecha: "15/03",
    motivo: "Control de peso",
    veterinario: "Dr. Gómez",
    costo: 40000
});
const tercerNodo = new Nodo({
    fecha: "20/05",
    motivo: "Limpieza dental",
    veterinario: "Dra. Ríos",
    costo: 150000
});

primerNodo.siguiente = segundoNodo;
segundoNodo.siguiente = tercerNodo;
const cabeza = primerNodo;

console.log("Historial de Lola (gata):");
let actual = cabeza;
let costoTotal = 0;

while (actual !== null) {
    const atencion = actual.dato;
    console.log(
        `${atencion.fecha}: ${atencion.motivo}, ${atencion.veterinario}, ` +
        `$${atencion.costo.toLocaleString("es-CO")}`
    );
    costoTotal += atencion.costo;
    actual = actual.siguiente;
}

console.log(`Costo total: $${costoTotal.toLocaleString("es-CO")}`);
