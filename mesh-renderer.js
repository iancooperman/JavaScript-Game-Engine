class MeshRenderer extends GameComponent {
    // @mesh: whatever is returned from models.js
    // @color: a 3-array of ints from 0-255
    constructor(mesh, color) {
        super();
        // Whatever is returned from models.js
        this._mesh = mesh;
        // [255, 255, 255]
        this._color = color;
    }

    get mesh() {
        return this._mesh;
    }

    get color() {
        return this._color;
    }

    render(renderingEngine) {
        renderingEngine.setAttributes(this);
        renderingEngine.setUniforms(this);
        renderingEngine.draw(this);
    }
}