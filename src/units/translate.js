import {html} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {addTonemark} from "../util/pinyin";
import {speak} from '../util/tts';
import {shuffle} from '../util/algo';

class Translate {
    constructor(ctx) {
        this.ctx = ctx;
        this.active = false;
        this.guess = -1;
        this.options = [];
        this.rightCard = null;
        this.showPinyin = false;
    }

    __reset() {
        this.guess = -1;
        this.options = [];
        this.rightCard = null;
        this.showPinyin = false;
    }

    __revealPinyin() {
        this.showPinyin = true;
        this.ctx.render();
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

        this.ctx.render();
    }
    
    __charClass(tone) {
        return `tone${tone}`;
    }
    __pinyinClass(showPinyin) {
        return (showPinyin) ? `` : `hidepinyin`;
    }
    __question(card) {
        return html`
            <question class="small">
                <vpad></vpad>
                <character>
                    ${repeat(
                        card.hanzi,
                        (_, i) => i,
                        (h, i) => html`
                            <span class$=${this.__charClass(card.tone[i])}>
                                ${h}
                            </span>
                        ` 
                    )}
                </character>
                <pinyin class$=${this.__pinyinClass(this.showPinyin)} on-click=${_ => this.__revealPinyin()}>
                    ${card.pinyin.map((p,i) => addTonemark(p, card.tone[i])).join(' ')}
                </pinyin>
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
                            ${o.trans}
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

export {Translate};