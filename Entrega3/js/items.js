var scene, renderer, camera;
var speedup = 10;
var clock, delta;
var keys = [];
var size = 50;
var plane, sun;
var spotlights = [];
var turnSpotLights = [0, 0, 0, 0], turnSun = 0;

class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
  }
}

function createTriangle(u, v, w, i, geometry){
  geometry.vertices.push(u, v, w);
  geometry.faces.push(new THREE.Face3(i,i+1,i+2));
}

function createSimpleSquare(startX, startY, startZ, geometry){
  var triangle = createTriangle(THREE.Vector3(startX, startY, startZ), THREE.Vector3(startX+15, startY, startZ), THREE.Vector3(startX, startY+15, startZ), 0, geometry);
  var triangle2 = createTriangle(THREE.Vector3(startX+15, startY, startZ), THREE.Vector3(startX, startY+15, startZ), THREE.Vector3(startX+15, startY+15, startZ), 3, geometry);
  return geometry;
}

function createPlane(p, w, h, scene){
  var geometry = new THREE.Geometry();
  for(var i = 0; i < w; i++)
    for(var j = 0; j < h; j++){
      //var triangle = createTriangle(THREE.Vector3(,0,0), THREE.Vector3(i,0,0), THREE.Vector3(0,j,0), geometry);
    }
}

function createSpotlights() {

    spotlights[0] = new spotLight(25, 0, 25);
    spotlights[1] = new spotLight(25, 0, -25);
    spotlights[2] = new spotLight(-25, 0, 25);
    spotlights[3] = new spotLight(-25, 0, -25);

    for(var i = 0; i < 4; i++){
        scene.add(spotlights[i]);
    }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    /*plane = new Plane(0, 0, 0, 4, 10);
    scene.add(plane);*/

    var geometry1 = new THREE.Geometry();
    var shape = createSimpleSquare(0,0,0,geometry1);
    var mesh1 = new THREE.Mesh(shape, new THREE.MeshBasicMaterial());
    scene.add(mesh1);

    sun = new THREE.PointLight( 0xffffff, 2, 100 );
    sun.position.set( 0, 15, 0);
    scene.add(sun);

    createSpotlights();
}

function onResize() {
  'use strict'

  screen = resize_Aux();

  if (window.innerWidth > 0 && window.innerHeight > 0) {
    camera.aspect = screen[0]/screen[1];
    camera.updateProjectionMatrix();
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {
        case 71: //G -> Press to change the plane material
        case 37: //left arrow key
        case 38: //up arrow key
        case 39: //right arrow key
        case 40: //down arrow key
        case 78: //N ->	switch the ambient light
            keys[e.keyCode] = true;
            break;
        case 49: //1 -> switch spotlight[0]
        case 50: //2 -> switch spotlight[1]
        case 51: //3 -> switch spotlight[2]
        case 52: //4 -> switch spotlight[3]
            keys[e.keyCode - 49] = 1;
            break;
    }
}

function render() {
  'use strict';

  delta = clock.getDelta();

  /*if (keys[71]) {
    plane.changeMaterial();
    keys[71] = false;
  }
  if (keys[78]) {
    sun.intensity = sun.intensity == 0 ? 1 : 0;
    keys[78] = false;
  }
  if (keys[37] || keys[39]){
    plane.makeHorizontalMovement( keys[37] ? 1 : -1 , delta);
    keys[37] = false;
    keys[39] = false;
  }
  if (keys[38] || keys[40]){
    plane.makeVerticalMovement( keys[38] ? 1: -1 , delta);
    keys[38] = false;
    keys[40] = false;
  }*/

  for(var i = 0; i < 4; i++){
      if(keys[i]){
          spotlights[i].turnOnOff();
          keys[i] = 0;
      }
  }

  renderer.render(scene, camera);
}

function init() {
  'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();

    createScene();
    createCameras(size);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();
    requestAnimationFrame(animate);
}
