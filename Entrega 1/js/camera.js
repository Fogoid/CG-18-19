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