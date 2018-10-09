var camFactor = 20;

function createCamera() {
    'use strict';

    var left = -window.innerWidth / camFactor;
    var right = window.innerWidth / camFactor;
    var top = window.innerHeight / camFactor;
    var bottom = -window.innerHeight / camFactor;
    var near = 20;
    var far = 100;
    var axisDistance = 50;



    //Creating the camera that looks from the top
    cameraArray[0] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[0].position.y = axisDistance;
    cameraArray[0].lookAt(scene.position);
    scene.add(cameraArray[0]);

    //Creating the camera that looks from the side
    cameraArray[1] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[1].position.x = axisDistance;
    cameraArray[1].lookAt(scene.position);
    scene.add(cameraArray[1]);



    //Creating the camera that looks from the front
    cameraArray[2] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[2].position.z = -axisDistance;
    cameraArray[2].lookAt(scene.position);
    scene.add(cameraArray[2]);

    //Creating the camera that looks from a cube perpective
    cameraArray[3] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraArray[3].position.x = 50;
    cameraArray[3].position.y = 50;
    cameraArray[3].position.z = 50;
    cameraArray[3].lookAt(scene.position);
     scene.add(cameraArray[3]);

}

function updateCamera(camera){
    camera.left = -window.innerWidth / camFactor;
    camera.right = window.innerWidth / camFactor;
    camera.top = window.innerHeight / camFactor;
    camera.bottom = -window.innerHeight / camFactor;
    camera.updateProjectionMatrix();
}