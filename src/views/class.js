import {html, render} from 'lit-html/lib/lit-extended';
import {get} from '../util/doc';
import {View} from '../core/view';
import {Session} from '../core/session';
import {Tones} from '../units/tones';
import {Translate} from '../units/translate';
import {Hanzi} from '../units/hanzi';
import {CardList} from '../units/cardlist';
import {saveRating} from '../core/rating';
import {style} from '../util/styles';
const colors = style.tones;

class Class extends View {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.parent = get('app');
        this.session = null;
        this.courses = null;
        this.courseMap = {
            TONES       : new Tones(this),
            TRANSLATE   : new Translate(this),
            HANZI       : new Hanzi(this),
            INFO        : new CardList(this)
        }
    }

    
    review(guessedRight) {
        this.session.review(guessedRight);
    }
    asyncProgress(cb) {
        setTimeout(() => {
            if(this.session.hasFinished()) {
                this.finish();
                this.ctx.router.goTo('ChooseDeck');
            } else {
                cb();
                this.next();
                this.render();
            }
        }, 2000);
    }

    __style() {
        return html`
            <style>
                card {
                    display         : flex;
                    flex-direction  : column;
                    align-items     : center;
                    width           : 100%;
                    height          : 100%;
                    padding         : 0;
                    border-radius   : 0;
                    background      : white;
                }
                header {
                    display         : flex;
                    align-items     : center;
                    justify-content : space-between;
                    width           : 100%;
                    height          : 70px;
                    padding         : 0px;
                    padding-left    : 15px;
                    padding-right   : 15px;
                    margin          : 0px;
                    background      : #009688;
                    color           : white;
                    font-size       : 2em;
                    z-index         : 100;
                }
                count {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
                new, right, wrong { 
                    display         : inline-block;
                    width           : 10px; 
                    height          : 10px; 
                    border-radius   : 100%; 
                    margin-right    : 5px;
                }
                new   { background: #00bcd4; }
                right { background: #4caf50; }
                wrong { background: #f44336; }
                header button {
                    border      : solid 1px white;
                    color       : white;
                    background  : none;
                    padding     : 5px;
                    border-radius : 15px;
                }
                question {
                    display         : flex;
                    width           : 100%;
                    height          : calc(100% - 70px);
                    flex-direction  : column;
                    align-items     : center;
                    justify-content : center;
                }
                question.small {
                    height: calc(100% - 200px);
                }
                character {
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    font-size: 5em;
                }
                character span {
                    position: relative;
                }
                character span.cur {
                    border-bottom: solid 1px black;
                }
                character span state {
                    display: inline-block;
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    right: 0;
                    top : 0;
                }
                character span state.s2 { background: red;   }
                answer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    height: 70px;
                    width: 100%;
                }
                answer button {
                    background    : none;
                    width         : 100%;
                    padding       : 5px;
                    border-radius : 0;
                    border        : 1px solid gray;
                    font-size     : 1.2em;
                }
                answer.vertical {
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    height: 200px;
                }
                answer.vertical button {
                    width: calc(100% - 10px);
                }
                vpad { height: 100%; }
                translation {
                    height: 100%;
                    padding: 5px;
                    font-size: 2em;
                }
                button:focus { outline: 0; }
                .tone1 { border-color: ${colors[0]}; color: ${colors[0]}; }
                .tone2 { border-color: ${colors[1]}; color: ${colors[1]}; }
                .tone3 { border-color: ${colors[2]}; color: ${colors[2]}; }
                .tone4 { border-color: ${colors[3]}; color: ${colors[3]}; }
                .tone5 { border-color: ${colors[4]}; color: ${colors[4]}; }
                answer button.tone1 { background: ${colors[0]}; color: white; }
                answer button.tone2 { background: ${colors[1]}; color: white; }
                answer button.tone3 { background: ${colors[2]}; color: white; }
                answer button.tone4 { background: ${colors[3]}; color: white; }
                answer button.tone5 { background: ${colors[4]}; color: white; }
                answer button.right { background: #4caf50; border-color: #4caf50; color: white; }
                answer button.wrong { background: #f44336; border-color: #f44336; color: white; }

                listview { 
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                }
                listview listitem {
                    width: 100%;
                    height: auto;
                    padding: 10px;
                    border: 1px solid gray;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                listview character {
                    height: auto;
                    font-size: 1em;
                    justify-content: flex-start;
                }
                rating {color: orangered;}
                rating.r0  {color: rgb(255, 0, 0);}
                rating.r1  {color: rgb(255, 60, 0);}
                rating.r2  {color: rgb(255, 120, 0);}
                rating.r3  {color: rgb(255, 180, 0);}
                rating.r4  {color: rgb(255, 240, 0);}
                rating.r5  {color: rgb(210, 255, 0);}
                rating.r6  {color: rgb(150, 255, 0);}
                rating.r7  {color: rgb(89, 255, 0);}
                rating.r8  {color: rgb(29, 255, 0);}
                rating.r9  {color: rgb(0, 255, 31);}
                rating.r10 {color: rgb(0, 255, 91);}

                .hidepinyin {
                    color: white;
                    border: 1px gray dashed;
                    border-radius: 5px;
                }
            </style>
        `
    }
    __header() {
        let newCount   = this.session.getNewCardsCount();
        let rightCount = this.session.getRightCardsCount();
        let wrongCount = this.session.getWrongCardsCount();
        return html`
            <header>
                <span>Course</span>
                <count>
                    <new></new>
                    ${newCount}
                </count>
                <count>
                    <right></right>
                    ${rightCount}
                </count>
                <count>
                    <wrong></wrong>
                    ${wrongCount}
                </count>
                <button on-click=${_ => this.goBack()}>back</button>
            </header>
        `
    }
    onActive() {
        this.session = new Session(this.ctx.deck);
        this.courses = this.ctx.course.units.map(u => this.courseMap[u]);
        this.currentCourse  = this.courses[0];
        this.next();
    }
    next() {
        this.session.advance();
        let deck = this.session.getDeck();
        let card = this.session.getCard();

        let courseIndex = Math.floor(Math.random()*this.courses.length);
        this.currentCourse = this.courses[courseIndex];
        this.currentCourse.next(deck, card);
    }
    finish() {
        this.currentCourse.finish();
        saveRating(this.session.getDeck());
    }
    render() {
        let deck = this.session.getDeck();
        let card = this.session.getCard();
        
        render(
            html`
                ${this.__style()}
                <card>
                    ${this.__header()}
                    ${this.currentCourse.template(deck, card)}
                </card>
            `,
            this.parent
        );
    }
    goBack() {
        this.currentCourse.finish();
        saveRating(this.session.getDeck());
        this.ctx.router.goTo('ChooseDeck');
    }
}

export {Class};