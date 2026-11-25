const assert = require("node:assert/strict");
const RegistroClinico = require("../src/RegistroClinico");
const { cargarDatos, generarReporte } = require("../src/reporte");

const registro = cargarDatos();
const totalesEsperados = new Map([
    ["Lola", { tamanio: 3, total: 275000, vacunacion: "Vacunación anual" }],
    ["Toby", { tamanio: 3, total: 265000, vacunacion: "Vacunación anual" }],
    ["Mía", { tamanio: 2, total: 280000, vacunacion: null }]
]);

for (const [mascota, esperado] of totalesEsperados) {
    const historial = registro.historiales.get(mascota);
    assert.ok(historial);
    assert.equal(historial.obtenerTamanio(), esperado.tamanio);

    let total = 0;
    historial.recorrer((atencion) => {
        total += atencion.costo;
    });
    assert.equal(total, esperado.total);

    const vacunacion = historial.buscar((atencion) =>
        atencion.motivo.toLocaleLowerCase("es").includes("vacunación")
    );
    assert.equal(vacunacion ? vacunacion.motivo : null, esperado.vacunacion);
}

const lineas = [];
generarReporte(registro, (linea) => lineas.push(linea));
assert.ok(lineas.some((linea) => linea.includes("Costo total: $275.000")));
assert.ok(lineas.some((linea) => linea.includes("Costo total: $265.000")));
assert.ok(lineas.some((linea) => linea.includes("Costo total: $280.000")));
assert.ok(lineas.some((linea) => linea.includes("Última vacunación: sin registro")));

const registroConVariasVacunas = new RegistroClinico();
registroConVariasVacunas.registrarAtencion("Kira", {
    fecha: "01/01",
    motivo: "Vacunación inicial",
    veterinario: "Dra. Ríos",
    costo: 50000
});
registroConVariasVacunas.registrarAtencion("Kira", {
    fecha: "03/03",
    motivo: "Vacunación de refuerzo",
    veterinario: "Dra. Ríos",
    costo: 50000
});
const reporteKira = [];
generarReporte(registroConVariasVacunas, (linea) => reporteKira.push(linea));
assert.ok(
    reporteKira.some((linea) =>
        linea.includes("Última vacunación: 03/03 - Vacunación de refuerzo")
    )
);

console.log("Pruebas del registro clínico: todas pasaron.");
