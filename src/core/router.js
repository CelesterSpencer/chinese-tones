class Router {
    constructor() {
        this.routes = {};
    }

    addRoute(id, view) {
        this.routes[id] = view;
    }
    goTo(id) {
        this.routes[id].onActive();
        this.routes[id].render();
    }
}

export {Router}