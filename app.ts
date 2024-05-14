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

emojiBtn1?.addEventListener('click',() => vote(1));
emojiBtn2?.addEventListener('click',() => vote(2));
emojiBtn3?.addEventListener('click',() => vote(3));

function vote(score: number | null) {
  let joke = document.getElementById('joke');
  let emojiBtn = document.getElementById('emojiBtn' + score);
  let jokeScore = score;

  if (joke) {
    const jokeText = joke.innerHTML;
    
    if (emojiBtn) {
      if (emojiBtn.classList.contains('selected')) {
        emojiBtn.classList.remove('selected');
        jokeScore = null;    
      } else {
        for (let i = 1; i <= 3; i++) {
          const otherEmojiBtn = document.getElementById(`emojiBtn${i}`);
          otherEmojiBtn?.classList.remove('selected');
        }
        emojiBtn.classList.add('selected');
      }
    }    
     
    const jokeReport: JokeReport = {
      joke: jokeText,
      score: jokeScore as number, 
      date: new Date().toISOString()
    }
    console.log(jokeReport);
  }
}