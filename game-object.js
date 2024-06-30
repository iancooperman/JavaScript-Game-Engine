class GameObject {
    constructor() {
        // Array of GameObjects
        this._children = [];

        // Array of GameComponents
        this._components = [];
        this._transform = new Transform();
        this._engine = null;


    }



    addChild(child) {
        this._children.push(child);
        child.engine = this._engine;
        child.transform.parent = this._transform;
    }

    addComponent(component) {
        component.gameObject = this;
        this._components.push(component);
    }

    updateAll() {
        this.update();
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].updateAll();
        }
    }

    renderAll(renderingEngine) {
        this.render(renderingEngine);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].renderAll(renderingEngine);
        }
    }

    update() {
        for (var i = 0; i < this._components.length; i++) {
            this._components[i].update();
        }
    }

    render(renderingEngine) {
        for (var i = 0; i < this._components.length; i++) {
            this._components[i].render(renderingEngine);
        }
    }

    draw(count, offset) {
        this._gl.drawElements(this._gl.TRIANGLES, count, this._gl.UNSIGNED_SHORT, offset);
    }


    get transform() {
        return this._transform;
    }

    set engine(eng) {
        this._engine = eng;
    }
}