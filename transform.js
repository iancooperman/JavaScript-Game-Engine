class Transform {
    constructor() {
        this._parent = null;
        this._parentMatrix = mat4.create();

        this._pos = vec3.fromValues(0.0, 0.0, 0.0);
        this._rot = vec3.fromValues(0.0, 0.0, 0.0);
        this._scale = vec3.fromValues(1.0, 1.0, 1.0);
    }

    update() {

    }

    translate(x, y, z) {
        vec3.add(this.pos, this.pos, vec3.fromValues(x, y, z));
    }

    rotate(axis, angle) {
        if (axis === "x") {
            vec3.add(this.rot, this.rot, vec3.fromValues(angle, 0, 0));
        }
        else if (axis === "y") {
            vec3.add(this.rot, this.rot, vec3.fromValues(0, angle, 0));
        }
        else if (axis === "z") {
            vec3.add(this.rot, this.rot, vec3.fromValues(0, 0, angle));
        }
    }

    scale(x, y, z) {
        this.sca[0] *= x;
        this.sca[1] *= y;
        this.sca[2] *= z;
    }

    lookAt(point, up) {

    }

    lookAtRotation(point, up) {

    }

    get transformation() {
        var transformationMatrix = mat4.create();
        mat4.translate(transformationMatrix, transformationMatrix, [this.pos[0], this.pos[1], this.pos[2]]);
        mat4.scale(transformationMatrix, transformationMatrix, [this.sca[0], this.sca[1], this.sca[2]]);
        mat4.rotateX(transformationMatrix, transformationMatrix, this.rot[0]);
        mat4.rotateY(transformationMatrix, transformationMatrix, this.rot[1]);
        mat4.rotateZ(transformationMatrix, transformationMatrix, this.rot[2]);

        var totalTransformationMatrix = mat4.create();
        mat4.multiply(totalTransformationMatrix, this.parentMatrix, transformationMatrix);

        return totalTransformationMatrix;
    }

    get parentMatrix() {
        if (this._parent != null) {
            this._parentMatrix = this._parent.transformation;
        }

        return this._parentMatrix;
    }

    set parent(par) {
        this._parent = par;
    }

    get transformedPos() {
        if (this._parent != null) {
            return [this._parent.pos[0] + this.pos[0], this._parent.pos[1] + this.pos[1], this._parent.pos[2] + this.pos[2]];
        }
    }

    get pos() {
        return this._pos;
    }

    set pos(p) {
        this._pos = p;
    }

    get rot() {
        return this._rot;
    }

    set rot(rotation) {
        this._rot = rotation;
    }

    get sca() {
        return this._scale;
    }

    set sca(sca) {
        this._scale = sca;
    }

    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }
}