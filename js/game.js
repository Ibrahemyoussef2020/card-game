import {toggleBetweenTwoClasses, valuesIncludesChars} from './utils.js';
import Deck from "./deck.js";

import { gameStatus , setStatusToRestart ,setDisabledOrEnabled , players , stopBtn, toggleLayoutStartShow , startLayoutDiv } from './options.js';

const introText = document.getElementById('intro-text');
const replayBtn = document.getElementById('replay');

const settingsBtn = document.getElementById('settings'); 

export const PlayerTwoDeckDiv = document.querySelector('#PlayerTwo-deck');
const PlayerTwoDeckDivText = document.querySelector('.PlayerTwo-deck > span');
const PlayerTwoCardChosen = document.querySelector('.PlayerTwo-card-chosen');

const result = document.querySelector('.result');

export const PlayerOneDeckDiv = document.querySelector('#PlayerOne-deck');
const PlayerOneDeckDivText = document.querySelector('#PlayerOne-deck > span');
const PlayerOneCardChosen = document.querySelector('#PlayerOne-card-chosen');

const rolePlayerOneAlert = document.querySelector('#PlayerOne-deck > .choose');
const rolePlayerTwoAlert = document.querySelector('#PlayerTwo-deck > .choose');

const PlayerOneLand = document.querySelector('.PlayerOne-land');
const PlayerTwoLand = document.querySelector('.PlayerTwo-land');

let PlayerOneDeck , PlayerTwoDeck ;


let doesCompleterole = false,
    doesCompleteRound = true,
    doesCompleteGame = false,
    play = false,
    replay = false;


////////////////  set deck count ////////////////////////

function setPlayerDeckCount(player){
    if (player === 'player-one') {
        PlayerOneDeckDivText.innerText = PlayerOneDeck.cardsCount;
    }
    else{
        PlayerTwoDeckDivText.innerText = PlayerTwoDeck.cardsCount;
    }
}

//////////////////////// didPlayerWin //////////////////

function didPlayerWin(firstCard,secondCard){
    return valuesIncludesChars[firstCard.value] > valuesIncludesChars[secondCard.value]
}

/////////////////  configure next role and Battle  /////////////////////

function configureNextrole(){
    console.log('role i');
    PlayerOneCardChosen.innerHTML = '';
    setPlayerDeckCount('player-one');
}

function configureNextBattle(){
    PlayerTwoCardChosen.innerHTML = '';
    result.innerText = players === 1 ? 'Your role' :  'Plyer One role';
    setPlayerDeckCount('player-two');

}

///////////////////////////// does game finished /////////////////////

function isGameOver(deck){
  return  deck.cardsCount < 1;
}

////////////////////////// roggle alert point //////////////

function toggleAllertPoint(role) {

    const showenAlert = role === 'role-one' ? rolePlayerOneAlert : rolePlayerTwoAlert;
    const hiddenAlert = role === 'role-two' ? rolePlayerOneAlert : rolePlayerTwoAlert;
    
   if (hiddenAlert.classList.contains('animation')) {

        hiddenAlert.classList.remove('animation');
    }
    showenAlert.classList.add('animation');
}


///////////////////////////// end game /////////////////////

function endGame(player) {
    toggleBetweenTwoClasses(result,'no-animation','animation')

    if (player === 1) {
        result.innerText = players === 1 ? 'Game Over!' : 'Conngrats player 2';
    } else {
        result.innerText = players === 1 ?  'Congratulations!' : 'Conngrats player 1';
    }
    
    setStatusToRestart()
    doesCompleteGame = true;
    toggleLayoutStartShow(true);
}


///////////////////////// control exchange process  ////////////////

function controlExchangeProcess(exchangeDiv){
    exchangeDiv?.classList?.add('animation');
  
    PlayerTwoDeckDiv.classList.add('blur');
    PlayerOneDeckDiv.classList.add('blur');

    setTimeout(()=> {
        exchangeDiv?.classList?.remove('animation');
        
        PlayerTwoDeckDiv.classList.remove('blur');
        PlayerOneDeckDiv.classList.remove('blur');

        configureNextrole();
        configureNextBattle();

    } , 1000);
}


//////////////////////// palyer One role ///////////////////////////

function playerOnerole(){
    if (PlayerTwoDeck.cardsCount > 0 && PlayerOneDeck.cardsCount > 0) {
        const palyerOneCard = PlayerOneDeck.shiftDeck(); 

        if (typeof palyerOneCard != 'undefined'){

            PlayerOneCardChosen.appendChild(palyerOneCard.creatUsageCard());
            setPlayerDeckCount('player-one');
        }

        return palyerOneCard
    }   
}


function playerTworole(){
    if (PlayerTwoDeck.cardsCount > 0 && PlayerOneDeck.cardsCount > 0) {
        const palyerTwoCard = PlayerTwoDeck.shiftDeck(); 

        if (typeof palyerTwoCard != 'undefined'){

            PlayerTwoCardChosen.appendChild(palyerTwoCard.creatUsageCard());
            setPlayerDeckCount('player-two');
        }

        return palyerTwoCard
    }   
    
}


//////////////////////// comapre results //////////////////////////////

function comapreResults(isPlayerOneWoner,isPlayerTwoWoner,PlayerOneCard,PlayerTwoCard){

    if (isPlayerOneWoner) {
        result.innerText = players === 1 ? 'You Won' : 'PlayerOne Won';
        PlayerOneDeck.pushDeck(PlayerTwoCard);
        console.log(PlayerOneDeck);
        if (result.classList.contains('bg-blue')) {
            result.classList.remove('bg-blue')
        }
        
        result.classList.add('bg-black');

        const PlayerTwoExchangeCardDiv = document.querySelector('.PlayerTwo-card-chosen > .card > .exchange-card');
        controlExchangeProcess(PlayerTwoExchangeCardDiv);
        
    }
    else if (isPlayerTwoWoner) {
        result.innerText = players === 1 ? 'Computer Won' : 'PlayerTwo Won';

        PlayerTwoDeck.pushDeck(PlayerOneCard);

        if (result.classList.contains('bg-black')) {
            result.classList.remove('bg-black')
        }

        result.classList.add('bg-blue');

        const plyerExchangeCardDiv = document.querySelector('.PlayerOne-card-chosen > .card > .exchange-card');
        controlExchangeProcess(plyerExchangeCardDiv);
    }
    
    else{
        result.innerText = 'Drow!'
        PlayerTwoDeck.pushDeck(PlayerTwoCard);
        PlayerOneDeck.pushDeck(PlayerOneCard);

        if (result.classList.contains('bg-black')) {
            result.classList.remove('bg-black')
        }
        if (result.classList.contains('bg-blue')) {
            result.classList.remove('bg-blue')
        }

        result.classList.add('bg-black');

        const PlayerTwoExchangeCardDiv = document.querySelector('.PlayerTwo-card-chosen > .card > .exchange-card');
        controlExchangeProcess(PlayerTwoExchangeCardDiv)

        const plyerExchangeCardDiv = document.querySelector('.PlayerOne-card-chosen > .card > .exchange-card');
        controlExchangeProcess(plyerExchangeCardDiv)
    }
    showPlayerLand(PlayerOneDeckDiv,PlayerOneDeck.cards);
    showPlayerLand(PlayerTwoDeckDiv,PlayerTwoDeck.cards);
}


/////////////////////// show result /////////////////////////////////

function showResults(){

    if (doesCompleteRound) {    
        const palyerOneCard = PlayerOneDeck.shiftDeck(); 
        const playerTwoCard =  PlayerTwoDeck.shiftDeck(); 
             
        const isPlayerOneWoner = didPlayerWin(palyerOneCard,playerTwoCard);
        const isPlayerTwoWoner = didPlayerWin(playerTwoCard,palyerOneCard);
        playerTworole()
        comapreResults(isPlayerOneWoner,isPlayerTwoWoner,palyerOneCard,playerTwoCard);
        return true
    }

    else if (doesCompleterole) {
        playerOnerole()
        result.innerText = players === 1 ? 'Computer role' : 'Plyer Two role';
        return true
    }


    return false
}

///////////////////////// start Battle ///////////////////////////////

function startBattle(clicker){
    if (isGameOver(PlayerOneDeck)) {
        endGame(1)
        return true
    }
    
    else if (isGameOver(PlayerTwoDeck)) {
        endGame(2)
        return true
    }

    if (clicker === 'player-one') {
        doesCompleterole = true;
        doesCompleteRound = false;
        showResults()
    }

    else if (clicker === 'player-two') {
        doesCompleterole = false;
        doesCompleteRound = true; 
        showResults()
    }

}

////////////////////////////////// players lands /////////////////////////

function showPlayerLand(deck,cards) {
    const pattern = /(?<=bg\-)\w+/g;
    const image = deck.className.match(pattern)[0];

   const papers = cards.map(card => (
        `<article class='land-item'>
          <img src="./images/${image}.webp" />
        </article>`
    )) ;

    if (deck.classList.contains('PlayerOne-deck')) {
        PlayerOneLand.innerHTML =  papers ;
    }else{
        PlayerTwoLand.innerHTML =  papers ;
    }

}


///////////////////////  Game status management /////////////////////////

// start Game

export function startGame(){

    if (result.classList.contains('animation')) {
        result.classList.remove('animation');
    }
    result.classList.add('no-animation');

    toggleLayoutStartShow(false , false); 

    play = true;

    const deck =  new Deck();


    deck.shuffleCards();

    const midLingth = Math.ceil(deck.cardsCount / 2);

    PlayerOneDeck = new Deck(deck.cards.slice(0,midLingth))
    PlayerTwoDeck = new Deck(deck.cards.slice(midLingth,deck.cardsCount))

    console.log(PlayerOneDeck);

     PlayerOneCardChosen.appendChild(PlayerOneDeck.cards[0].creatUsageCard());
     PlayerTwoCardChosen.appendChild(PlayerTwoDeck.cards[0].creatUsageCard());

    showPlayerLand(PlayerOneDeckDiv,PlayerOneDeck.cards);
    showPlayerLand(PlayerTwoDeckDiv,PlayerTwoDeck.cards);

    doesCompleteGame = false;
    doesCompleteRound = true;
 
    configureNextrole();
    configureNextBattle();

    toggleAllertPoint('role-one');
}


// re start Game 

export function restartGame() { 
    startGame()
}
replayBtn.addEventListener('click' , ()=> restartGame());

// resume Game


////////////////////////////// event start //////////////////////////////

PlayerOneDeckDiv.addEventListener('click' , ()=> playerOneTriggering());

function playerOneTriggering(){
    if (play || replay) {
        console.log('one');
        if (doesCompleteRound) {
            startBattle('player-one')
        }
              
        if (rolePlayerOneAlert.classList.contains('animation')) {
            rolePlayerOneAlert.classList.remove('animation')
        }

        toggleAllertPoint('role-two');
    }

    if (players === 1) {
        
        setTimeout(() => playerTwoTriggering() , 1000);
    }

    
}

/* player two triggering */

PlayerTwoDeckDiv.addEventListener('click' , ()=> players === 2 ? playerTwoTriggering() : null);

function playerTwoTriggering() {
    if (play || replay) {
        if (doesCompleterole) {
            startBattle('player-two'); 
        }
     
        if (rolePlayerOneAlert.classList.contains('animation')) {
            rolePlayerOneAlert.classList.remove('animation')
        }

        toggleAllertPoint('role-one');
    }

}
