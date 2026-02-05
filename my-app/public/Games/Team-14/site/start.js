function startGame(mode) {
    if (mode === 'quizlet') {
        console.log("Starter Quizlet modus...");
        window.location.href = 'index.html';
    } else if (mode === 'life') {
        console.log("Starter Naturens Liv modus...");
        window.location.href = 'life.html';
    } else {
        alert("Denne modusen er ikke tilgjengelig enda!");
    }
}
