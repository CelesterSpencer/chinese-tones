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
        const count = 20;

        // return if there are less cards
        if (this.cards.length < count) {
            return this.cards;
        }

        // filter all new cards
        let newCards = this.cards.filter(card => (card.rating===0));
        let sortedCards = this.cards.sort((a, b) => a.rating - b.rating)

        // limit new cards to 5 or less
        let cards = [];
        if (newCards.length > 5) {
            for (let i = 0; i < 5; i++) {
                cards.push(newCards[i]);
            }
        } else {
            cards = newCards;
        }

        // fill exceptions
        let existingCards = {};
        cards.forEach(card => {existingCards[card.hanzi.join()] = card});

        // random function
        const randomCard = () => {
            let idx = Math.floor(2 * Math.abs(noise() - 0.5) * sortedCards.length);
            return sortedCards[idx];
        }

        // add enough cards
        let diff = count - cards.length;
        for(let i = 0; i < diff; i++) {
            let card = randomCard();
            while(card.hanzi.join() in existingCards) {
                card = randomCard();
            }
            existingCards[card.hanzi.join()] = card;
            cards.push(card);
        }

        return new Deck(this.name, cards);
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