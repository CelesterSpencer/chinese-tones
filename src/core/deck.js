import {noise} from '../util/algo';

class Deck {
    constructor(name, cards) {
        this.name = name;
        this.cards = cards;
    }

    /**
     * adds a new card
     */
    add(card) {
        this.cards.push(card);
    }
    /**
     * remove a card
     */
    remove(card) {
        this.cards = this.cards.filter((el) => el !== card);
    }

    /**
     * Creates a new deck with a subset of randomly picked cards.
     * @param {number} count - number of cards the new deck should contain. 
     */
    getSubset(count, exclude) {
        let cards = [];
        let existingCards = {};
        if(exclude) {
            existingCards[exclude.hanzi.join()] = exclude;
        }
        for(let i = 0; i < count; i++) {
            let card = this.next();
            while(card.hanzi.join() in existingCards) {
                card = this.next();
            }
            existingCards[card.hanzi.join()] = card;
            cards.push(card);
        }
        return new Deck(this.name, cards);
    }

    getSubsetByRating() {
        const allCards = 30;
        const newCardsCount = 10;

        // return if there are less than 30 cards in this deck
        if (this.cards.length < allCards) {
            return this.cards;
        }

        // filter new and old cards
        let newCards = this.cards.filter(card => (card.rating === 0));
        let oldCards = this.cards.filter(card => (card.rating !== 0));
        oldCards.sort((a, b) => a.rating - b.rating);

        // determine how much to pick from the two sets
        let newCardsToPick = Math.max(allCards - oldCards.length, newCardsCount);
        let oldCardsToPick = allCards - newCardsToPick; 

        // pick new cards in the order of appearance in the deck
        let cards = [];
        for (let i = 0; i < newCardsToPick; i++) {
            cards.push(newCards[i]);
        }

        // random function
        const randomCard = () => {
            let idx = Math.floor(2 * Math.abs(noise() - 0.5) * oldCards.length);
            return oldCards[idx];
        }

        // add old cards
        for(let i = 0; i < oldCardsToPick; i++) {
            let card = randomCard();
            oldCards.splice(oldCards.indexOf(card), 1);
            cards.push(card);
        }

        return new Deck(this.name, cards);
    }

    /**
     * returns the number of cards with a rating of 0
     */
    getNumberOfNewCards() {
        let newCards = this.cards.filter((card) => card.rating === 0);
        return newCards.length;
    }

    /**
     * returns a random card
     */
    next() {
        let idx = Math.floor(Math.random()*this.cards.length);
        return this.cards[idx];
    }

    /**
     * returns the number of cards
     */
    length() {
        return this.cards.length;
    }
}

export {Deck};