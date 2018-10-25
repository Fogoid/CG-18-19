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
  'use strict'

  screen = resize_Aux();
  var index = 0;
  if (window.innerWidth > 0 && window.innerHeight > 0) {

          
    cameraArray[1].aspect = screen[0]/screen[1];

    cameraArray[2].aspect = screen[0]/screen[1];

    cameraArray[0].left = screen[0] * -.6;
    cameraArray[0].right = screen[0] * .6;
    cameraArray[0].top = screen[1] * .6;
    cameraArray[0].bottom = screen[1] * -.6;
          
    cameraArray[0].updateProjectionMatrix();
    cameraArray[1].updateProjectionMatrix();
    cameraArray[2].updateProjectionMatrix();
  }
  

  renderer.setSize(window.innerWidth, window.innerHeight)
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

function Timer() {
  game_board.increaseBallVelocity();
}

function init() {
  'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    setInterval(Timer, 30000);

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