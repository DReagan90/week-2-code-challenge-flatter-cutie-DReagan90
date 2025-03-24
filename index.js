 const BASE_URL = 'https://localhost:3000/characters';
  
 function fetchCharacters() {
  fetch(`${BASE_URL}`)
      .then(response => response.json()) 
      .then(characters => {
        const characterBar = document.getElementById('character-bar');
