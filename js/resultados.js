let partidoActual = matches.length - 1;

function mostrarPartidoActual() {
    mostrarPartido(matches[partidoActual]);
    document.getElementById("btn-prev").onclick = () => {
        if (partidoActual > 0) {
            partidoActual--;
            mostrarPartido(matches[partidoActual]);
        }
    };
    document.getElementById("btn-next").onclick = () => {
        if (partidoActual < matches.length - 1) {
            partidoActual++;
            mostrarPartido(matches[partidoActual]);
        }
    };
}

function mostrarUltimoPartido() {
    mostrarPartido(matches[matches.length - 1]);
}
