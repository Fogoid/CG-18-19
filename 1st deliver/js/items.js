var cameraArray, active_camera ,scene, renderer;
var geometry, material, mesh;
var table, chair, lamp;
var clock;
var keys = [];
var wireframe_flag = true;

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

    table = new Table(0, 0, 0);
    chair = new Chair(0, 0, 17);
    lamp = new Lamp(30, 0, 0);

    scene.add(table);
    scene.add(chair);
    scene.add(lamp);

}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        updateCamera(cameraArray[0])
        updateCamera(cameraArray[1])
        updateCamera(cameraArray[2])
        cameraArray[3].aspect = window.innerWidth / window.innerHeight;
        cameraArray[3].updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    keys[e.keyCode] = true;

    switch (e.keyCode) {
    case 49: //1 Perpective helper camera
    case 50: //2 Side Camera
    case 51: //3 Top camera
    case 52: //4 Frontal camera
        active_camera=e.keyCode - 49;
        onResize();
        break;
    case 65: //A
    case 97: //a
        wireframe_flag = !wireframe_flag
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                if(node.material.wireframe!=wireframe_flag)
                    node.material.wireframe = wireframe_flag;
            }
        });
        break;
    }
}

function onKeyUp(e) {
    'use strict';

    keys[e.keyCode] = false;
}

function render() {
  'use strict';

  delta = clock.getDelta();
  chair.update(delta);
  keysPressed(delta);
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
    clock.start();

    createScene();
    cameraArray = [null,null,null,null];
    createCamera();
    active_camera=0;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}


function keysPressed(delta){
    if(!keys[38] && !keys[40] || keys[38] && keys[40] )
        chair.brake()
    if(keys[37] && !keys[39])
       chair.rotateLeft(delta);

    if(keys[38] && !keys[40])
        chair.moveForward();

    if(keys[39] && !keys[37])
        chair.rotateRight(delta);

    if(keys[40] && !keys[38])
        chair.moveBackward();
}