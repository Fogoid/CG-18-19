
var delta = 0,theta = 0;
var material;

class ChairWheel extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
    var old_measures = [0.5, 0.3, 20, 60];
    geometry = new THREE.TorusGeometry( 4, 0.3, 7, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, y, 0);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
    this.worldAxis = new THREE.Vector3(1,0,0);
  }

  rotate(speed,delta){
    console.log(speed*delta*200*(Math.PI / 180));
    this.rotation.x -=speed*delta*200*(Math.PI / 180);
  }
}

class ChairLeg {
  constructor(x, y, z, obj, material, wheelMaterial) {
    'use strict';

    geometry = new THREE.CubeGeometry(1, 8, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    this.wheel = new ChairWheel(0, -4.8, 0, mesh, wheelMaterial);
  }

  rotateWheel(speed,delta){
    this.wheel.rotate(speed,delta)
  }

  removeWheel(){
    this.wheel = null;
  }
}

class ChairBack {
  constructor(x, y, z, obj, material) {
    'use strict';


    geometry = new THREE.CubeGeometry(9, 12, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}
class ChairSeat {
  constructor(x, y, z, obj, material) {
    'use strict';
   
    geometry = new THREE.CubeGeometry(9, 1.5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}

class Chair extends Item {

    constructor(x, y, z) {
        'use strict';

        super(x, y, z);

        this.acceleration = 0;
        this.accelerationConstant = 0.3;
        this.brakeConstant = -0.5;
        this.velocity = 0;
        this.rotationY = 0;
        this.positionX = x;
        this.positionY = y;
        this.positionZ = z;

        var seatMaterial = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: wireframe_flag });
        var legMaterial = new THREE.MeshBasicMaterial({ color: 0xbababa, wireframe: wireframe_flag });
        var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xaba9a9, wireframe: wireframe_flag });

        var chairSeat = new ChairSeat(0, 10.35, 0, this, seatMaterial);
        var chairBack = new ChairBack(0, 17.10, 4, this, seatMaterial);
        this.chairlegs = []
        this.chairlegs[0] = new ChairLeg(3.5, 5.6, 4, this, legMaterial, wheelMaterial);
        this.chairlegs[1] = new ChairLeg(3.5, 5.6, -4, this, legMaterial, wheelMaterial);
        this.chairlegs[2] = new ChairLeg(-3.5, 5.6, 4, this, legMaterial, wheelMaterial);
        this.chairlegs[3] = new ChairLeg(-3.5, 5.6, -4, this, legMaterial, wheelMaterial);
    }

    update(delta){
        this.switchVelocity(delta);
        this.capVelocity();
        this.positionX -= (this.velocity*delta*60 + this.acceleration*0.5*delta*delta*60*60)*Math.sin(this.rotationY);
        this.positionZ -= (this.velocity*delta*60 + this.acceleration*0.5*delta*delta*60*60)*Math.cos(this.rotationY);
        this.position.set(this.positionX, this.positionY, this.positionZ);
        this.rotateWheels(this.velocity,delta);
        this.acceleration = 0;
    }

    switchVelocity(delta){
        if(this.velocity<0 && this.velocity+this.acceleration>=0)
            this.velocity = 0;
        else if(this.velocity>-0 && this.velocity+this.acceleration<=0)
            this.velocity = 0;
        else
            this.velocity += this.acceleration*delta;
    }

    capVelocity(){
        if(this.velocity > 1)
            this.velocity = 1;
        else if (this.velocity < -1)
            this.velocity = -1;

    }

    rotateRight(delta) {
        this.rotation.y -= 100*delta*(Math.PI / 180);
        this.rotationY =this.rotation.y;
    }

    rotateLeft(delta) {
        this.rotation.y += 100*delta*(Math.PI / 180);
        this.rotationY =this.rotation.y;
    }

    moveForward(){
        this.acceleration = this.accelerationConstant;
    }

    moveBackward(){
        this.acceleration = -this.accelerationConstant;
    }

    brake(){
        if(this.velocity>0)
            this.acceleration = this.brakeConstant;
        else if (this.velocity<0)
            this.acceleration = -this.brakeConstant;
        else
            this.acceleration = 0;
    }

    rotateWheels(speed,delta){
        this.chairlegs[0].rotateWheel(speed,delta);
        this.chairlegs[1].rotateWheel(speed,delta);
        this.chairlegs[2].rotateWheel(speed,delta);
        this.chairlegs[3].rotateWheel(speed,delta);
    }
}
