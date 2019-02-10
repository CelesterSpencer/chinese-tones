import {html} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {addTonemark} from "../util/pinyin";
import {style} from '../util/styles';

// grab color of the tones
const colors = style.tones;

class CardList {
    constructor(ctx) {
        this.ctx = ctx;
    }
    __reset() {}
    onClickHandler(card, i) {}
    __charClass(card, i) {
        return `tone${card.tone[i]}`
    }
    __ratingClass(i) {
        return `r${i}`
    }
    __hanzi(card) {
        return html`
            <character>
                ${repeat(
                    card.hanzi,
                    (_, i) => i,
                    (h, i) => html`
                        <span class$=${this.__charClass(card, i)}>${h}</span>
                    ` 
                )}
            </character>
        `
    }
    next() {}
    finish() {}
    template() {
        let deck = this.ctx.ctx.deck;
        deck.cards.sort((a,b) => a.rating - b.rating);
        return html`
            <listview>
                ${repeat(
                    deck.cards,
                    (_, i) => i,
                    (card, _) => html`
                        <listitem>
                            ${this.__hanzi(card)}
                            <rating class$=${this.__ratingClass(card.rating)}>${card.rating}</rating>
                        </listitem>
                    `
                )}
            </listview>
        `;
    }
}

export {CardList};