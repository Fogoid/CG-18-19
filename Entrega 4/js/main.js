var scene, renderer, camera, controls;
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
    scene.background = bgColor;
    scene.add(new THREE.AxisHelper(10));

    directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1 );
    directionalLight.position.set( 1, 1, 1 );
    scene.add(directionalLight);

    pointLight = new THREE.PointLight( 0x777777, 1, 150, 1);
    pointLight.position.set(-30,50,-30); 
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
    scene.add(pauseTxt);
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
            clock.start();
            pauseTxt.visible = !pauseTxt.visible;
        }
        keys[82] = false;
    }

    if (keys[83]) { //S -> Pause/unpause visualisation
        if(clock.running)
            clock.stop();
        else
            clock.start();
        pauseTxt.visible = !pauseTxt.visible;
        keys[83] = false;
    }

    if (keys[87]){ //W -> Wireframe
        for(var i=0; i<objects.length;i++)
            objects[i].changeWireframe();
        keys[87] = false;
    }

    if(!clock.running)
        pauseTxt.setPosition(getCameraPos());
    else
        ball.updatePosition(delta);

}

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled;
    renderer.shadowMap.autoUpdate;

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
