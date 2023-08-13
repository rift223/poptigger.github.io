const popcat = document.getElementById('popcat');
let isJumping = false;

popcat.addEventListener('click', () => {
    if (!isJumping) {
        isJumping = true;
        popcat.classList.add('clicked');
        setTimeout(() => {
            popcat.classList.remove('clicked');
            isJumping = false;
        }, 400);
        increasePopCount();
    }
});

function increasePopCount() {
    let popCount = parseInt(localStorage.getItem('popCount')) || 0;
    popCount++;
    localStorage.setItem('popCount', popCount);
    updateGlobalScores();
}

function updateGlobalScores() {
    const savedPopCount = parseInt(localStorage.getItem('popCount')) || 0;
    const globalScoresElement = document.getElementById('global-scores');
    globalScoresElement.textContent = `Global Pop Count: ${savedPopCount}`;
    
    // Retrieve and display high scores
    const highScores = getHighScores();
    const highScoresList = document.createElement('ol');
    highScoresList.classList.add('high-scores-list');
    
    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${score}`;
        highScoresList.appendChild(listItem);
    });
    
    globalScoresElement.appendChild(highScoresList);
}

function getHighScores() {
    const savedPopCount = parseInt(localStorage.getItem('popCount')) || 0;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(savedPopCount);
    highScores.sort((a, b) => b - a); // Sort in descending order
    highScores = highScores.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
    return highScores;
}

updateGlobalScores();
