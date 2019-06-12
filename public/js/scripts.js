//global variable's of user's score and computer's score
let userScore = 0;
let compScore = 0;

hideBear();
setTimeout(function(){
    displayIntro();
}, 3000);
setTimeout(function(){
    playGame()
}, 21000);

function hideBear(){
    setTimeout(function(){
        document.querySelector('#ye-bear').style.opacity = 0;
        document.querySelector('.intro-header').style.opacity = 0;
    }, 3000);
    setTimeout(function(){
        document.querySelector('#ye-bear').style.display = 'none';
    }, 3500);
};

function displayBear(){
    document.querySelector('#ye-bear').style.display = 'initial';
    document.querySelector('#ye-bear').style.opacity = 1;
};

function displayIntro(){
    let timeLeft = 14;
    let announce;
    let banner = document.querySelector('.intro-header');
    setTimeout(function(){
        banner.style.opacity = 1;
    }, 1000);
    let bannerTimer = setInterval(function(){
        if (timeLeft > 11){
            announce = 'WELCOME TO WAVY ROCK, PAPER, SCISSORS';
        }
        else if (timeLeft == 11){
            banner.style.opacity = 0;
        }
        else if (timeLeft < 11 && timeLeft > 7){
            banner.style.opacity = 1;
            announce = 'YOU WILL COMPETE AGAINST A COMPUTER IN THE UTIMATE TEST OF YOUR WAVINESS'
        }
        else if (timeLeft == 7){
            banner.style.opacity = 0;
        }
        else if (timeLeft < 7 && timeLeft > 3){
            banner.style.opacity = 1;
            announce = 'THE GAME IS BEST 3 OUT OF 5'
        }
        else if (timeLeft == 3){
            banner.style.opacity = 0;
        }
        else if (timeLeft < 3 && timeLeft > 0){
            banner.style.opacity = 1;
            announce = 'GOOD LUCK AND GODSPEED'
        }
        timeLeft -= 1;
        banner.innerHTML = announce;
        if (timeLeft <= 0){
            clearInterval(bannerTimer);
        }
    }, 1000);
    setTimeout(function(){
        banner.style.opacity = 0;
    }, 16000);
    setTimeout(function(){
        banner.innerHTML = '';
    }, 16500);
};

function playGame(){
    let gameInterface = document.querySelector('.game-interface');
    //disable restart button, it is hidden now and will be enable at end of game (bottom of scoreboard)
    document.querySelector('.restart-button').disabled = true;
    gameInterface.style.opacity = 1;
    displayBear();
    let selectedButton;
    buttons = (document.getElementsByClassName('selection-btn'));
            
    for (i = 0; i < 3; ++i){
        buttons[i].addEventListener('click', function(){

            //disable buttons
            disableBtns();

            //fade out scoreboard
            document.querySelector('.scoreboard').style.opacity = 0;

            //set user's selected move and computer's move
            selectedButton = this.innerHTML;
            computerSelection = computerPlay();
            playRound(selectedButton,computerSelection);
        });
    }
}

function computerPlay(){
    //selects random play choice for computer
    choiceArray = ["Rock", "Paper", "Scissors"];
    randomChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
    return randomChoice;
}

function displayCounter(){
    //countdown from 3
    let timeLeft = 3;
    let moveAnnounce;
    //changes header according to what second the countdown is at
    let counter = document.querySelector('.counter');
    counter.style.opacity = 1;
    let gameTimer = setInterval(function(){
        if (timeLeft === 3){
            moveAnnounce = 'Rock';
        }
        else if (timeLeft === 2){
            moveAnnounce = 'Paper';
        }
        else if (timeLeft === 1){
            moveAnnounce = 'Scissors';
        }
        counter.innerHTML = moveAnnounce;
        timeLeft -= 1;
        if(timeLeft <= -1){
            clearInterval(gameTimer);
            counter.innerHTML = 'Shoot';
        }
    }, 1000);
    //fade's out counter after 5 seconds
    setTimeout(function(){
        counter.style.opacity = 0;
        counter.innerHTML = '';
        enableBtns();
    }, 5000);
    return;
}

function playRound(playerSelection, computerSelection){
    let announce;

    //show and then hide counter
    displayCounter();

    if (playerSelection === 'Rock' && computerSelection === 'Scissors'){
        announce = 'You Win! Rock is wavier than Scissors';
        userScore++;
    }
    else if (playerSelection === 'Rock' && computerSelection === 'Paper'){
        announce = 'You Lose! Rock is less wavy compared Paper';
        compScore++;
    }
    else if (playerSelection === 'Scissors' && computerSelection === 'Rock'){
        announce = 'You Lose! Scissors are less wavy compared to Rock';
        compScore++;
    }
    else if (playerSelection === 'Scissors' && computerSelection === 'Paper'){
        announce = 'You Win! Scissors is wavier than Paper';
        userScore++;
    }
    else if (playerSelection === 'Paper' && computerSelection === 'Scissors'){
        announce = 'You Lose! Paper is less wavy compared to Scissors';
        compScore++;
    }
    else if (playerSelection === 'Paper' && computerSelection === 'Rock'){
        announce = 'You Win! Paper is wavier than Rock';
        userScore++;
    }
    else if (playerSelection === computerSelection){
        announce = 'Tie! ' + playerSelection + ' and ' + computerSelection + '. Equally wavy';
    }

    //end game when user's or computer's score reaches 3
    if (userScore === 3){
        announce = 'You win the game! ' + userScore + ' rounds to ' + compScore + '. You\'re ultra wavy';

        // disable buttons and display button for game restart after 5 seconds (when timer is complete and scoreboard is visible)
        setTimeout(function(){
            disableBtns();
            displayNewGameBtn();
        },5000)
    }
    if (compScore === 3){
        announce = 'You lose the game! ' + userScore + ' round(s) to ' + compScore + '. Computer Yeezus is too wavy for you!';

        // disable buttons and display button for game restart after 5 seconds (when timer is complete and scoreboard is visible)
        setTimeout(function(){
            disableBtns();
            displayNewGameBtn();
        },5000)
    }

    //fade in scoreboard after 5 seconds
    setTimeout(function(){
        document.querySelector('.round-outcome').innerHTML = announce;
        document.querySelector('.user-score').innerHTML = `Your score: ${userScore}`;
        document.querySelector('.ye-score').innerHTML = `Ye's score: ${compScore}`;
        document.querySelector('.scoreboard').style.opacity = 1;
    },5000);

    return;
}

function disableBtns(){
    let header = document.querySelector('.selection-header');
    header.style.opacity = 0.5;
    let buttons = document.getElementsByClassName('selection-btn');
    for (i = 0; i < 3; ++i){
        //change appearance
        buttons[i].style.opacity = 0.5;
        buttons[i].style.cursor = 'default';
        //disable
        buttons[i].disabled = true;
    }
    return;
}

function enableBtns(){
    let header = document.querySelector('.selection-header');
    header.style.opacity = 1;
    let buttons = document.getElementsByClassName('selection-btn');
    for (i = 0; i < 3; ++i){
        //change appearance
        buttons[i].style.opacity = 1;
        buttons[i].style.cursor = 'pointer';
        //enable
        buttons[i].disabled = false;
    }
    return;
}

function displayNewGameBtn(){
    let restartBtn = document.querySelector('.restart-btn');
    restartBtn.style.opacity = 1;
    restartBtn.disabled = false;
    //reload page when new game button is clicked
    restartBtn.addEventListener('click', function(){
    userScore = 0;
    compScore = 0;
    //fade out scoreboard
    document.querySelector('.scoreboard').style.opacity = 0;
    //fade out button
    restartBtn.style.opacity = 0;
    restartBtn.style.disabled = true;
    enableBtns();
    });
    //fade out new game button
    return;
}

