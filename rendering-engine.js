class RenderingEngine {
    constructor(canvasID) {
        this._gl = RenderUtils.initializeCanvas(canvasID);

        this._gl.enable(this._gl.DEPTH_TEST);

        var vertexShaderSource = document.getElementById("vertex-shader").text;
        var fragmentShaderSource = document.getElementById("fragment-shader").text;

        var vertexShader = RenderUtils.createShader(this._gl, this._gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = RenderUtils.createShader(this._gl, this._gl.FRAGMENT_SHADER, fragmentShaderSource);

        this._program = RenderUtils.createProgram(this._gl, vertexShader, fragmentShader);

        this._root = new GameObject();

        this.getShaderVariableLocations();
    }

    getShaderVariableLocations() {
        this._a_position = this._gl.getAttribLocation(this._program, "a_position");
        this._u_modelMatrix = this._gl.getUniformLocation(this._program, "u_modelMatrix");
        this._u_viewProjectionMatrix = this._gl.getUniformLocation(this._program, "u_viewProjectionMatrix");
        this._u_color = this._gl.getUniformLocation(this._program, "u_color");
        this._u_lampLightPosition = this._gl.getUniformLocation(this._program, "u_lampLightPosiiton");

        this._a_normal = this._gl.getAttribLocation(this._program, "a_normal");
    }

    setUniforms(meshRenderer) {

        this._gl.uniform3f(this._u_color, meshRenderer.color[0], meshRenderer.color[1], meshRenderer.color[2]);

        var modelMatrix = meshRenderer.gameObject.transform.transformation;
        var viewProjectionMatrix = this._camera._components[0].viewProjection;

        this._gl.uniformMatrix4fv(this._u_modelMatrix, false, modelMatrix);
        this._gl.uniformMatrix4fv(this._u_viewProjectionMatrix, false, viewProjectionMatrix);

        var lampLightPosition = this._centerLight.transform.transformedPos;
        // console.log(lampLightPosition);

        this._gl.uniform3f(this._u_lampLightPosition, lampLightPosition[0], lampLightPosition[1], lampLightPosition[2]);
    }

    setAttributes(meshRenderer) {
        var size = 3;
        var type = this._gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;


        // vertex buffer
        var positionBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, positionBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, meshRenderer.mesh.vertexPositions, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(this._a_position, size, type, normalize, stride, offset);
        this._gl.enableVertexAttribArray(this._a_position);

        // normal buffer
        var normalBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, normalBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, meshRenderer.mesh.vertexNormals, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(this._a_normal, size, type, normalize, stride, offset);
        this._gl.enableVertexAttribArray(this._a_normal);


        // index buffer
        var indexBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, meshRenderer.mesh.indices, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    addCamera(cameraGameObject) {
        this._camera = cameraGameObject;
    }

    addToSceneGraph(gameObject) {
        this._root.addChild(gameObject);
    }

    render() {
        this._gl.useProgram(this._program);
        RenderUtils.clearCanvas(this._gl);

        this._root.renderAll(this);
    }

    draw(meshRenderer) {
        var primitiveType = this._gl.TRIANGLES;
        var offset = 0;
        var count = meshRenderer.mesh.indices.length;
        var indexType = this._gl.UNSIGNED_SHORT;

        this._gl.drawElements(primitiveType, count, indexType, offset);
    }

    update() {
        this._root.updateAll();
    }

    // Not best practice, but this should work
    addSunLight(gameObject) {
        this._sunLight = gameObject;
    }

    addLeftHeadLight(gameObject) {
        this._leftHeadLight = gameObject;
    }

    addRightHeadLight(gameObject) {
        this._rightHeadLight = gameObject;
    }

    addCenterLight(gameObject) {
        this._centerLight = gameObject;
    }
}