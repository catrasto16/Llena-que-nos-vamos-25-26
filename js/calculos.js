// Calcular goleadores
function calcularGoleadores() {
    const goles = {};

    matches.forEach(partido => {
        [...partido.equipoNegro, ...partido.equipoRojo].forEach(j => {
            if (!goles[j.nombre]) goles[j.nombre] = 0;
            goles[j.nombre] += j.goles;
        });
    });

    const tabla = Object.entries(goles)
        .sort((Negro, Rojo) => Rojo[1] - Negro[1])
        .map((g, i) => `<tr><td>${i + 1}</td><td>${g[0]}</td><td>${g[1]}</td></tr>`)
        .join("");

    document.getElementById("goleadores-table").innerHTML = tabla;
}

// Ejecutar según la página
if (document.getElementById("clasificacion-table")) {
    calcularClasificacion();
}
if (document.getElementById("goleadores-table")) {
    calcularGoleadores();
}

// Función para calcular y mostrar la clasificación
function calcularClasificacion() {
    const stats = {};

    // Inicializa las estadísticas para cada jugador
    players.forEach(p => {
        stats[p.nombre] = {
            puntos: 0,
            ganados: 0,
            empatados: 0,
            perdidos: 0,
            tarjetas_amarillas: 0,
        };
    });

    // Recorre todos los partidos para acumular estadísticas
    matches.forEach(partido => {
        const golesNegro = partido.equipoNegro.reduce((acc, p) => acc + p.goles, 0);
        const golesRojo = partido.equipoRojo.reduce((acc, p) => acc + p.goles, 0);

        // Acumula tarjetas y goles para cada jugador del equipo negro
        partido.equipoNegro.forEach(jugador => {
            stats[jugador.nombre].tarjetas_amarillas += jugador.amarillas || 0;
        });

        // Acumula tarjetas y goles para cada jugador del equipo rojo
        partido.equipoRojo.forEach(jugador => {
            stats[jugador.nombre].tarjetas_amarillas += jugador.amarillas || 0;
        });

        // Actualiza puntos y partidos ganados/empatados/perdidos
        if (golesNegro > golesRojo) {
            partido.equipoNegro.forEach(j => {
                stats[j.nombre].puntos += 3;
                stats[j.nombre].ganados += 1;
            });
            partido.equipoRojo.forEach(j => {
                stats[j.nombre].perdidos += 1;
            });
        } else if (golesRojo > golesNegro) {
            partido.equipoRojo.forEach(j => {
                stats[j.nombre].puntos += 3;
                stats[j.nombre].ganados += 1;
            });
            partido.equipoNegro.forEach(j => {
                stats[j.nombre].perdidos += 1;
            });
        } else {
            partido.equipoNegro.forEach(j => {
                stats[j.nombre].puntos += 1;
                stats[j.nombre].empatados += 1;
            });
            partido.equipoRojo.forEach(j => {
                stats[j.nombre].puntos += 1;
                stats[j.nombre].empatados += 1;
            });
        }
    });

    // Ordena los jugadores por puntos de mayor a menor y genera el HTML
    const clasificacionOrdenada = Object.entries(stats)
        .sort(([, a], [, b]) => b.puntos - a.puntos)
        .map(([nombre, estadisticas], i) => `
            <tr>
                <td> data-label="Posición"><span class="pos-badge">${i + 1}</span></td>
                <td  data-label="Jugador" class="text-left">${nombre}</td>
                <td> data-label="Puntos">${estadisticas.puntos}</td>
                <td> data-label="Ganados">${estadisticas.ganados}</td>
                <td> data-label="Empatados">${estadisticas.empatados}</td>
                <td> data-label="Perdidos">${estadisticas.perdidos}</td>
                <td> data-label="Amarillas">${estadisticas.tarjetas_amarillas}</td>
            </tr>
        `).join("");

    document.getElementById("clasificacion-table").innerHTML = clasificacionOrdenada;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("clasificacion-table")) {
        calcularClasificacion();
    }
});
