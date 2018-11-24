var camFactor = 20;

function createCameras(size, ball) {
    'use strict';

    var screen = resize_Aux();
    
    var left = screen[0] * -.6;
    var right = screen[0] * .6;
    var top = screen[1] * .6;
    var bottom = screen[1] * .6;
    var near = 10;
    var far = 100;

    //Creating the camera that looks from the top
    cameraArray[0] = new THREE.OrthographicCamera(left,right,top,bottom,near,far);
    cameraArray[0].position.y = size;
    cameraArray[0].lookAt(scene.position);
    scene.add(cameraArray[0]);

    //Creating the camera that looks from a cube perpective
    cameraArray[1] = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
    cameraArray[1].position.x = 1.8*size;
    cameraArray[1].position.y = 1.2*size;
    cameraArray[1].position.z = size;
    cameraArray[1].lookAt(scene.position);

    // Creating the camera that will follow the ball
    cameraArray[2] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 500);
    cameraArray[2].position.z = ball.positionZ - (ball.velocity.x)/Math.abs(ball.velocity.x)*game_board.radius*2;
    cameraArray[2].position.x = ball.positionX - (ball.velocity.z)/Math.abs(ball.velocity.z)*game_board.radius*2;
    cameraArray[2].position.y = ball.radius*4.5;
    cameraArray[2].lookAt(ball.position);
    scene.add(cameraArray[2]);

    onResize();
}

function updateCameraPos(ball){
    cameraArray[2].position.x = ball.positionX - (ball.velocity.x)/Math.abs(ball.velocity.x)*game_board.radius*2;
    cameraArray[2].position.z = ball.positionZ - (ball.velocity.z)/Math.abs(ball.velocity.z)*game_board.radius*2;
    cameraArray[2].lookAt(ball.position);
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