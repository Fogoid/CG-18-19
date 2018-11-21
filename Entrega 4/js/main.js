var scene, writeScene, renderer, camera, writeCamera, controls;
var speedup = 10;
var clock, delta;
var keys = [];
var objects = [];
var pointLight, directionalLight;
var ball;
var bgColor;
var pauseTxt;
var size = 50;

function createScene() {
    'use strict';

    bgColor = new THREE.Color( 0xd7abb4 );

    scene = new THREE.Scene();
    writeScene = new THREE.Scene();
    writeScene.background = bgColor;
    scene.background = bgColor;
    scene.add(new THREE.AxisHelper(10));

    directionalLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
    directionalLight.position.set( 1, 1, 1 );
    scene.add(directionalLight);

    pointLight = new THREE.PointLight( 0x777777, 2, 150, 1);
    pointLight.position.set(-40,50,-40); 
    scene.add(pointLight);

    var board = new chessBoard(0, 0, 0, 100, 100, 3*Math.PI / 2);
    objects.push(board);
    scene.add(board);

    ball = new poolBall(0, 40, 8);
    objects.push(ball);
    scene.add(ball);

    var cube = new rubikCube(0, 0, 15, 15, 15);
    objects.push(cube);
    scene.add(cube);
    
    pauseTxt = new pausedText();
    writeScene.add(pauseTxt);
}

function onResize() {
    'use strict'

    screen = resize_Aux();

    if (window.innerWidth > 0 && window.innerHeight > 0) {
        camera.aspect = screen[0]/screen[1];
        camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(e) {
    'use strict'

    switch(e.keyCode){
        case 66: //B -> Start/stop ball movement
        case 68: //D -> Switch the directional light
        case 76: //L -> Deactivate/activate  light calculus
        case 80: //P -> Switch the point light
        case 82: //R -> Reset Status
        case 83: //S -> Pause/unpause visualisation
        case 87: //W -> Wireframe
            keys[e.keyCode] = true;
            break;
    }
    
}

function resetLights(){
  directionalLight.intensity = 1;
  pointLight.intensity = 1; 
}

function update() {
    'use strict'

    delta = clock.getDelta();


    if (keys[66]) { //B -> Start/stop ball movement
        ball.changeVelocity();
        keys[66] = false;
    }

    if (keys[68]) { //D -> Switch between on off directional light
        directionalLight.intensity = directionalLight.intensity == 0 ? 1 : 0;
        keys[68] = false;
    }

    if (keys[76]) { //L -> Deactivate/activate calculus
        for(var i=0; i<objects.length;i++)
            objects[i].switchCalculus();
        keys[76] = false;
    }
    
    if (keys[80]) { //P -> Switch between on off point light
        pointLight.intensity = pointLight.intensity == 0 ? 1 : 0;
        keys[80] = false;
    }

    if (keys[82]) { //R -> Reset Status
        if(!clock.running){
            for(var i=0; i<objects.length;i++)
                objects[i].reset();
            resetCamera();
            resetLights();
            clock.start();
        }
        keys[82] = false;
    }

    if (keys[83]) { //S -> Pause/unpause visualisation
        if(clock.running)
            clock.stop();
        else
            clock.start();
        keys[83] = false;
    }

    if (keys[87]){ //W -> Wireframe
        for(var i=0; i<objects.length;i++)
            objects[i].changeWireframe();
        keys[87] = false;
    }

    ball.updatePosition(delta);

}

function render() {
    'use strict';

    renderer.clear();
    renderer.render(scene, camera);

    if(!clock.running){
        console.log("oi");
        renderer.render(writeScene,writeCamera);
    }

}

function init() {
    'use strict';
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.autoClearColor = false;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    clock.autoStart = false;
    clock.start();

    createScene();
    createCameras(size);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    update();
    controls.update();
    render();
    requestAnimationFrame(animate);
}
