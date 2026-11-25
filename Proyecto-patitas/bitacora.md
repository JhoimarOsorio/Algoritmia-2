# Bitácora de Patitas v0.1

## MiniReto 1 - El nodo

Cada nodo contiene una atención y una referencia al siguiente. `cabeza` permite
encontrar el primer nodo; `null` marca el final de la cadena.

```text
cabeza
  |
  v
[02/02 Vacunación | $85.000] -> [15/03 Control de peso | $40.000] -> [20/05 Limpieza dental | $150.000] -> null
```

En `pruebas/nodos.js` los tres nodos se crean y enlazan manualmente. El recorrido
parte de `cabeza` y avanza con `while (actual !== null)`, sin índices ni arreglos.
La suma de los costos es **$275.000**.

Si se pierde un enlace asignando `primerNodo.siguiente = null`, la cabeza sigue
apuntando al primer nodo, pero el recorrido termina inmediatamente después de
la primera atención. Los nodos siguientes quedan desconectados de esa cadena y
ya no pueden alcanzarse desde `cabeza`.

## MiniReto 2 - ListaEnlazada

### Dibujos previos

Lista vacía:

```text
cabeza -> null
cola   -> null
```

Agregar al final:

```text
Antes:  cabeza -> [A] -> [B] -> null <- cola
Después: cabeza -> [A] -> [B] -> [C] -> null <- cola
```

Agregar al inicio:

```text
Antes:  cabeza -> [B] -> [C] -> null <- cola
Después: cabeza -> [A] -> [B] -> [C] -> null <- cola
```

### Complejidades

| Método | Complejidad | Motivo |
|---|---:|---|
| `agregarAlFinal(dato)` | O(1) | Enlaza usando directamente `cola`. |
| `agregarAlInicio(dato)` | O(1) | Enlaza usando directamente `cabeza`. |
| `recorrer(callback)` | O(n) | Visita cada nodo una vez. |
| `aArreglo()` | O(n) | Recorre todos los nodos y copia los datos. |
| `estaVacia()` | O(1) | Comprueba `cabeza`. |
| `obtenerTamanio()` | O(1) | Devuelve el contador mantenido por la lista. |

Las pruebas validan cabeza, cola, tamaño y que la cola termine en `null` para
agregados al inicio y al final en listas vacías, de un nodo y de varios nodos.

## MiniReto 3 - Buscar, insertar en medio y eliminar

### Eliminar la cabeza

```text
Antes:   cabeza -> [A] -> [B] -> [C] -> null
Después: cabeza --------> [B] -> [C] -> null
```

### Eliminar un nodo intermedio

```text
Antes:   cabeza -> [A] -> [B] -> [C] -> null
Después: cabeza -> [A] --------> [C] -> null
```

### Eliminar la cola

```text
Antes:   cabeza -> [A] -> [B] -> [C] -> null <- cola
Después: cabeza -> [A] -> [B] -> null <- cola
```

| Método | Complejidad | Motivo |
|---|---:|---|
| `buscar(condicion)` | O(n) | En el peor caso revisa toda la lista. |
| `insertarDespuesDe(condicion, dato)` | O(n) | Busca el nodo; enlazarlo luego es O(1). |
| `eliminar(condicion)` | O(n) | Puede necesitar recorrer hasta el último nodo. |

`eliminar` mantiene dos referencias: `actual`, que examina, y `anterior`, que
permite saltar el nodo encontrado. Si elimina la cabeza, mueve `cabeza`; si
elimina otro nodo, conecta `anterior.siguiente` con el siguiente de `actual`.
Cuando el nodo eliminado era la cola, asigna la cola a `anterior`.

Eliminar la cola de una lista simplemente enlazada requiere recorrerla porque
cada nodo solo conoce al siguiente: no hay una referencia desde la cola hacia
su nodo anterior. La lista sí guarda la cola para agregar al final en O(1), pero
eso no basta para encontrar el nuevo último nodo al eliminarla.

Las pruebas cubren lista vacía, único nodo, cabeza, nodo intermedio, cola, dato
inexistente e inserción después de la cola.

## MiniReto 4 - Historiales completos

`RegistroClinico` almacena un `Map` que relaciona cada nombre de mascota con su
`ListaEnlazada` de atenciones. El reporte recorre cada historial en su orden de
registro (los datos de ejemplo se registran cronológicamente), calcula número y
costo total, y usa `buscar` para localizar una vacunación o informar
**«sin registro»**.

### Lista enlazada vs. arreglo

| Operación | Lista enlazada | Arreglo |
|---|---:|---:|
| Agregar al final | O(1) con referencia a cola | O(1) amortizado |
| Agregar al inicio | O(1) | O(n), desplaza los elementos |
| Acceder a la atención k | O(n) | O(1) |
| Buscar por condición | O(n) | O(n) |
| Eliminar la primera | O(1) | O(n), desplaza los elementos |

Las complejidades del arreglo consideran un arreglo dinámico convencional.
