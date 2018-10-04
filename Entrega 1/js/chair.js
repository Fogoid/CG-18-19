var delta = 0,theta = 0, velocity = 0, acceleration = 0, friction = 0.95;

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

function rotateRight() {
    chair.rotation.y -= 100*delta*(Math.PI / 180);
    console.log(chair.rotation.y);
    theta = chair.rotation.y;
}

function rotateLeft() {
    chair.rotation.y += 100*delta*(Math.PI / 180);
    console.log(chair.rotation.y);
    theta = chair.rotation.y;
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
       rotateLeft();

    if(keys[38] && !keys[40])
        moveChairForward();

    if(keys[39] && !keys[37])
        rotateRight();

    if(keys[40] && !keys[38])
        moveChairBackward();

}