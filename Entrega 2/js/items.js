var cameraArray, active_camera ,scene, renderer;
var game_board;
var clock, delta;
var keys = [];
var size = 50;

class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
  }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    game_board = new GameBoard(0,0,0,size);
    scene.add(game_board);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        updateCamera(cameraArray[0])
        updateCamera(cameraArray[2])
        cameraArray[1].aspect = window.innerWidth / window.innerHeight;
        cameraArray[1].updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 49: //1 Top Camera
    case 50: //2 Perpective camera
    case 51: //3 Ball camera
        active_camera=e.keyCode - 49;
        onResize();
        break;
    case 69: //E -> Press to remove Axes
        keys[e.keyCode] = true;
        break;
    }
}

function render() {
  'use strict';

  delta = clock.getDelta();

  updateCameraPos(game_board.getBall())

  game_board.updateCycle(delta);
  if(keys[69] == true){
    game_board.showBallsAxes();
    keys[69] = false;
  }


  renderer.render(scene, cameraArray[active_camera]);
}

function updateCameraPos(ball){
    cameraArray[2].position.x = ball.positionX - (ball.velocity.x)/Math.abs(ball.velocity.x)*game_board.radius
    cameraArray[2].position.z = ball.positionZ - (ball.velocity.z)/Math.abs(ball.velocity.z)*game_board.radius
    cameraArray[2].lookAt(ball.position)
    console.log(ball)
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
    active_camera=0;
    createCameras(size, game_board.getBall());


    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();
    requestAnimationFrame(animate);
}