class GameComponent {
    constructor() {
        this._gameObject = null;
    }

    set gameObject(par) {
        this._gameObject = par;
    }

    get gameObject() {
        return this._gameObject;
    }

    get transform() {
        return this.gameObject.transform;
    }

    update() {}

    render(renderingEngine) {}
}