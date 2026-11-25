const RegistroClinico = require("./RegistroClinico");

function cargarDatos() {
    const registro = new RegistroClinico();

    registro.registrarAtencion("Lola", {
        fecha: "02/02",
        motivo: "Vacunación anual",
        veterinario: "Dra. Ríos",
        costo: 85000
    });
    registro.registrarAtencion("Lola", {
        fecha: "15/03",
        motivo: "Control de peso",
        veterinario: "Dr. Gómez",
        costo: 40000
    });
    registro.registrarAtencion("Lola", {
        fecha: "20/05",
        motivo: "Limpieza dental",
        veterinario: "Dra. Ríos",
        costo: 150000
    });

    registro.registrarAtencion("Toby", {
        fecha: "10/01",
        motivo: "Consulta por cojera",
        veterinario: "Dr. Gómez",
        costo: 60000
    });
    registro.registrarAtencion("Toby", {
        fecha: "12/01",
        motivo: "Radiografía de pata",
        veterinario: "Dr. Gómez",
        costo: 120000
    });
    registro.registrarAtencion("Toby", {
        fecha: "05/04",
        motivo: "Vacunación anual",
        veterinario: "Dra. Ríos",
        costo: 85000
    });

    registro.registrarAtencion("Mía", {
        fecha: "18/02",
        motivo: "Esterilización",
        veterinario: "Dra. Ríos",
        costo: 280000
    });
    registro.registrarAtencion("Mía", {
        fecha: "25/02",
        motivo: "Control posquirúrgico",
        veterinario: "Dra. Ríos",
        costo: 0
    });

    return registro;
}

function formatearCosto(costo) {
    return `$${costo.toLocaleString("es-CO")}`;
}

function buscarUltimaVacunacion(historial) {
    const esVacunacion = (atencion) =>
        atencion.motivo.toLocaleLowerCase("es").includes("vacunación");
    let vacunacion = historial.buscar(esVacunacion);

    if (vacunacion !== null) {
        historial.recorrer((atencion) => {
            if (esVacunacion(atencion)) {
                vacunacion = atencion;
            }
        });
    }

    return vacunacion;
}

function generarReporte(registro, salida = console.log) {
    for (const [mascota, historial] of registro.historiales) {
        salida(`\nHistorial de ${mascota}:`);
        let numeroAtenciones = 0;
        let costoTotal = 0;

        historial.recorrer((atencion) => {
            numeroAtenciones++;
            costoTotal += atencion.costo;
            salida(
                `- ${atencion.fecha}: ${atencion.motivo} | ` +
                `${atencion.veterinario} | ${formatearCosto(atencion.costo)}`
            );
        });

        const vacunacion = buscarUltimaVacunacion(historial);

        salida(`Número de atenciones: ${numeroAtenciones}`);
        salida(`Costo total: ${formatearCosto(costoTotal)}`);
        salida(
            `Última vacunación: ${
                vacunacion ? `${vacunacion.fecha} - ${vacunacion.motivo}` : "sin registro"
            }`
        );
    }
}

if (require.main === module) {
    generarReporte(cargarDatos());
}

module.exports = { cargarDatos, generarReporte };
