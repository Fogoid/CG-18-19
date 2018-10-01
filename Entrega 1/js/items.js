var cameraArray, active_camera ,scene, renderer;

var geometry, material, mesh;

var chair;

var delta, theta;

var forward = 0, back = 0, clock;

function createTableLeg(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x9a8470, wireframe: true });
    geometry = new THREE.CylinderGeometry(1,1,15,15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTableTop(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xbe9b7b, wireframe: true });
    geometry = new THREE.CubeGeometry(40, 2, 16);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    createTableTop(table, 0, 16, 0);
    createTableLeg(table, -18, 7.5, -6);
    createTableLeg(table, 18, 7.5, -6);
    createTableLeg(table, -18, 7.5, 6);
    createTableLeg(table, 18, 7.5, 6);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

//Function used to create the chair's Wheels to simplify and encapsulate code
function createChairWheel(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xaba9a9, wireframe: true });
    geometry = new THREE.TorusGeometry( 0.5, 0.3, 20, 60);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, y, 0);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
}

//Function used to create the chair's legs to simplify and encapsulate code
function createChairLeg(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xbababa, wireframe: true });
    geometry = new THREE.CubeGeometry(1, 8, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    createChairWheel(mesh, 0, -4.8, 0);
}

//Function used to create the back part of the chair
function createChairBack(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: true });
    geometry = new THREE.CubeGeometry(9, 12, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

//Function used to create the seat of the chair
function createChairSeat(obj, x, y, z){
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: true });
    geometry = new THREE.CubeGeometry(9, 1.5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


//Function used to manage the creation of the chair top-down programming wise
function createChair(x, y, z){
    'use strict';

    chair = new THREE.Object3D();

    createChairSeat(chair, 0, 10.35, 0);
    createChairBack(chair, 0, 17.10, 4);
    createChairLeg(chair, 3.5, 5.6, 4);
    createChairLeg(chair, 3.5, 5.6, -4);
    createChairLeg(chair, -3.5, 5.6, 4);
    createChairLeg(chair, -3.5, 5.6, -4);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

//Function used to create the base of the lamp
function createLampBase(obj, x, y, z){
  'use strict';

  var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
  geometry = new THREE.CylinderGeometry(5,5,1,30);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

//Function used to create the post of the lamp
function createLampPost(obj, x, y, z){
  'use strict';

  var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
  geometry = new THREE.CylinderGeometry(0.5,0.5,30);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

//Function used to create the lampshade of the lamp
function createLampLampshade(obj, x, y, z){
  'use strict';

  geometry = new THREE.CylinderGeometry(3,3,5,30,1,true);
  var material = new THREE.MeshBasicMaterial({ color: 0xa2798f, wireframe: true });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createLamp(x, y, z){
  'use strict';

  var lamp = new THREE.Object3D();

  //material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });

  createLampBase(lamp, 0, 0.5, 0);
  createLampPost(lamp, 0, 16, 0);
  createLampLampshade(lamp, 0, 32, 0);

  scene.add(lamp);

  lamp.position.x = x;
  lamp.position.y = y;
  lamp.position.z = z;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));

    createTable(0, 0, 0);
    createChair(0, 0, 17);
    createLamp(30, 0, 0);
}

function createCamera() {
    'use strict';

    //Creating the camera that looks from a cube perpective
    cameraArray[0] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraArray[0].position.x = 50;
    cameraArray[0].position.y = 50;
    cameraArray[0].position.z = 50;
    cameraArray[0].lookAt(scene.position);

    var sides = 40;
    var near = 20;
    var far = 60;
    var axisDistance = 50;

    //Creating the camera that looks from the side
    cameraArray[1] = new THREE.OrthographicCamera(-sides,sides,sides,-sides,near,far);
    cameraArray[1].position.x = axisDistance;
    cameraArray[1].lookAt(scene.position);
    scene.add(cameraArray[1]);


    //Creating the camera that looks from the top
    cameraArray[2] = new THREE.OrthographicCamera(-sides,sides,sides,-sides,near,far);
    cameraArray[2].position.y = axisDistance;
    cameraArray[2].lookAt(scene.position);
    scene.add(cameraArray[1]);

    //Creating the camera that looks from the front
    cameraArray[3] = new THREE.OrthographicCamera(-sides,sides,sides,-sides,near,far);
    cameraArray[3].position.z = -30;
    cameraArray[3].lookAt(scene.position);
    scene.add(cameraArray[1]);

}

function rotateRight() {
    chair.rotation.y -= (Math.PI / 180);
    console.log(chair.rotation.y);
    theta = chair.rotation.y;
}

function rotateLeft() {
    chair.rotation.y += (Math.PI / 180);
    console.log(chair.rotation.y);
    theta = chair.rotation.y;
}

function moveChairUpwards(){
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
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 38: //ArrowUp
      moveChairUpwards();
      break;
    case 39: //ArrowRight
      rotateRight();
      break;
    case 40: //ArrowDown
    moveChairDownwards();
      break;
    case 37: //ArrowLeft
      rotateLeft();
      break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, cameraArray[active_camera]);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    cameraArray = [null,null,null,null];
    createCamera();
    active_camera=0;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}
