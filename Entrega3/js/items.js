var cameraArray, active_camera ,scene, renderer;
var speedup = 10;
var clock, delta;
var keys = [];
var size = 50;
var plane, sun;

class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
  }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    plane = new Plane(0, 0, 0, 4, 10);
    scene.add(plane);

    sun = new THREE.PointLight( 0xffffff, 2, 100 );
    sun.position.set( 15, 15, 15);
    scene.add(sun);
}

function onResize() {
  'use strict'

  screen = resize_Aux();

  if (window.innerWidth > 0 && window.innerHeight > 0) {
    cameraArray[0].aspect = screen[0]/screen[1];
    cameraArray[0].updateProjectionMatrix();
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function resize_Aux() {
    'use strict'

    var aspect = 16/9;
    var scale = window.innerWidth / window.innerHeight;

    if(scale > aspect) {
        var width = scale * 50;
        var height = 50;
    }
    else {
        var width = aspect * 50;
        var height = width / scale;
    }

    return [width, height]
}


function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {
        case 71: //G -> Press to change the plane material
            keys[e.keyCode] = true;
            break;
    }
}

function render() {
  'use strict';

  delta = clock.getDelta();

  if (keys[71]) {
    plane.changeMaterial();
    keys[71] = false;
  }

  renderer.render(scene, cameraArray[active_camera]);
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
    cameraArray = [null];
    active_camera=0;
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
