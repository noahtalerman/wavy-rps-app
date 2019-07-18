// global object of user's score and computer's score
let scores = {
    userScore = 0,
    compScore = 0
}

showHideBear();
setTimeout(function () {
    displayIntro();
}, 3000);
setTimeout(function () {
    playGame();
}, 21000);

function showHideBear() {
    setTimeout(function () {
        document.querySelector('#ye-bear').style.opacity = 0;
        document.querySelector('.intro-header').style.opacity = 0;
    }, 3000);
    setTimeout(function () {
        document.querySelector('#ye-bear').style.display = 'none';
    }, 3500);
}

function displayBear() {
    document.querySelector('#ye-bear').style.display = 'initial';
    document.querySelector('#ye-bear').style.opacity = 0;
    setTimeout(function () {
        document.querySelector('#ye-bear').style.opacity = 1;
    }, 500);
}

function displayIntro() {
    let timeLeft = 14;
    let announce;
    const banner = document.querySelector('.intro-header');
    setTimeout(function(){
        banner.style.opacity = 1;
    }, 1000);
    const bannerTimer = setInterval(function () {
        if (timeLeft > 11){
            announce = 'WELCOME TO WAVY ROCK, PAPER, SCISSORS';
        } else if (timeLeft === 11) {
            banner.style.opacity = 0;
        } else if (timeLeft < 11 && timeLeft > 7) {
            banner.style.opacity = 1;
            announce = 'YOU WILL COMPETE AGAINST A COMPUTER IN THE UTIMATE TEST OF YOUR WAVINESS'
        } else if (timeLeft === 7) {
            banner.style.opacity = 0;
        } else if (timeLeft < 7 && timeLeft > 3) {
            banner.style.opacity = 1;
            announce = 'THE GAME IS BEST 3 OUT OF 5'
        }
        else if (timeLeft === 3) {
            banner.style.opacity = 0;
        }
        else if (timeLeft < 3 && timeLeft > 0) {
            banner.style.opacity = 1;
            announce = 'GOOD LUCK AND GODSPEED'
        }
        timeLeft -= 1;
        banner.innerHTML = announce;
        if (timeLeft <= 0) {
            clearInterval(bannerTimer);
        }
    }, 1000);
    setTimeout(function () {
        banner.style.opacity = 0;
    }, 16000);
    setTimeout(function () {
        banner.innerHTML = '';
    }, 16500);
}

function darkenButton(button) {
    button.style.opacity = 0.5;
    button.style.cursor = 'default';
    button.disabled = true;
}

function lightenButton(button) {
    button.style.opacity = 1;
    button.style.cursor = 'pointer';
    button.disabled = false;
}

function disableBtns() {
    const header = document.querySelector('.selection-header');
    header.style.opacity = 0.5;
    const buttonsHTMLCollection = document.querySelectorAll('.selection-btn');
    buttonsArray = Array.from(buttonsHTMLCollection);
    buttonsArray.forEach(darkenButton);
}

function enableBtns() {
    const header = document.querySelector('.selection-header');
    header.style.opacity = 1;
    const buttonsHTMLCollection = document.querySelectorAll('.selection-btn');
    buttonsArray = Array.from(buttonsHTMLCollection);
    buttonsArray.forEach(lightenButton);
}

function displayCounter(){
    // countdown from 3
    let timeLeft = 3;
    let moveAnnounce;
    // changes header according to what second the countdown is at
    const counter = document.querySelector('.counter');
    counter.style.opacity = 1;
    const gameTimer = setInterval(function() {
        if (timeLeft === 3) {
            moveAnnounce = 'Rock';
        } else if (timeLeft === 2) {
            moveAnnounce = 'Paper';
        }
        else if (timeLeft === 1) {
            moveAnnounce = 'Scissors';
        }
        counter.innerHTML = moveAnnounce;
        timeLeft -= 1;
        if(timeLeft <= -1) {
            clearInterval(gameTimer);
            counter.innerHTML = 'Shoot';
        }
    }, 1000);
    // fade's out counter after 5 seconds
    setTimeout(function(){
        counter.style.opacity = 0;
        counter.innerHTML = '';
        enableBtns();
    }, 5000);
}

function displayNewGameBtn() {
    const restartBtn = document.querySelector('.restart-btn');
    restartBtn.style.opacity = 1;
    restartBtn.disabled = false;
    // reload page when new game button is clicked
    restartBtn.addEventListener('click', function () {
    scores.userScore = 0;
    scores.compScore = 0;
    // fade out scoreboard
    document.querySelector('.scoreboard').style.opacity = 0;
    // fade out button
    restartBtn.style.opacity = 0;
    restartBtn.style.disabled = true;
    enableBtns();
    });
}

function playRound(playerSelection, computerSelection){
    let announce;
    // show and then hide counter
    displayCounter();
    if (playerSelection === 'Rock' && computerSelection === 'Scissors') {
        announce = 'You Win! Rock is wavier than Scissors';
        scores.userScore++;
    } else if (playerSelection === 'Rock' && computerSelection === 'Paper') {
        announce = 'You Lose! Rock is less wavy compared Paper';
        scores.compScore++;
    } else if (playerSelection === 'Scissors' && computerSelection === 'Rock') {
        announce = 'You Lose! Scissors are less wavy compared to Rock';
        scores.compScore++;
    } else if (playerSelection === 'Scissors' && computerSelection === 'Paper') {
        announce = 'You Win! Scissors is wavier than Paper';
        scores.userScore++;
    } else if (playerSelection === 'Paper' && computerSelection === 'Scissors') {
        announce = 'You Lose! Paper is less wavy compared to Scissors';
        scores.compScore++;
    } else if (playerSelection === 'Paper' && computerSelection === 'Rock') {
        announce = 'You Win! Paper is wavier than Rock';
        scores.userScore++;
    } else if (playerSelection === computerSelection) {
        announce = `Tie! ${playerSelection} and ${computerSelection}. Equally wavy`;
    }
    // end game when user's or computer's score reaches 3
    if (scores.userScore === 3) {
        announce = `You win the game! ${scores.userScore} rounds to ${scores.compScore}. You're ultra wavy`;
        // disable buttons and display button for game restart after 5 seconds (when timer is complete and scoreboard is visible)
        setTimeout(function () {
            disableBtns();
            displayNewGameBtn();
        }, 5000);
    }
    if (scores.compScore === 3) {
        announce = `You lose the game! ${scores.userScore} round(s) to ${scores.compScore}. Computer Yeezus is too wavy for you!`;
        // disable buttons and display button for game restart after 5 seconds (when timer is complete and scoreboard is visible)
        setTimeout(function () {
            disableBtns();
            displayNewGameBtn();
        }, 5000);
    }
    // fade in scoreboard after 5 seconds
    setTimeout(function () {
        document.querySelector('.round-outcome').innerHTML = announce;
        document.querySelector('.user-score').innerHTML = `Your score: ${scores.userScore}`;
        document.querySelector('.ye-score').innerHTML = `Ye's score: ${scores.compScore}`;
        document.querySelector('.scoreboard').style.opacity = 1;
    }, 5000);
}

function computerPlay(){
    // selects random play choice for computer
    let choiceArray = ["Rock", "Paper", "Scissors"];
    let randomChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
    return randomChoice;
}

function onClickPlayRound(button) {
    button.addEventListener('click', function (){
        let selectedButton = this.innerHTML;
        let computerMove = computerPlay();
        playRound(selectedButton, computerMove);
    })
}

function onClickDisable(button) {
    button.addEventListener('click', function() {
        disableBtns();
        document.querySelector('.scoreboard').style.opacity = 0;
    })
}

function playGame(){
    const gameInterface = document.querySelector('.game-interface');
    document.querySelector('.restart-button').disabled = true;
    displayBear();
    setTimeout(function(){
        gameInterface.style.opacity = 1;
    }, 1000);
    const buttonsHTMLCollection = (document.querySelectorAll('.selection-btn'));
    buttonsArray = Array.from(buttonsHTMLCollection);
    buttonsArray.forEach(onClickDisable);
    buttonsArray.forEach(onClickPlayRound);
}