
var cameraArray, active_camera ,scene, renderer;

var geometry, material, mesh;

var ball;


function createBall(x, y, z) {
    'use strict';
    
    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0 };
    
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    
    ball.add(mesh);
    ball.position.set(x, y, z);
    
    scene.add(ball);
}

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CubeGeometry(2, 6, 2);
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
   
    addTableTop(table, 0, 0, 0);
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

   /* geometry = new THREE.CubeGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);*/

}

//Function used to create the chair's Wheels to simplify and encapsulate code
function createChairWheel(obj, x, y, z){
    'use strict';

}


//Function used to create the back part of the chair
function createChairBackSeat(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(10, 10, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

//Function used to create the seat of the chair
function createChairSeat(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(10, 5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh); 
}


//Function used manage the creation of the chair top-down programming wise
function createChair(x, y, z){
    'use strict';


    var chair = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0xff9100, wireframe: true });

    createChairSeat(chair, 10, 5, 10);
    createChairBackSeat(chair, 10, 10, 15);
    createChairLeg(chair, 0, 0, 0);
    createChairLeg(chair, 0, 0, 0);
    createChairLeg(chair, 0, 0, 0);
    createChairLeg(chair, 0, 0, 0);
    createChairWheel(chair, 0, 0, 0);
    createChairWheel(chair, 0, 0, 0);
    createChairWheel(chair, 0, 0, 0);
    createChairWheel(chair, 0, 0, 0);


    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxisHelper(10));
    
    /*createTable(0, 8, 0);
    createBall(0, 0, 15);*/
    createChair(10,0,10);
}

function createCamera() {
    'use strict';

    //Creating the camera that looks from a cube perpective
    cameraArray[0] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraArray[0].position.x = 50;
    cameraArray[0].position.y = 50;
    cameraArray[0].position.z = 50;
    cameraArray[0].lookAt(scene.position);    

    //Creating the camera that looks from the top
    cameraArray[1] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraArray[1].position.x = 0;
    cameraArray[1].position.y = 50;
    cameraArray[1].position.z = 0;
    cameraArray[1].lookAt(scene.position);

    //Creating the camera that looks from the side
    cameraArray[2] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraArray[2].position.x = 0;
    cameraArray[2].position.y = 0;
    cameraArray[2].position.z = 50;
    cameraArray[2].lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera2.aspect = window.innerWidth / window.innerHeight;
        camera2.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 49: //1
        active_camera=0;
        break;
    case 50: //2
        active_camera=1;
        break;
    case 51: //3
        active_camera=2;
        break;
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 83:  //S
    case 115: //s
         ball.userData.jumping = !ball.userData.jumping;
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
    cameraArray = [null,null,null];
    createCamera();
    active_camera=0;
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    
    /*if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }*/

    render();
    
    requestAnimationFrame(animate);
}

