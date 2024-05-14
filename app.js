"use strict";
//WEATHER
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=e8ddef016ed1b79eaba39708770c480e')
        .then((res) => res.json())
        .then((data) => {
        if (temperature) {
            temperature.innerHTML = (data.main.temp - 273.15).toFixed(1) + '°C';
            weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
        }
    });
}
getWeather();
//JOKES
const joke = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
const emojiBtn1 = document.getElementById('emojiBtn1');
const emojiBtn2 = document.getElementById('emojiBtn2');
const emojiBtn3 = document.getElementById('emojiBtn3');
jokeBtn === null || jokeBtn === void 0 ? void 0 : jokeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generateJoke();
});
function generateJoke() {
    removeAllEmojiSelected();
    let url;
    let headers;
    if (Math.floor(Math.random() * 2) == 0) {
        url = 'https://icanhazdadjoke.com/';
        headers = {
            'Accept': 'application/json'
        };
    }
    else {
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
emojiBtn1 === null || emojiBtn1 === void 0 ? void 0 : emojiBtn1.addEventListener('click', () => vote(1));
emojiBtn2 === null || emojiBtn2 === void 0 ? void 0 : emojiBtn2.addEventListener('click', () => vote(2));
emojiBtn3 === null || emojiBtn3 === void 0 ? void 0 : emojiBtn3.addEventListener('click', () => vote(3));
function vote(score) {
    let joke = document.getElementById('joke');
    let emojiBtn = document.getElementById('emojiBtn' + score);
    let jokeScore = score;
    if (joke) {
        const jokeText = joke.innerHTML;
        if (emojiBtn) {
            if (emojiBtn.classList.contains('selected')) {
                emojiBtn.classList.remove('selected');
                jokeScore = 0;
            }
            else {
                removeAllEmojiSelected();
                emojiBtn.classList.add('selected');
            }
        }
        const jokeReport = {
            joke: jokeText,
            score: jokeScore,
            date: new Date().toISOString()
        };
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
