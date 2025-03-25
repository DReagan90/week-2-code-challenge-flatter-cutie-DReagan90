 const BASE_URL = 'https://localhost:3000/characters';
  
 function fetchCharacters() {
  fetch(`${BASE_URL}`)
      .then(response => response.json()) 
      .then(characters => {
        const characterBar = document.getElementById('character-bar');
        characters.forEach(character => {
          const span = document.createElement('span');
          span.textContent = character.name;
          span.addEventListener('click', () => displayCharacterDetails(character));
          characterBar.appendChild(span);
      });
  });
}
function displayCharacterDetails(character) {
  const detailedInfo = document.getElementById('detailed-info');
  detailedInfo.innerHTML = `
 <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Votes: <span id="vote-count">${character.votes}</span></p>';
        <button id="vote-button">Vote</button>
    `;
  const voteButton = document.getElementById('vote-button');
  voteButton.addEventListener('click', () => voteForCharacter(character));
  votesForm.onsubmit = (event) => {
    event.preventDefault();
    const votesInput = document.getElementById('votes').value;
    const voteCount = document.getElementById('vote-count');
    const newVotes = parseInt(voteCount.textContent) + parseInt(votesInput);
    voteCount.textContent = newVotes;
    votesForm.reset();
};
}
