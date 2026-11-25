const assert = require("node:assert/strict");
const ListaEnlazada = require("../src/ListaEnlazada");

function verificarEstado(lista, cabeza, cola, tamanio) {
    assert.equal(lista.cabeza && lista.cabeza.dato, cabeza);
    assert.equal(lista.cola && lista.cola.dato, cola);
    assert.equal(lista.obtenerTamanio(), tamanio);
    assert.equal(lista.estaVacia(), tamanio === 0);
    assert.equal(lista.cola ? lista.cola.siguiente : null, null);
}

function crearLista(...datos) {
    const lista = new ListaEnlazada();
    for (const dato of datos) {
        lista.agregarAlFinal(dato);
    }
    return lista;
}

function probarInsercionesBasicas() {
    let lista = new ListaEnlazada();
    lista.agregarAlFinal("A");
    verificarEstado(lista, "A", "A", 1);

    lista = crearLista("A");
    lista.agregarAlFinal("B");
    verificarEstado(lista, "A", "B", 2);

    lista = crearLista("A", "B");
    lista.agregarAlFinal("C");
    verificarEstado(lista, "A", "C", 3);

    lista = new ListaEnlazada();
    lista.agregarAlInicio("A");
    verificarEstado(lista, "A", "A", 1);

    lista = crearLista("B");
    lista.agregarAlInicio("A");
    verificarEstado(lista, "A", "B", 2);

    lista = crearLista("B", "C");
    lista.agregarAlInicio("A");
    verificarEstado(lista, "A", "C", 3);
}

function probarBuscarEInsertar() {
    const lista = crearLista(10, 20, 30);
    assert.equal(lista.buscar((dato) => dato === 20), 20);
    assert.equal(lista.buscar((dato) => dato === 99), null);
    assert.equal(lista.insertarDespuesDe((dato) => dato === 30, 40), true);
    assert.deepEqual(lista.aArreglo(), [10, 20, 30, 40]);
    verificarEstado(lista, 10, 40, 4);
    assert.equal(lista.insertarDespuesDe((dato) => dato === 99, 50), false);
    verificarEstado(lista, 10, 40, 4);
}

function probarEliminar() {
    let lista = new ListaEnlazada();
    assert.equal(lista.eliminar(() => true), null);
    verificarEstado(lista, null, null, 0);

    lista = crearLista("único");
    assert.equal(lista.eliminar((dato) => dato === "único"), "único");
    verificarEstado(lista, null, null, 0);

    lista = crearLista("A", "B", "C");
    assert.equal(lista.eliminar((dato) => dato === "A"), "A");
    verificarEstado(lista, "B", "C", 2);

    lista = crearLista("A", "B", "C");
    assert.equal(lista.eliminar((dato) => dato === "C"), "C");
    verificarEstado(lista, "A", "B", 2);

    lista = crearLista("A", "B", "C");
    const antes = lista.aArreglo();
    assert.equal(lista.eliminar((dato) => dato === "no existe"), null);
    assert.deepEqual(lista.aArreglo(), antes);
    verificarEstado(lista, "A", "C", 3);

    lista = crearLista("A", "B", "C");
    assert.equal(lista.eliminar((dato) => dato === "B"), "B");
    assert.deepEqual(lista.aArreglo(), ["A", "C"]);
    verificarEstado(lista, "A", "C", 2);
}

probarInsercionesBasicas();
probarBuscarEInsertar();
probarEliminar();
console.log("Pruebas de ListaEnlazada: todas pasaron.");
