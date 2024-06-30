class BaseLight extends GameComponent {
    constructor(intensity) {
        super();
        this._intensity = intensity;
    }

    get intensity() {
        return this._intensity;
    }

    set intensity(inten) {
        this._intensity = inten;
    }
}

class Attenuation {
    constructor(exponent, linear, constant) {
        this._exponent = exponent;
        this._linear = linear;
        this._constant = constant;
    }

    get exponent() {
        return this._exponent;
    }

    set exponent(expo) {
        this._exponent = expo;
    }

    get linear() {
        return this._linear;
    }

    set linear(lin) {
        this._linear = lin;
    }

    get constant() {
        return this._constant;
    }

    set constant(con) {
        this._constant = con;
    }
}


class DirectionalLight extends BaseLight {
    constructor(intensity, direction) {
        super(intensity);
        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }

    set direction(dir) {
        this._direction = dir;
    }
}


class PointLight extends BaseLight {
    constructor(intensity, attenuation) {
        super(intensity);
        this._attenuation = attenuation;

        var COLOR_DEPTH = 256;

        var a = attenuation.exponent;
        var b = attenuation.linear;
        var c = attenuation.constant - COLOR_DEPTH * intensity;

        this._range = (-b * Math.sqrt(b * b - 4 * a * c)/(2 * a));
    }

    get range() {
        return this._range;
    }

    get attenuation() {
        return this._attenuation;
    }
}

class SpotLight extends PointLight {
    constructor(intensity, attenuation, direction, cutoff) {
        super(intensity, attenuation);
        this._cutoff = cutoff;

        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }

    set direction(dir) {
        this._direction = dir;
    }

    get cutoff() {
        return this._cutoff;
    }

    set cutoff(cut) {
        this._cutoff = cut;
    }
}