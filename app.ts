
const joke = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  generateJoke();
  console.log('Button clicked');
}); 

function generateJoke() {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  })  
  .then((res) => res.json())
  .then((data) => {
    if (joke){
      joke.innerHTML = data.joke;
      
    }
  }) 
}
