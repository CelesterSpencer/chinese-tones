import {html, render} from 'lit-html/lib/lit-extended';
import {get} from '../util/doc';
import parser from '../../res/grammar.pegjs';

class DeckImport {
    constructor(proceed) {
        this.parent = get('app');
        this.proceed = proceed;
        this.deck = null;
    }

    onDropHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        let reader = new FileReader();
        reader.onload = (fe) => {
            console.log(file);
            let vals = fe.target.result.split('\n');
            let cards  = vals.map((v) => parser.parse(v));
            this.deck = {
                name: file.name,
                cards: cards
            }
            //this.proceed(cards);
            this.render();
        }
        reader.readAsText(file);
    }
    onDragOverHandler(e) {
        e.preventDefault();
    }

    __style() {
        return html`
            <style>
                card {
                    display         : flex;
                    flex-direction  : column;
                    align-items     : center;
                    width           : 100%;
                    padding         : 10px;
                    border-radius   : 15px;
                    background      : white;
                }
                dropfield {
                    display         : flex;
                    flex-direction  : column;
                    align-items     : center;
                    justify-content : center;
                    width           : 100px;
                    height          : 100px;
                    border          : dashed 1px black;
                }
                dropfield:hover {
                    border-color: red;
                }
            </style>
        `
    }

    __debug() {
        return html`
            <debug>
                ${JSON.stringify(this.deck)}
            </debug>
        `
    }
    render() {
        render(
            html`
                ${this.__style()}
                <card>
                    <dropfield on-drop=${e => this.onDropHandler(e)} on-dragover=${e => this.onDragOverHandler(e)}>
                        drop a deck
                    </dropfield>
                </card>
                ${this.__debug()}
            `,
            this.parent
        );
    }
}

export {DeckImport}