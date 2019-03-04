import {html, render} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {get} from '../util/doc';
import {View} from '../core/view';
import {Deck} from '../core/deck';
import {loadRating, saveRating} from '../core/rating';

// decks
//import hsk1 from "../../res/hsk1.json";
//import hsk2 from "../../res/hsk2.json";
//import hsk3 from "../../res/hsk3.json";
import cfd1 from "../../res/cfd1.json";
//import cfd1p1 from "../../res/cfd1p1.json";

let decks = [
    //new Deck(hsk1.name, hsk1.cards),
    //new Deck(hsk2.name, hsk2.cards),
    //new Deck(hsk3.name, hsk3.cards),
    new Deck(cfd1.name, cfd1.cards),
    //new Deck(cfd1p1.name, cfd1p1.cards)
];
// add ratings
decks.forEach(deck => {loadRating(deck); saveRating(deck);});

class ChooseDeck extends View {
    constructor(ctx) {
        super();
        this.parent = get('app');
        this.ctx = ctx;
    }

    onClickHandler(i) {
        this.ctx.deck = decks[i];
        this.ctx.router.goTo('ChooseCourse');
    }

    __style() {
        return html`
            <style>
                card {
                    display         : flex;
                    flex-direction  : column;
                    align-items     : center;
                    justify-content : flex-start;
                    height          : 100%;
                    width           : 100%;
                }
                header {
                    display         : flex;
                    align-items     : center;
                    justify-content : center;
                    width           : 100%;
                    height          : 70px;
                    padding         : 0px;
                    margin          : 0px;
                    margin-bottom   : 20px;
                    background      : white;
                    color           : black;
                    font-size       : 2em;
                    z-index         : 100;
                }
                card button {
                    display         : flex;
                    flex-direction  : row;
                    align-items     : center;
                    justify-content : space-between;
                    border          : 15px;
                    border-radius   : 12px;
                    padding         : 5px;
                    padding-left    : 15px;
                    padding-right   : 15px;
                    margin-bottom   : 5px;
                    width           : 95%;
                    height          : 70px;
                    background      : white;
                    border-bottom   : solid 1px gray; 
                    font-size       : 1.4em;
                    z-index         : 1;
                    box-shadow      : 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
                }
                card button span:last-child {
                    color           : white;
                    background      : #ff5722;
                    border-radius   : 100%;
                    width           : 60px;
                    height          : 60px;
                    display         : flex;
                    justify-content : center;
                    align-items     : center;
                }
            </style>
        `
    }

    render() {
        render(
            html`
                ${this.__style()}
                <header>Chinese Decks</header>
                <card>
                    ${repeat(
                        decks,
                        (d, i) => i,
                        (d, i) => html`
                            <button on-click=${_ => this.onClickHandler(i)}>
                                <span>${d.name}</span>
                                <span>${d.cards.length}</span>
                            </button>
                        `
                    )}
                </card>
            `,
            this.parent
        );
    }
}

export {ChooseDeck}