var cameraArray, active_camera ,scene, renderer;
var geometry, material, mesh;
var table, chair, lamp;
var clock;
var slowDownUp = 0, slowDownDown = 0;
var keys = [];

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
        cameraArray[active_camera].aspect = window.innerWidth / window.innerHeight;
        cameraArray[active_camera].updateProjectionMatrix();
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
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
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

  updateChair();
  keysPressed();
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

//!!!!!!!!!!!! CHAIR MOVEMENT !!!!!!!!!!!!!!!!!!!!
function rotateRight(obj) {
    obj.rotation.y -= 100*delta*(Math.PI / 180);
    console.log(obj.rotation.y);
    theta = obj.rotation.y;
}

function rotateLeft(obj) {
    obj.rotation.y += 100*delta*(Math.PI / 180);
    console.log(obj.rotation.y);
    theta = obj.rotation.y;
}

function moveChairForward(){
    if(acceleration < 0.5)
        acceleration += 0.1;
}

function moveChairBackward(){
    if(acceleration > -0.5)
        acceleration -= 0.1;
}

function capVelocity(){
    if(velocity > 1)
        velocity = 1;
    else if (velocity < -1)
        velocity = -1;

}

function updateChair(){
    delta = clock.getDelta();

    acceleration = acceleration * friction;
    velocity += acceleration*delta
    capVelocity();
    velocity = velocity * friction;
    chair.position.x -= (velocity*delta*60 + acceleration*0.5*delta*delta*60*60)*Math.sin(theta);
    chair.position.z -= (velocity*delta*60 + acceleration*0.5*delta*delta*60*60)*Math.cos(theta);
}

function keysPressed(){
    if(keys[37] && !keys[39])
       rotateLeft(chair);

    if(keys[38] && !keys[40])
        moveChairForward(chair);

    if(keys[39] && !keys[37])
        rotateRight(chair);

    if(keys[40] && !keys[38])
        moveChairBackward(chair);
}
//!!!!!!!!!!!!!!! END OF CHAIR MOVEMENT !!!!!!!!!!!!!!!obj
