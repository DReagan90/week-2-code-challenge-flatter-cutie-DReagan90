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
