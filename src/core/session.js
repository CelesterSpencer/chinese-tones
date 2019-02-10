import {Deck} from './deck';

class Session {
    constructor(deck) {
        // get subset of cards and get first card
        this.deck = this.__loadDeck(deck);
        this.__saveDeck(this.deck);
        this.card = this.deck.next();

        // card choosing logic
        this.newCardsDeck   = new Deck('temp', this.deck.cards);
        this.rightCardsDeck = new Deck('temp', []);
        this.wrongCardsDeck = new Deck('temp', []);
    }

    __loadDeck(deck) {
        // grab deck data from local storage
        let deckData = localStorage.getItem('data:'+deck.name) || `{ "id": "${deck.name}", "date": "nodate", "cards":[] }`;
        deckData = JSON.parse(deckData);

        // get current date
        let today = new Date();
        let todayString = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;

        // grab either loaded deck if dates match or grab a random deck
        let subset = (todayString === deckData.date) ? new Deck(deckData.id, deckData.cards) : deck.getSubsetByRating();
        return subset;
    }
    __saveDeck(deck) {
        let today = new Date();
        let deckData = {
            id: deck.name,
            date: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`,
            cards: deck.cards 
        };

        // save to local storage
        localStorage.setItem('data:'+deckData.id, JSON.stringify(deckData));
    }

    review(guessedRight) {
        // remove card from current array
        this.newCardsDeck.remove(this.card);
        this.rightCardsDeck.remove(this.card);
        this.wrongCardsDeck.remove(this.card);

        // add to new array
        if(guessedRight) {
            this.card.rating = Math.min(this.card.rating+1, 10);
            this.rightCardsDeck.add(this.card);
        } else {
            this.card.rating = Math.max(this.card.rating-2, 0);
            this.wrongCardsDeck.add(this.card);
        }
    }
    advance() {
        let r = Math.floor(Math.random()*100);
        if(r < 60) {
            // take new card
            if(this.newCardsDeck.length() !== 0) {
                this.card = this.newCardsDeck.next();
            } else {
                this.card = this.wrongCardsDeck.next();
            }
        } else if (r < 90) {
            // take wrong card
            if(this.wrongCardsDeck.length() !== 0) {
                this.card = this.wrongCardsDeck.next();
            } else {
                this.card = this.newCardsDeck.next();
            }
        } else {
            // take right card
            if(this.rightCardsDeck.length() !== 0) {
                this.card = this.rightCardsDeck.next();
            } else if(this.newCardsDeck.length() !== 0) {
                this.card = this.newCardsDeck.next();
            } else {
                this.card = this.wrongCardsDeck.next();
            }
        }
    }
    getCard() {
        return this.card;
    }
    getDeck() {
        return this.deck;
    }
    getNewCardsCount() {
        return this.newCardsDeck.length();
    }
    getRightCardsCount() {
        return this.rightCardsDeck.length();
    }
    getWrongCardsCount() {
        return this.wrongCardsDeck.length();
    }
    hasFinished() {
        return (this.newCardsDeck.length() + this.wrongCardsDeck.length()) === 0;
    }
}

export {Session}