var scene, renderer, camera, controls;
var speedup = 10;
var clock, delta;
var keys = [];
var size = 50;
var sun, spotlight, calculus = true;
var board, ball, cube;
var moveBall = 1;
var paused = 0, pausedTxt;
var nightColor, dayColor;

function createScene() {
    'use strict';

    nightColor = new THREE.Color(0x080823);
    dayColor = new THREE.Color( 0x7EC0EE );

    scene = new THREE.Scene();
    scene.background = dayColor;
    scene.add(new THREE.AxisHelper(10));

    sun = new THREE.DirectionalLight( 0xffffff, 1 );
    sun.position.set( 1, 1, 0 );
    scene.add(sun);

    spotlight = new spotLight( 25, 25, 25, new THREE.Vector3(Math.PI/4,0,-Math.PI/4) );
    scene.add(spotlight);

    board = new chessBoard(0, 0, 0, 100, 100, 3*Math.PI / 2);
    scene.add(board);

    ball = new poolBall(0, 40, 8);
    scene.add(ball);

    cube = new rubikCube(0, 0, 15, 15, 15);
    scene.add(cube);

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

    keys[e.keyCode] = true;
}

function update() {
    'use strict'

    delta = clock.getDelta();

    if (keys[68]) { //D -> Switch between on off directional light
        if(!paused)
            sun.intensity = sun.intensity == 0? 1 : 0;
        keys[68] = false;
    }

    if (keys[80]) { //P -> Switch between on off point light
        if(!paused)
            spotlight.turnOnOff();
        keys[80] = false;
    }

    if (keys[87]){ //W -> Wireframe
        board.changeWireframe();
        ball.changeWireframe();
        cube.changeWireframe();
        keys[87] = false;
    }

    if (keys[76]) { //L -> Deactivate/activate calculus
        if(!paused){
            board.switchCalculus();
            ball.switchCalculus();
            cube.switchCalculus();
        }
        keys[76] = false;
    }

    if (keys[66]) { //B -> Start/stop ball movement
        if (!paused)
            ball.changeVelocity();
        keys[66] = false;
    }

    if (keys[83]) { //S -> Pause/unpause visualisation
        paused = !paused;
        keys[83] = false;
    }
    
    if (keys[82]) { //R -> Reset Status
        if(paused){
            board.reset();
            ball.reset();
            cube.reset();
            resetCamera();
            paused = 0;
        }
        keys[82] = false;
    }

    if (!paused)
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
