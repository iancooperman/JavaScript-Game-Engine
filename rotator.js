class Rotator extends GameComponent {
    constructor(axis, radians) {
        super();
        this._axis = axis;
        this._radians = radians;
    }

    update() {
        this.gameObject.transform.rotate(this._axis, this._radians);
    }
}