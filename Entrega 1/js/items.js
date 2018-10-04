var cameraArray, active_camera ,scene, renderer;
var geometry, material, mesh;
var chair;
var clock;
var slowDownUp = 0, slowDownDown = 0;
var keys = [];

function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));

    createTable(0, 0, 0);
    createChair(0, 0, 17);
    createLamp(30, 0, 0);
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

    keys[e.keyCode] = true;
    
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
    }
}

function onKeyUp(e) {
    'use strict';

    keys[e.keyCode] = false;
}

function render() {
    'use strict';

    updateChair();
    keysPressed();
    renderer.render(scene, cameraArray[active_camera]);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    clock.start();

    createScene();
    cameraArray = [null,null,null,null];
    createCamera();
    active_camera=0;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}