function mostrarPartido(partido) {
    const container = document.getElementById("match-container");
    if (!container) return;

    let golesNegro = partido.equipoNegro.reduce((acc, p) => acc + p.goles, 0);
    let golesRojo = partido.equipoRojo.reduce((acc, p) => acc + p.goles, 0);

    // Genera una lista vertical de jugadores para cada equipo
    const jugadoresNegro = partido.equipoNegro.map(j => `<li>${j.nombre} (${j.goles})</li>`).join("");
    const jugadoresRojo = partido.equipoRojo.map(j => `<li>${j.nombre} (${j.goles})</li>`).join("");

    container.innerHTML = `
        <div class="partido-card">
            <div class="header-card">
                <h3>Jornada ${partido.jornada} - ${partido.fecha} - Árbitro:${partido.arbitro}</h3>
            </div>
            <div class="score-card">
                <div class="equipo">
                    <div class="goles">${golesNegro}</div>
                </div>
                <span>-</span>
                <div class="equipo">
                    <div class="goles">${golesRojo}</div>
                </div>
            </div>
            <div class="jugadores-card">
                <div class="lista-jugadores equipo-negro">
                    <h4>Equipo Negro</h4>
                    <ul>${jugadoresNegro}</ul>
                </div>
                <div class="lista-jugadores equipo-rojo">
                    <h4>Equipo Rojo</h4>
                    <ul>${jugadoresRojo}</ul>
                </div>
            </div>
            <div class="info-adicional">
                <p><strong>Tarjetas amarillas:</strong></p>
                <p><strong>Retrasos:</strong></p>
            </div>
        </div>
    `;
}
