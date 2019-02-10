import {html} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {addTonemark} from "../util/pinyin";
import {speak} from '../util/tts';
import {style} from '../util/styles';

// grab color of the tones
const colors = style.tones;

class Tones {
    constructor(ctx) {
        this.ctx = ctx;

        // feedback and character order
        this.__reset();
    }
    __reset() {
        this.pidx = 0;
        this.tones = [];
        this.states = [];
        this.active = false;
        this.guessedRight = true;
    }
    onClickHandler(card, i) {
        // early return
        if(this.active) return;

        // color current hanzi
        this.tones[this.pidx] = card.tone[this.pidx];

        // check if the guess is right
        let guess = (card.tone[this.pidx] == i+1) ? 1 : 2;
        this.states[this.pidx] = guess;
        this.guessedRight = this.guessedRight && (guess === 1);
        
        if(this.pidx+1 >= card.hanzi.length) {
            // disable interaction until timeout finished
            this.active = true;

            // speak and move card
            speak(card.hanzi);
            this.ctx.review(this.guessedRight);

            // wait and pick next card
            this.ctx.asyncProgress(() => {
                this.__reset();
            });
        } else {
            this.pidx++;
        }
        this.ctx.render();
    }
    __charClass(i) {
        return `
            tone${(this.tones[i]) ? this.tones[i] : 0} ${(i === this.pidx) ? "cur" : ""}
        `
    }
    __hanzi(hs, trans) {
        return html`
            <question>
                <vpad></vpad>
                <character>
                    ${repeat(
                        hs,
                        (_, i) => i,
                        (h, i) => html`
                            <span class$=${this.__charClass(i)}>
                                ${h}
                                <state class$=s${(this.states[i]) ? this.states[i] : 0}></state>
                            </span>
                        ` 
                    )}
                </character>
                <translation>
                    ${trans}
                </translation>
            </question>
        `
    }
    __pinyin(card, p) {
        return html`
            <answer>
                ${repeat(
                    colors,
                    (c, i) => i,
                    (c, i) => html`
                        <button class$=tone${i+1} on-click=${_ => this.onClickHandler(card, i)}>
                            ${addTonemark(p, i+1)}
                        </button>
                    `
                )}
            </answer>
        `;
    }
    next() {}
    finish() {
        this.__reset();
    }
    template(_, card) {
        return html`
            ${this.__hanzi(card.hanzi, card.trans)}
            ${this.__pinyin(card, card.pinyin[this.pidx])}
        `;
    }
}

export {Tones};