import {html} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {addTonemark} from "../util/pinyin";
import {speak} from '../util/tts';
import {shuffle} from '../util/algo';

class Hanzi {
    constructor(ctx) {
        this.ctx = ctx;
        this.active = false;
        this.guess = -1;
        this.options = [];
        this.rightCard = null;
    }

    __reset() {
        this.guess = -1;
        this.options = [];
        this.rightCard = null;
    }

    onClickHandler(i) {
        // early return
        if(this.active) return;
        this.active = true;

        // speak and move card
        speak(this.rightCard.hanzi);
        let guess = (this.rightCard === this.options[i]);
        this.ctx.review(guess);

        // update guess
        this.guess = i;

        // wait and pick next card
        this.ctx.asyncProgress(() => {
            this.active = false;
        });

        // render result
        this.ctx.render();
    }
    
    __charClass(i, tone) {
        let result = this.__checkAnswer(i);
        if (result === 1) return '';
        else return `tone${tone}`;
    }
    __question(card) {
        return html`
            <question class="small">
                <vpad></vpad>
                <translation>
                    ${card.trans}
                </translation>
                <vpad></vpad>
            </question>
        `
    }
    __checkAnswer(i) {
        if(this.guess < 0) return 0;
        else if(this.options[i] === this.rightCard) return 1;
        else if(i === this.guess) return -1;
        else return 0;
    }
    __buttonClass(i) {
        let result = this.__checkAnswer(i);
        return `${(result === 1) ? "right" : (result === -1) ? "wrong" : ""}`;
    }
    __answer() {
        return html`
            <answer class="vertical">
                ${repeat(
                    this.options,
                    (_, i) => i,
                    (o, i) => html`
                        <button class$=${this.__buttonClass(i)} on-click=${_ => this.onClickHandler(i)}>
                            ${repeat(
                                o.hanzi,
                                (_, j) => j,
                                (h, j) => html`
                                    <span class$=${this.__charClass(i, o.tone[j])}>
                                        ${h}
                                    </span>
                                ` 
                            )}
                        </button>
                    `
                )}
            </answer>
        `;
    }
    next(deck, card) {
        this.__reset();
        let others = deck.getSubset(3, card).cards;
        this.options = [
            card,
            ...others
        ];
        shuffle(this.options);
        this.rightCard = card;
    }
    finish() {
        this.active = false;
    }
    template(deck, card) {
        return html`
            ${this.__question(card)}
            ${this.__answer(deck, card)}
        `;
    }
}

export {Hanzi};