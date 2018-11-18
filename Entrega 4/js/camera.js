var camFactor = 20;

function createCameras(size) {
    'use strict';

    var screen = resize_Aux();
    
    //Creating the camera that looks from a cube perpective
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.x = 0;//1.8*size;
    camera.position.y = 2*size;//1.2*size;
    camera.position.z = 2*size;//size;
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera);
}

function resize_Aux() {
    'use strict'

    var aspect = 16/9
    var scale = window.innerWidth / window.innerHeight

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

function resetCamera(){
    camera.position.x = 0;//1.8*size;
    camera.position.y = 2*size;//1.2*size;
    camera.position.z = 2*size;//size;
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera);
}

function getCameraPos(){
    return new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
}