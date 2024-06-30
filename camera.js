class Camera extends GameComponent {
    constructor() {
        super();
    }

    get viewProjection() {
        var view = this.transform.transformation;

        var projection = mat4.create();
        var projection = mat4.perspective(projection, Math.PI / 5, 1, 1, 100);

        var finalMatrix = mat4.create();

        mat4.multiply(finalMatrix, projection, view);

        return finalMatrix;
    }
}