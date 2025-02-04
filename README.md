<p align="center">
  <a href="" rel="noopener">
</p>

<h3 align="center">JavaScript Game Engine</h3>

<div align="center">

  ![Static Badge](https://img.shields.io/badge/status-inactive-green)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>


## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
1. **Learn the basics of 3D rendering/WebGL**: WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins1. WebGL programs consist of control code written in JavaScript and shader code that is executed on a computer’s Graphics Processing Unit (GPU)12. This project was an opportunity to delve into the basics of WebGL and understand how to use it for 3D rendering.

2. **Implement a basic scene graph structure, like that seen in Unity**: Scene graphs are a general data structure commonly used by vector-based graphics editing applications and modern computer games, which arranges the logical and often spatial representation of a graphical scene3. They consist of a number of scene nodes, kept together in a tree-like structure - each node has a parent node, and a number of child nodes4. This project aimed to implement a similar structure.

The core of this engine starts with `GameObject`, a class that represent a single object within the scene. Each `GameObject` houses a collection of `GameComponent`s, which define the behavior of the object (e.g. movement). `GameComponent`s are the functional pieces of every `GameObject`. They contain properties which you can edit to define the behavior of a `GameObject`.

For more information on scene graphs, [this video](https://www.youtube.com/watch?v=rXoGR5pobG4) would be a good place to start. [This article](https://webglfundamentals.org/webgl/lessons/webgl-scene-graph.html) on [webglfundamentals.org](https://webglfundamentals.org) is also great if you're more familiar with matrix math.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
None! This was all done in vanilla JavaScript!

### Installing
1. Download the repo onto your computer.
2. Open `index.html` in your browser.
3. You should see a page similar to the demo page linked above.

![image](https://github.com/iancooperman/JavaScript-Game-Engine/assets/34320199/f7e035b7-a01f-4a6e-a46f-e736cb6683d6)

## 🎈 Usage <a name="usage"></a>

### Boilerplate
I would highly recommend just using the included `index.html` as boilerplate, but if you're daring enough, you can include all the relevant scripts in your own HTML file.
```HTML
<!-- Scripts -->
<script src="models.js"></script>
<script src="transform.js"></script>
<script src="gl-matrix-min.js"></script>
<script src="webgl-utils.js"></script>
<script src="render-utils.js"></script>
<script src="game-component.js"></script>
<script src="lights.js"></script>
<script src="rotator.js"></script>
<script src="camera.js"></script>
<script src="mesh-renderer.js"></script>
<script src="game-object.js"></script>
<script src="rendering-engine.js"></script>
<script src="final.js"></script>

<script id="vertex-shader" type="nonjs">

attribute vec3 a_position;
attribute vec3 a_normal;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewProjectionMatrix;
uniform vec3 u_color;

// lighting
uniform vec3 u_lampLightPosition;

varying vec3 v_color;
varying vec3 v_normal;
varying vec3 v_surfaceToLampLight;

void main() {
	v_color = u_color;
	v_normal = (u_modelMatrix * vec4(a_normal, 0.0)).xyz;
	// v_normal = a_normal;

	vec4 transformedSurfacePosition = u_modelMatrix * vec4(a_position, 1.0);

	v_surfaceToLampLight = u_lampLightPosition - transformedSurfacePosition.xyz;

	gl_Position = u_viewProjectionMatrix * transformedSurfacePosition;
}

</script>

<script id="fragment-shader" type="nonjs">

precision mediump float;

varying vec3 v_color;
varying vec3 v_normal;
varying vec3 v_surfaceToLampLight;

void main() {
	float lampLightDot = dot(normalize(v_normal), normalize(v_surfaceToLampLight));
	float lampLightResultX = v_color.x/255.0 * max(lampLightDot, 0.0);
	float lampLightResultY = v_color.y/255.0 * max(lampLightDot, 0.0);
	float lampLightResultZ = v_color.z/255.0 * max(lampLightDot, 0.0);


	// gl_FragColor = vec4(0.0, 0.0, lampLightDot, 1.0);
	// gl_FragColor = 10.0 * vec4(lampLightResultX, lampLightResultY, lampLightResultZ, 1.0);

	// uncomment for fullbright
	gl_FragColor = vec4(v_color.xyz/255.0, 1.0);
}

</script>
```

Be sure to include a canvas to draw to somewhere within your webpage.
```HTML
<canvas id="gl-canvas" width="800" height="800"></canvas>
```

From there, you'll need to initialize some core objects, including the rendering engine, camera, and scene root, in another script.
```JS
renderingEngine = new RenderingEngine("gl-canvas");

  // Camera
  var camera = new GameObject();
  camera.addComponent(new Camera());
  renderingEngine.addCamera(camera);
  camera.transform.translate(0, -1.5, -12);
  camera.transform.rotate("x", radians(10));

  // scene Base
  var sceneBase = new GameObject();
```

If you're familiar with Unity at all, the rest is pretty straight-forward. This example from `final.js` demonstrates how a tree-like model can be instantiated and rendered.
```JS
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

renderingEngine.addToSceneGraph(tree);
```

## 🚀 Deployment <a name = "deployment"></a>
The demo scene is simply being hosted through GitHub Pages, which is reliant on there being a file named `index.html` in your repository.

## ⛏️ Built Using <a name = "built_using"></a>
- [webgl-utils.js, by Google]() - Various utility functions for WebGL
- [glMatrix](https://glmatrix.net), by [@toji](https://github.com/toji) and [@sinisterchipmunk](https://github.com/sinisterchipmunk) - High-performance matrix math library
- models.js by [Shuang Zhao](https://shuangz.com)? - Library for instantiating basic 3d shapes

## ✍️ Authors <a name = "authors"></a>
- [@iancooperman](https://github.com/iancooperman) - Implementation

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- [@BennyQBD](https://github.com/BennyQBD)'s [YouTube tutorials](https://youtu.be/L19dBX53M5M?list=PLEETnX-uPtBXP_B2yupUKlflXBznWIlL5) on making a Java-based 3d engine were a major source of inspiration for my own engine's structure.
- [webglfundamentals.org](https://webglfundamentals.org)
