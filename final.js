var radians = Transform.degToRad;

var renderingEngine;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTree() {
    var tree = new GameObject();
    tree.addComponent(new MeshRenderer(uvCylinder(0.1, 0.2), [29, 30, 0]));
    // tree1.transform.translate(0.3, 0.15, 0);
    tree.transform.rotate("x", radians(90));

    treeBrush = new GameObject();
    treeBrush.addComponent(new MeshRenderer(uvCone(), [7, 56, 22]));
    treeBrush.transform.translate(0, 0, -0.4);
    treeBrush.transform.scale(0.5, 0.5, 0.6);
    treeBrush.transform.rotate("x", radians(180));

    tree.addChild(treeBrush);

    return tree;
}

function createWheelRim() {
    var rim = new GameObject();
    rim.addComponent(new MeshRenderer(uvCylinder(0.07, 0.35), [150, 150, 150]));

    rim.transform.rotate("y", radians(90));


    return rim;
}

function createWheel() {
    var wheel = new GameObject();
    wheel.addComponent(new MeshRenderer(uvTorus(0.5, 0.3), [50, 50, 50]));
    wheel.transform.scale(0.33, 1, 1);

    var rim1 = createWheelRim();
    rim1.transform.translate(-0.15, 0, 0);
    wheel.addChild(rim1);

    var rim2 = createWheelRim();
    rim2.transform.translate(0.15, 0, 0);
    wheel.addChild(rim2);

    var rim3 = createWheelRim();
    rim3.transform.translate(0.1, 0.25, 0);
    rim3.transform.rotate("y", radians(60));
    rim3.transform.rotate("x", radians(90));
    wheel.addChild(rim3);

    var rim4 = createWheelRim();
    rim4.transform.rotate("y", radians(-60));
    rim4.transform.rotate("x", radians(90));
    rim4.transform.translate(0.1, -0.25, 0);
    wheel.addChild(rim4);

    var rim5 = createWheelRim();
    rim5.transform.rotate("y", radians(60));
    rim5.transform.rotate("x", radians(90));
    rim5.transform.translate(-0.1, -0.25, 0);
    wheel.addChild(rim5);

    var rim6 = createWheelRim();
    rim6.transform.rotate("y", radians(-60));
    rim6.transform.rotate("x", radians(90));
    rim6.transform.translate(-0.1, 0.25, 0);
    wheel.addChild(rim6);



    return wheel;
}

async function startup() {
    // Initialize RenderingEngine
    renderingEngine = new RenderingEngine("gl-canvas");

    // Camera
    var camera = new GameObject();
    camera.addComponent(new Camera());
    renderingEngine.addCamera(camera);
    camera.transform.translate(0, -1.5, -12);
    camera.transform.rotate("x", radians(10));

    // grass
    var grass = new GameObject();
    grass.addComponent(new MeshRenderer(ring(0, 3, 100), [0, 79, 15]));
    grass.transform.rotate("x", radians(90));

    // road ring
    var roadRing = new GameObject();
    roadRing.addComponent(new MeshRenderer(ring(1.5, 2.5, 100), [100, 100, 100]));
    roadRing.transform.translate(0, 0.0001, 0);
    roadRing.transform.rotate("x", radians(90));


    // scene Base
    var sceneBase = new GameObject();
    sceneBase.addComponent(new MeshRenderer(uvCylinder(3, 0.5, 100), [0, 79, 15]));
    sceneBase.transform.translate(0, -0.3, 0);
    sceneBase.transform.rotate("x", radians(90));

    // Trees
    var tree1 = createTree();
    tree1.transform.translate(1, 0.1, 0);

    var tree2 = createTree();
    tree2.transform.translate(-1.2, 0.1, 2.5);

    var tree3 = createTree();
    tree3.transform.translate(-0.8, 0.1, -0.8);

    var tree4 = createTree();
    tree4.transform.translate(-0.4, 0.1, 0.8);

    var tree5 = createTree();
    tree5.transform.translate(-2.6, 0.1, -1);


    // Light Pole
    var lightPole = new GameObject();
    lightPole.addComponent(new MeshRenderer(uvCylinder(0.05, 0.5), [53, 53, 53]));
    lightPole.transform.translate(0, 0.3, 0);
    lightPole.transform.rotate("x", radians(90));

    var lightGrill = new GameObject();
    lightPole.addChild(lightGrill);
    lightGrill.addComponent(new MeshRenderer(uvSphere(0.08), [40, 40, 40]));
    lightGrill.transform.translate(0, 0, -0.3);

    var lampLight = new GameObject();
    // lampLight.addComponent(new MeshRenderer(cube(), [255, 255, 255]));
    lampLight.addComponent(new PointLight(10, new Attenuation(1, 1, 1)));
    lightGrill.addChild(lampLight);
    lampLight.transform.translate(0, -5, 0);

    renderingEngine.addCenterLight(lampLight);


    // Car
    var carRotationBase = new GameObject();

    var carBase = new GameObject();
    carRotationBase.addChild(carBase);
    carBase.addComponent(new MeshRenderer(cube(), [175, 0, ,0]));
    carBase.transform.translate(0, 0.2, 2);
    carBase.transform.scale(0.7, 0.2, 0.5);

    var carTop = new GameObject();
    carBase.addChild(carTop);
    carTop.addComponent(new MeshRenderer(cube(), [175, 0, 0]));
    carTop.transform.translate(0, 1, 0);
    carTop.transform.scale(0.66, 1, 0.95);

    // carHeadlight1 = new GameObject();
    // carBase.addChild(carHeadlight1);
    // carHeadlight1.addComponent(new MeshRenderer(uvCylinder(), [100, 100, 100]));

    var carWheel1 = createWheel();
    carWheel1.addComponent(new Rotator("z", radians(-3)));
    carBase.addChild(carWheel1);
    carWheel1.transform.translate(0.3, -0.2, 0.55);

    var carWheel2 = createWheel();
    carWheel2.addComponent(new Rotator("z", radians(-3)));
    carBase.addChild(carWheel2);
    carWheel2.transform.translate(-0.3, -0.2, 0.55);

    var carWheel3 = createWheel();
    carWheel3.addComponent(new Rotator("z", radians(-3)));
    carBase.addChild(carWheel3);
    carWheel3.transform.translate(-0.3, -0.2, -0.55);

    var carWheel4 = createWheel();
    carWheel4.addComponent(new Rotator("z", radians(-3)));
    carBase.addChild(carWheel4);
    carWheel4.transform.translate(0.3, -0.2, -0.55);

    carRotationBase.addComponent(new Rotator("y", radians(1)));

    // Sun
    var sunRotationBase = new GameObject();
    sunRotationBase.addComponent(new Rotator("z", radians(0.25)));
    // sunRotationBase.transform.rotate("y", radians(-30));

    var sun = new GameObject();
    sunRotationBase.addChild(sun);
    sun.addComponent(new MeshRenderer(uvSphere(), [252, 151, 0]));
    sun.transform.translate(-4, 0, 0);

    // add gameObjects to scene, top-level GameObjects only
    renderingEngine.addToSceneGraph(roadRing);
    renderingEngine.addToSceneGraph(camera);
    renderingEngine.addToSceneGraph(sceneBase);
    renderingEngine.addToSceneGraph(grass);
    renderingEngine.addToSceneGraph(tree1);
    renderingEngine.addToSceneGraph(tree2);
    renderingEngine.addToSceneGraph(tree3);
    renderingEngine.addToSceneGraph(tree4);
    renderingEngine.addToSceneGraph(tree5);
    renderingEngine.addToSceneGraph(lightPole);
    renderingEngine.addToSceneGraph(carRotationBase);
    renderingEngine.addToSceneGraph(sunRotationBase);

    // Lights

    // Start animation
    requestAnimationFrame(draw);
}

function draw() {
    var animationBox = document.getElementById("animationBox");

    if (animationBox.checked) {
        renderingEngine.update();
        renderingEngine.render();
    }


    requestAnimationFrame(draw);
}