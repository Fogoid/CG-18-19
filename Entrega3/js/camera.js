var camFactor = 20;

function createCameras(size) {
    'use strict';

    var screen = resize_Aux();
    
    //Creating the camera that looks from a cube perpective
    cameraArray[0] = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
    cameraArray[0].position.x = 0;//1.8*size;
    cameraArray[0].position.y = 2*size;//1.2*size;
    cameraArray[0].position.z = 2*size;//size;
    cameraArray[0].lookAt(scene.position);
    
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