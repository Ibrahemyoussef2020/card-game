import {toggleBetweenTwoClasses , addAnimationForElements} from './utils.js';
import {restartGame, startGame} from './game.js';

const startBtn = document.getElementById('start');
const containers = document.querySelectorAll('.shrink');
const introText = document.getElementById('intro-text');
export const startLayoutDiv = document.querySelector('.start-wrapper');
export const stopBtn = document.getElementById('pause');
const layoutSettings = document.querySelector('.layout-settings');
const PlayerOneDeckDiv = document.querySelector('.PlayerOne-deck');
const PlayerTwoDeckDiv = document.querySelector('.PlayerTwo-deck');
const colorBtns = document.querySelectorAll('.color-btn');
const playersBtns = document.querySelectorAll('.players-btn');
const settingsBtn = document.querySelector('#settings');





export let gameStatus = 'not-fired'; 
export let players = 1;



function  toggleshrink(ele,needToShrink) {
    if (needToShrink) {
        ele.classList.add('shrink')
    }else{
        if (ele.classList.contains('shrink')) {
            ele.classList.remove('shrink')
        }
    }
}


window.addEventListener("DOMContentLoaded", () => {
    setTimeout(()=> containers.forEach(container => toggleshrink(container,false)),500)
   setTimeout(()=> toggleLayoutStartShow(true , true),0) 
 });

/////////////////// manageStartBtnFunctionnality

export function setStatusToRestart(){
    gameStatus = 'completed'
}


export function manageStartBtnFunctionnality() {
    introText.innerText = 'Start'
    
    if (gameStatus === 'not-fired') {
        startGame();
        gameStatus ='played'
        return true
    }
    if (gameStatus === 'completed') {
        restartGame();
        gameStatus ='played'
        return true
    }
    else if (gameStatus === 'paused') {
        gameStatus ='paused'
        toggleLayoutStartShow(true)
        return true
    }
    else{
        toggleLayoutStartShow(false)
        return true
    }
}

startBtn.addEventListener('click' , ()=> manageStartBtnFunctionnality());



// control layout start

export function toggleLayoutStartShow(mustShow , gameFinished = true) {

    const timeOut =  gameFinished ? 1000 : 0;
    const addationTimeOut = gameStatus === 'completed' ? 1500 : 0;


    if (mustShow) {
        setTimeout(()=>{
            if (startLayoutDiv.classList.contains('hidden')) {
                startLayoutDiv.classList.remove('hidden');
            }
            startLayoutDiv.classList.add('visible');

        },timeOut + addationTimeOut)

        setTimeout(()=>{
            if (startLayoutDiv.classList.contains('before-show-btn')) {
                startLayoutDiv.classList.remove('before-show-btn');
            }
            startLayoutDiv.classList.add('after-show-btn');
        },timeOut + 500 + addationTimeOut)
    }
    else{

        setTimeout(()=>{
            if (startLayoutDiv.classList.contains('visible')) {
                startLayoutDiv.classList.remove('visible');
            }
            startLayoutDiv.classList.add('hidden')
        },0)

        setTimeout(()=>{
            if (startLayoutDiv.classList.contains('after-show-btn')) {
                startLayoutDiv.classList.remove('after-show-btn');
            }
            startLayoutDiv.classList.add('before-show-btn');
        },0)
    }

    if (layoutSettings.classList.contains('visible')) {
        layoutSettings.classList.remove('visible');
        layoutSettings.classList.add('hidden')
    }

 //   gameStatus = 'paused';
}

// toggle settengs visibility

settingsBtn.addEventListener('click' , ()=> toggleBetweenTwoClasses(layoutSettings,'hidden','visible'));

// toggle pause & run 

stopBtn.addEventListener('click' , ()=> {
    introText.innerText = 'Resume'
    toggleLayoutStartShow(true,false)
});

//  settengs button control

export function setDisabledOrEnabled(button , process) {
    button.disabled = process;
}

// palyers count



function setPlayerCount(btn) {
    players = parseInt(btn.getAttribute('data-Player'));

    if (window.confirm("This will lead to restart Game")) {
        restartGame()
    }

    playersBtns.forEach(elemet =>  {
        if (elemet.classList.contains('selected')) {
            elemet.classList.remove('selected')
        }
    })

    btn.classList.add('selected')
    
}
playersBtns.forEach(btn => btn.addEventListener('click' , ()=> setPlayerCount(btn)));
 
// palyers colors

function setPlayerColor(dataPlayer,dataColor){

    if (dataPlayer === 'PlayerOne') {
        PlayerOneDeckDiv.className = `PlayerOne-deck deck ${dataColor}`
    }
    else{
        PlayerTwoDeckDiv.className = `PlayerTwo-deck deck ${dataColor}`
    }

    if (window.confirm("This will lead to restart Game")) {
        restartGame()
    }
}

colorBtns.forEach(btn => btn.addEventListener('click' , ()=> setPlayerColor(btn.getAttribute('data-player') , btn.getAttribute('data-color'))))



