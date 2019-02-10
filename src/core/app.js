import {Router} from './router';
import {ChooseDeck} from '../views/choosedeck';
import {Class} from '../views/class';
import { ChooseCourse } from '../views/choosecourse';

class App {
    constructor() {
        // context
        this.ctx = {};
        
        // set routes
        let router = new Router();
        router.addRoute('ChooseDeck', new ChooseDeck(this.ctx));
        router.addRoute('ChooseCourse', new ChooseCourse(this.ctx));
        router.addRoute('Class', new Class(this.ctx));

        // setup context
        this.ctx.router     = router;
        this.ctx.course     = [];
        this.ctx.deck       = null;
        this.ctx.session    = null;
    }

    run() {
        this.ctx.router.goTo('ChooseDeck');
    }
}

export {App}