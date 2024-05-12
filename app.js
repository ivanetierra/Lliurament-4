var joke = document.getElementById('joke');
var jokeBtn = document.getElementById('jokeBtn');
jokeBtn === null || jokeBtn === void 0 ? void 0 : jokeBtn.addEventListener('click', function (e) {
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
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if (joke) {
            joke.innerHTML = data.joke;
        }
    });
}
