var camFactor = 20;

function createCameras(size) {
    'use strict';

    var left = -window.innerWidth / camFactor;
    var right = window.innerWidth / camFactor;
    var top = window.innerHeight / camFactor;
    var bottom = -window.innerHeight / camFactor;
    var near = 20;
    var far = 100;



    //Creating the camera that looks from the top
    cameraArray[0] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[0].position.y = size;
    cameraArray[0].lookAt(scene.position);
    scene.add(cameraArray[0]);


    //Creating the camera that looks from a cube perpective
    cameraArray[1] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 500);
    cameraArray[1].position.x = 1.8*size;
    cameraArray[1].position.y = 1.2*size;
    cameraArray[1].position.z = size;
    cameraArray[1].lookAt(scene.position);

    // Creating the camera that will follow the ball
    cameraArray[2] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[2].position.z = -size;
    cameraArray[2].lookAt(scene.position);
    scene.add(cameraArray[2]);



}

function updateCamera(camera){
    camera.left = -window.innerWidth / camFactor;
    camera.right = window.innerWidth / camFactor;
    camera.top = window.innerHeight / camFactor;
    camera.bottom = -window.innerHeight / camFactor;
    camera.updateProjectionMatrix();
}