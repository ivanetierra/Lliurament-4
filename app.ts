//WEATHER
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');

function getWeather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=e8ddef016ed1b79eaba39708770c480e')
  .then((res) => res.json())
  .then((data) => {
    if (temperature){
    temperature.innerHTML = (data.main.temp - 273.15).toFixed(1) + '°C';
    weatherIcon?.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    }
  })
}
getWeather();

//JOKES
const joke = document.getElementById('joke');

const jokeBtn = document.getElementById('jokeBtn');

const emojiBtn1 = document.getElementById('emojiBtn1');
const emojiBtn2 = document.getElementById('emojiBtn2');
const emojiBtn3 = document.getElementById('emojiBtn3');

type JokeReport = {
  joke: string;
  score: number;
  date: string;
}

jokeBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  generateJoke();
  changeBlob();
}); 


function generateJoke() {
  removeAllEmojiSelected();

  let url: string;
  let headers: HeadersInit;
  
  if (Math.floor(Math.random() * 2) == 0) {
    url = 'https://icanhazdadjoke.com/';
    headers = {
      'Accept': 'application/json'
    };
  } else {
    url = 'https://api.api-ninjas.com/v1/chucknorris';
    headers = {
      'X-Api-Key': 'ugMhXdE94qV7GglHO8Lk4w==wtpv0itY1o1KeblR'
    };
  }
  
  fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => {
      if (joke) {
        joke.innerHTML = data.joke;
      }
    });
}

//BLOB
let currentBlob: number = 1;

function changeBlob() {
  currentBlob = currentBlob % 8 + 1;
  const blobElement = document.getElementById('blob');
  
    blobElement?.setAttribute('src','svgs/blob' + currentBlob + '.svg');
}

//EMOJIS
emojiBtn1?.addEventListener('click',() => vote(1));
emojiBtn2?.addEventListener('click',() => vote(2));
emojiBtn3?.addEventListener('click',() => vote(3));

function vote(score: number) {
  let joke = document.getElementById('joke');
  let emojiBtn = document.getElementById('emojiBtn' + score);
  let jokeScore = score;

  if (joke) {
    const jokeText = joke.innerHTML;
    
    if (emojiBtn) {
      if (emojiBtn.classList.contains('selected')) {
        emojiBtn.classList.remove('selected');
        jokeScore = 0;    
      } else {
        removeAllEmojiSelected();
        emojiBtn.classList.add('selected');
      }
    }    
     
    const jokeReport: JokeReport = {
      joke: jokeText,
      score: jokeScore, 
      date: new Date().toISOString()
    }
    console.log(jokeReport);
  }
}

function removeAllEmojiSelected() {
  for (let i = 1; i <= 3; i++) {
    let emojiBtn = document.getElementById('emojiBtn' + i);
    if (emojiBtn) {
      emojiBtn.classList.remove('selected');
    }
  }
}
