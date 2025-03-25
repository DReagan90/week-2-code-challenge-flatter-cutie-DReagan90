const BASE_URL = 'http://localhost:3000/characters';

function fetchCharacters() {
  fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then(characters => {
      const characterBar = document.getElementById('character-bar');
      characterBar.innerHTML = '';

      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.addEventListener('click', () => displayCharacterDetails(character));
        characterBar.appendChild(span);
      });

      
      if (characters.length > 0) {
        displayCharacterDetails(characters[0]);
      }
    });
}

function displayCharacterDetails(character) {
  const detailedInfo = document.getElementById('detailed-info');
  detailedInfo.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <p>Votes: <span id="vote-count">${character.votes}</span></p>
    <button id="vote-button">Vote</button>
    <button id="reset-button">Reset Votes</button>
    <form id="votes-form">
      <input type="number" id="votes" name="votes" placeholder="Enter votes" required>
      <button type="submit">Add Votes</button>
    </form>
   
  `;

  const voteButton = document.getElementById('vote-button');
  voteButton.addEventListener('click', () => {
    const voteCount = document.getElementById('vote-count');
    const newVotes = parseInt(voteCount.textContent) + 1;
    voteCount.textContent = newVotes;

    fetch(`${BASE_URL}/${character.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votes: newVotes })
    });
  });

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', () => {
    const voteCount = document.getElementById('vote-count');
    voteCount.textContent = 0;

    fetch(`${BASE_URL}/${character.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votes: 0 })
    });
  });

  const votesForm = document.getElementById('votes-form');
  votesForm.onsubmit = (event) => {
    event.preventDefault();
    const votesInput = document.getElementById('votes').value;
    const voteCount = document.getElementById('vote-count');
    const newVotes = parseInt(voteCount.textContent) + parseInt(votesInput);
    voteCount.textContent = newVotes;

    fetch(`${BASE_URL}/${character.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votes: newVotes })
    });

    votesForm.reset();
  };

  const characterForm = document.getElementById('character-form');
  characterForm.onsubmit = (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name').value;
    const imageInput = document.getElementById('image').value;

    const newCharacter = { name: nameInput, image: imageInput, votes: 0 };

    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(character => {
      const characterBar = document.getElementById('character-bar');
      const span = document.createElement('span');
      span.textContent = character.name;
      span.addEventListener('click', () => displayCharacterDetails(character));
      characterBar.appendChild(span);

      displayCharacterDetails(character);
      characterForm.reset();
    });
  };
}

function initialize() {
  fetchCharacters();
}

initialize();

