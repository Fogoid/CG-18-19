var camFactor = 20;
var original_window = window.innerWidth/window.innerHeight

function createCamera() {
    'use strict';

    var left = -window.innerWidth / camFactor;
    var right = window.innerWidth / camFactor;
    var top = window.innerHeight / camFactor;
    var bottom = -window.innerHeight / camFactor;
    var near = 1;
    var far = 500;
    var axisDistance = 60;



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

    var ratio = window.innerWidth / window.innerHeight
    var difference = original_window / ratio

    camera.left   = (difference)*window.innerWidth/ -camFactor
    camera.right  = (difference)*window.innerWidth /  camFactor  ;
    camera.top    = (difference)*window.innerHeight/ camFactor ;
    camera.bottom = (difference)*window.innerHeight / -camFactor ;
    camera.updateProjectionMatrix();
}
