 const BASE_URL = 'https://localhost:3000/characters';
  
 function fetchCharacters() {
  fetch(`${BASE_URL}`)
      .then(response => response.json())
