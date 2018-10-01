
var cameraArray, active_camera ,scene, renderer;

var geometry, material, mesh;

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1,1,15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   
    addTableTop(table, 0, 5, 0);
    addTableLeg(table, -25, -1, -8);
    addTableLeg(table, -25, -1, 8);
    addTableLeg(table, 25, -1, 8);
    addTableLeg(table, 25, -1, -8);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

//Function used to create the chair's legs to simplify and encapsulate code
function createChairLeg(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    createChairWheel(mesh, x, y-3.6, z);
}

//Function used to create the chair's Wheels to simplify and encapsulate code
function createChairWheel(obj, x, y, z){
    'use strict';

    geometry = new THREE.TorusGeometry( .5, .1, 20, 60);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, y, 0);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
}


//Function used to create the back part of the chair
function createChairBackSeat(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(10, 10, 2);    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

//Function used to create the seat of the chair
function createChairSeat(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(10, 2, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh); 
}


//Function used manage the creation of the chair top-down programming wise
function createChair(x, y, z){
    'use strict';


    var chair = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0xff9100, wireframe: true });

    createChairSeat(chair, 0, 4, 0);
    createChairBackSeat(chair, 0, 10, 4);
    createChairLeg(chair, 4, 0, 4);
    createChairLeg(chair, 4, 0, -4);
    createChairLeg(chair, -4, 0, 4);
    createChairLeg(chair, -4, 0, -4);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 8, 0);
    createChair(0, 0, 20);
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

