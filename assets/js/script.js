'use strict';

console.group('Project #2: Pig Game');

// add play
let playing = true;

//add Player
let activePlayer = 'One';


//total score
let score = [0,0];

//current score
let currentSum = 0;

//dice picture
const dicePicture = ["assets/image/dice-1.png", "assets/image/dice-2.png", "assets/image/dice-3.png", "assets/image/dice-4.png", "assets/image/dice-5.png", "assets/image/dice-6.png"];


//add button new game
const newGameBtn = document.querySelector('.newGame__btn');

// Selecting elements score playerI
const scorePlayerOneEl = document.querySelector('.score__playerOne');

// Selecting elements score PlayerII
const scorePlayerTwoEl = document.querySelector('.score__playerTwo');

//Selectiong current score element PlayerI
const currentScoreEl1 = document.querySelector('.number__playerOne');
const currentScoreEl2 = document.querySelector('.number__playerTwo');


// Selecting elements dice 
const diceEl = document.querySelector('.image__dice');


//Selecting roll dice button 
const rollDiceBtn = document.querySelector('.rollDice__btn');

//Selecting hold button
const holdBtn = document.querySelector('.hold__btn');

// Starting conditions
scorePlayerOneEl.textContent = 0;
scorePlayerTwoEl.textContent = 0;
diceEl.classList.add('hidden');


// function new game (again)
const newGame = function (){
    currentSum = 0;
    score = [0, 0];
    playing = true;
    activePlayer = 'One';

    scorePlayerOneEl.textContent = 0;
    scorePlayerTwoEl.textContent = 0;
    currentScoreEl1.textContent = 0;
    currentScoreEl2.textContent = 0;
    document.querySelector('.card__playerTwo').classList.remove('player--active')
    document.querySelector('.card__playerTwo').classList.remove('player--win');
   
    document.querySelector('.card__playerOne').classList.add('player--active');
    document.querySelector('.card__playerOne').classList.remove('player--win');
    
    diceEl.classList.add('hidden');
    
}

//switch player function
const switchPlayer = function(){
    document.querySelector(`.number__player${activePlayer}`).textContent = 0; // delete sum of player
    document.querySelector('.card__player' + activePlayer).classList.toggle('player--active'); // delete opacity from card
    currentSum = 0; 
    activePlayer = activePlayer === 'One' ? 'Two' : 'One'; // another Player plays  
    document.querySelector('.card__player' + activePlayer).classList.toggle('player--active'); // add opacity to card (active player)
}

// function choose random dice
const chooseDice = function(){
    if(playing){
        const randomNum = Math.floor(Math.random() * dicePicture.length);  // randomNum = Math.floor(Math.random() * 6 + 1) diceEl.src = "./assets/image/dice-" + randomNum + ".png";
        diceEl.classList.remove('hidden');  // show dice picture
        diceEl.src = dicePicture[randomNum]; // add array picture(number) to src;
        if(randomNum !==0){ // check for rolled 1 (array started 0 - ...)
        currentSum += randomNum + 1; // add dice to current number
        document.querySelector(`.number__player${activePlayer}`).textContent = currentSum; // show current number in current score
        } else { // switch to next player
        switchPlayer();
    }
    }
    
};

//win function
const win = function(){
    document.querySelector('.card__player' + activePlayer).classList.add('player--win');
    document.querySelector('.card__player' + activePlayer).classList.remove('player--active');
    diceEl.classList.add('hidden');
} 



// random dice
rollDiceBtn.addEventListener('click', chooseDice);

//vtn hold event listener
holdBtn.addEventListener('click', function(){
    if(playing){
        if(activePlayer === 'One'){
            score[0] += currentSum;
            document.querySelector('.score__player' + activePlayer).textContent = score[0];
            if(score[0] >= 100){
                playing = false;
                win();
            }
        } else {
            score[1] += currentSum;
            document.querySelector('.score__player' + activePlayer).textContent = score[1];
            if(score[1] >= 100){
                playing = false;
                win();
            }
        }
        switchPlayer();
    }
});



// add event listener new game
newGameBtn.addEventListener('click', newGame);
 
console.groupEnd();

