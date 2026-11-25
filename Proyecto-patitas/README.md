# Patitas v0.1

Patitas es un motor sencillo para una clínica veterinaria, creado como práctica
de estructuras de datos propias en JavaScript con Node.js. No requiere
dependencias externas.

## Cómo ejecutarlo

Desde la carpeta del proyecto:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/registro.js
node src/reporte.js
```

Los tres primeros comandos muestran el nodo y ejecutan las pruebas. El último
imprime el historial, número de atenciones, costo total y última vacunación de
Lola, Toby y Mía.

## Estructuras y archivos

- `src/Nodo.js`: nodo con un dato y referencia al siguiente nodo.
- `src/ListaEnlazada.js`: lista con cabeza, cola y tamaño; incluye inserción,
  recorrido, búsqueda e inserción/eliminación por condición.
- `src/RegistroClinico.js`: `Map` que asocia el nombre de una mascota a su
  lista de atenciones.
- `src/reporte.js`: datos de ejemplo y generación de reportes.
- `pruebas/`: scripts de prueba ejecutables con Node.js.
- `bitacora.md`: diagramas, decisiones y análisis de complejidad de los retos.

Todos los módulos usan `require` y `module.exports`.
