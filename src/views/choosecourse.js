import {html, render} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {get} from '../util/doc';
import {View} from '../core/view';
import {Course} from '../core/course';
// images
import translateIcon from '../../res/images/hanzi-eng.png';
import hanziIcon from '../../res/images/eng-hanzi.png';
import tonesIcon from '../../res/images/tones.png';
import infoIcon from '../../res/images/info.png';

// courses
const courses = [
    //new Course('Mix',       ['TONES', 'TRANSLATE', 'HANZI']),
    new Course('Translate', ['TRANSLATE'], translateIcon),
    new Course('Hanzi'    , ['HANZI']    , hanziIcon),
    new Course('Tones'    , ['TONES']    , tonesIcon),
    new Course('Info'     , ['INFO']     , infoIcon)
];

class ChooseCourse extends View {
    constructor(ctx) {
        super();
        this.parent = get('app');
        this.ctx = ctx;
    }

    onClickHandler(i) {
        this.ctx.course = courses[i];
        this.ctx.router.goTo('Class');
    }

    __style() {
        return html`
            <style>
                card {
                    display         : flex;
                    flex-direction  : column;
                    align-items     : center;
                    justify-content : center;
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
                card row {
                    display: flex;
                    flex-direction: row;
                }
                card button {
                    display: inline block;
                    width           : 110px;
                    height          : 110px;
                    margin          : 5px;
                    border-radius   : 100%;
                    background      : white;
                    box-shadow      : 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
                    z-index         : 1;
                }
                img {
                    height: auto; 
                    width: auto; 
                    max-width: 60px; 
                    max-height: 60px;
                }
            </style>
        `
    }

    render() {
        render(
            html`
                ${this.__style()}
                <header>Courses</header>
                <card>
                    <row>
                        <button on-click=${_ => this.onClickHandler(0)}>
                            ${courses[0].img}
                        </button>
                        <button on-click=${_ => this.onClickHandler(1)}>
                            ${courses[1].img}
                        </button>
                    </row>
                    <row>
                        <button on-click=${_ => this.onClickHandler(2)}>
                            ${courses[2].img}
                        </button>
                        <button on-click=${_ => this.onClickHandler(3)}>
                            ${courses[3].img}
                        </button>
                    </row>
                </card>
            `,
            this.parent
        );
    }
}

export {ChooseCourse}