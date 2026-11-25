Algoritmo ReporteCafeOrigen
	// Evidencia PSeInt del reporte v0.1. Se usan arreglos paralelos.
	// Ciudad: 1 Medellin, 2 Bogota, 3 Cali, 4 Pereira.
	// Producto: 1 Huila, 2 Narino, 3 Prensa, 4 Sierra, 5 Molino.
	Definir cantidad, precio, ciudad, producto, orden Como Entero
	Definir totalCiudad, unidadesProducto, valorProducto Como Real
	Definir nombreCiudad, nombreProducto Como Cadena
	Definir i, j, totalUnidades, maximo, indiceMayor, validas, temporal Como Entero
	Definir total, sumaTickets, ticket Como Real
	Dimension cantidad[12], precio[12], ciudad[12], producto[12], orden[5]
	Dimension totalCiudad[4], unidadesProducto[5], valorProducto[5]
	Dimension nombreCiudad[4], nombreProducto[5]

	nombreCiudad[1] <- "Medellin"
	nombreCiudad[2] <- "Bogota"
	nombreCiudad[3] <- "Cali"
	nombreCiudad[4] <- "Pereira"
	nombreProducto[1] <- "Origen Huila 500 g"
	nombreProducto[2] <- "Origen Narino 250 g"
	nombreProducto[3] <- "Prensa francesa"
	nombreProducto[4] <- "Origen Sierra 500 g"
	nombreProducto[5] <- "Molino manual"

	// Datos paralelos: la posición i corresponde a una venta.
	cantidad[1] <- 2; precio[1] <- 42000; ciudad[1] <- 1; producto[1] <- 1
	cantidad[2] <- 1; precio[2] <- 26000; ciudad[2] <- 2; producto[2] <- 2
	cantidad[3] <- 1; precio[3] <- 95000; ciudad[3] <- 3; producto[3] <- 3
	cantidad[4] <- 1; precio[4] <- 42000; ciudad[4] <- 1; producto[4] <- 1
	cantidad[5] <- 3; precio[5] <- 45000; ciudad[5] <- 1; producto[5] <- 4
	cantidad[6] <- 2; precio[6] <- 26000; ciudad[6] <- 2; producto[6] <- 2
	cantidad[7] <- 1; precio[7] <- 120000; ciudad[7] <- 2; producto[7] <- 5
	cantidad[8] <- 0; precio[8] <- 42000; ciudad[8] <- 3; producto[8] <- 1
	cantidad[9] <- 2; precio[9] <- 45000; ciudad[9] <- 3; producto[9] <- 4
	cantidad[10] <- 4; precio[10] <- 42000; ciudad[10] <- 4; producto[10] <- 1
	cantidad[11] <- 1; precio[11] <- 95000; ciudad[11] <- 1; producto[11] <- 3
	cantidad[12] <- 3; precio[12] <- 26000; ciudad[12] <- 2; producto[12] <- 2

	Para i <- 1 Hasta 4 Hacer
		totalCiudad[i] <- 0
	FinPara
	Para i <- 1 Hasta 5 Hacer
		unidadesProducto[i] <- 0
		valorProducto[i] <- 0
		orden[i] <- i
	FinPara
	total <- 0
	totalUnidades <- 0
	sumaTickets <- 0
	validas <- 0
	maximo <- -1
	indiceMayor <- 0

	Para i <- 1 Hasta 12 Hacer
		valorProducto[producto[i]] <- valorProducto[producto[i]] + cantidad[i] * precio[i]
		totalCiudad[ciudad[i]] <- totalCiudad[ciudad[i]] + cantidad[i] * precio[i]
		unidadesProducto[producto[i]] <- unidadesProducto[producto[i]] + cantidad[i]
		total <- total + cantidad[i] * precio[i]
		totalUnidades <- totalUnidades + cantidad[i]
		Si cantidad[i] > 0 Entonces
			sumaTickets <- sumaTickets + cantidad[i] * precio[i]
			validas <- validas + 1
		FinSi
		Si cantidad[i] * precio[i] > maximo Entonces
			maximo <- cantidad[i] * precio[i]
			indiceMayor <- i
		FinSi
	FinPara

	Escribir "CAFE ORIGEN | REPORTE DE VENTAS v0.1"
	Escribir "Total vendido: $", total
	Escribir "Unidades vendidas: ", totalUnidades
	Si validas > 0 Entonces
		ticket <- sumaTickets / validas
		Escribir "Ticket promedio: $", ticket
	SiNo
		Escribir "Ticket promedio: $0 (sin ventas validas)"
	FinSi
	Escribir "Venta mayor (registro ", indiceMayor, "): $", maximo

	Escribir "TOTALES POR CIUDAD"
	Para i <- 1 Hasta 4 Hacer
		Escribir nombreCiudad[i], ": $", totalCiudad[i]
	FinPara

	// Ordenamiento por selección para mostrar productos por valor descendente.
	Escribir "RANKING DE PRODUCTOS POR VALOR"
	Para i <- 1 Hasta 5 Hacer
		Para j <- i + 1 Hasta 5 Hacer
			Si valorProducto[orden[j]] > valorProducto[orden[i]] Entonces
				temporal <- orden[i]
				orden[i] <- orden[j]
				orden[j] <- temporal
			FinSi
		FinPara
	FinPara
	Para i <- 1 Hasta 5 Hacer
		Escribir i, ". ", nombreProducto[orden[i]], " | $", valorProducto[orden[i]], " | unidades: ", unidadesProducto[orden[i]]
	FinPara
FinAlgoritmo
