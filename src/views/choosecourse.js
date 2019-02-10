import {html, render} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import {get} from '../util/doc';
import {View} from '../core/view';
import {Course} from '../core/course';

// courses
const courses = [
    //new Course('Mix',       ['TONES', 'TRANSLATE', 'HANZI']),
    new Course('Translate', ['TRANSLATE']         ),
    new Course('Hanzi',     ['HANZI']             ),
    new Course('Tones',     ['TONES']             ),
    new Course('Info',      ['INFO']             )
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
                    justify-content : flex-start;
                    height          : 100%;
                    width           : 100%;
                    background      : gray;
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
                    background      : #009688;
                    color           : white;
                    font-size       : 2em;
                    z-index         : 100;
                }
                card button {
                    display         : flex;
                    flex-direction  : row;
                    align-items     : center;
                    justify-content : space-between;
                    border          : none;
                    padding         : 5px;
                    padding-left    : 15px;
                    padding-right   : 15px;
                    margin-bottom   : 5px;
                    width           : 95%;
                    height          : 70px;
                    background      : white;
                    border-bottom   : solid 1px gray; 
                    font-size       : 1.2em;
                    z-index         : 1;
                }
            </style>
        `
    }

    render() {
        render(
            html`
                ${this.__style()}
                <header>Choose a course</header>
                <card>
                    ${repeat(
                        courses,
                        (_, i) => i,
                        (c, i) => html`
                            <button on-click=${_ => this.onClickHandler(i)}>
                                <span>${c.name}</span>
                            </button>
                        `
                    )}
                </card>
            `,
            this.parent
        );
    }
}

export {ChooseCourse}