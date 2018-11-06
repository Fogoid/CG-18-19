var scene, renderer, camera, controls;
var speedup = 10;
var clock, delta;
var keys = [];
var size = 50;
var plane, sun;
var spotlights = [];
var turnSpotLights = [0, 0, 0, 0], turnSun = 0;

function createSpotlights() {

    spotlights[0] = new spotLight(25, 0, 25);
    spotlights[1] = new spotLight(25, 0, -25);
    spotlights[2] = new spotLight(-25, 0, 25);
    spotlights[3] = new spotLight(-25, 0, -25);

    for(var i = 0; i < 4; i++){
        scene.add(spotlights[i]);
    }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x779ecb );
    scene.add(new THREE.AxisHelper(10));

    plane = new Plane(0, 0, 0, 4, 10);
    plane.position.set(0,0,0);
    scene.add(plane);

    sun = new THREE.PointLight( 0xffffff, 2, 100 );
    sun.position.set( 0, 15, 0);
    scene.add(sun);

    createSpotlights();
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

function onKeyUp(e) {
    'use strict';

    switch(e.keyCode){
        case 37: //left arrow key
        case 38: //up arrow key
        case 39: //right arrow key    
        case 40: //down arrow key
            keys[e.keyCode] = false;
            break;
    }
}

function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {
        case 71: //G -> Press to change the plane material
        case 37: //left arrow key
        case 38: //up arrow key
        case 39: //right arrow key
        case 40: //down arrow key
        case 78: //N ->	switch the ambient light
            keys[e.keyCode] = true;
            break;
        case 49: //1 -> switch spotlight[0]
        case 50: //2 -> switch spotlight[1]
        case 51: //3 -> switch spotlight[2]
        case 52: //4 -> switch spotlight[3]
            keys[e.keyCode - 49] = true;
            break;
    }
}

function update() {
    delta = clock.getDelta();

    if (keys[71]) {
        plane.changeChildrenMaterial();
        keys[71] = false;
    }
    if (keys[78]) {
        sun.intensity = sun.intensity == 0 ? 1 : 0;
        keys[78] = false;
    }

    if(keys[37] && !keys[39]){
        plane.makeHorizontalMovement(1, delta);
    }
    if(keys[38] && !keys[40]){
        plane.makeVerticalMovement(-1, delta);
    }
    if(keys[39] && !keys[37]){
        plane.makeHorizontalMovement(-1, delta);
    }
    if(keys[40] && !keys[38]){
        plane.makeVerticalMovement(1, delta);
    }
    
    for(var i = 0; i < 4; i++){
      if(keys[i]){
          spotlights[i].turnOnOff();
          keys[i] = 0;
      }
    }
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

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();

    createScene();
    createCameras(size);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    update();
    controls.update();
    render();
    requestAnimationFrame(animate);
}
