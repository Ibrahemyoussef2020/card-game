
import {marks  , values} from './utils.js';

class Card  {
    constructor(mark,value){
        this.mark = mark
        this.value = value 
    }

    get color(){
        return this.mark === '♥' || this.mark === '♦' ? 'red' : 'black' 
    }

    creatUsageCard(){
        const card = document.createElement('div');
        card.innerText = this.mark;
        card.classList.add('card' , this.color);
        card.dataset.value = `${this.value}${this.mark}`;


        const exchangeCard = document.createElement('div');
        exchangeCard.innerText = this.mark;
        exchangeCard.classList.add('exchange-card' , this.color);
        exchangeCard.dataset.value = `${this.value}${this.mark}`;

        card.appendChild(exchangeCard);

        return card
    }
}

//////////////////////////////////////////////////////////////////////////

export default class Deck {
    constructor(cards = creatCards()){
        this.cards = cards
    }

    shiftDeck(){
        return this.cards.shift();
    }

    pushDeck(card){
        return this.cards.push(card);
    }

    get cardsCount(){
      return  +this.cards.length
    }

    shuffleCards() {
        for(let i = this.cardsCount - 1 ; i > 0 ; i--){
            const newIndex = Math.floor(Math.random() * (i + 1));
            const boxSavigValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = boxSavigValue;
        }
    }

    
}

///////////////////////////////////////////////////////////////////////

function creatCards() {
    return marks.flatMap(mark =>{
        return values.map(value =>{
            return new Card(mark,value)
        })
    })
}