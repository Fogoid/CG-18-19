
var delta = 0,theta = 0;
var material;

class ChairWheel extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(0, y, 0);

    /*triangle wheels (for testing purposes):
    geometry = new THREE.TorusGeometry( 0.5, 0.3, 2, 3);*/

    geometry = new THREE.TorusGeometry( 0.5, 0.3, 4, 8);
    mesh = new THREE.Mesh(geometry, material);
    this.body = mesh;
    mesh.position.set(x, y, z);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
  }
}

class ChairLeg extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
    this.wheel = null;
    geometry = new THREE.CubeGeometry(1, 8, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }

  createWheel(x, y, z, obj, material){
    'use strict';
    this.wheel = new ChairWheel(x, y, z, obj, material);
    this.add(this.wheel);
  }

  returnWheel(){
      return this.wheel;
  }
}

class ChairBack extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
    geometry = new THREE.CubeGeometry(9, 12, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}
class ChairSeat extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
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
        this.angle = 0;
        this.legs = new Array();

        var seatMaterial = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: wireframe_flag });
        var legMaterial = new THREE.MeshBasicMaterial({ color: 0xbababa, wireframe: wireframe_flag });
        var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0xaba9a9, wireframe: wireframe_flag });

        var chairSeat = new ChairSeat(0, 10.35, 0, this, seatMaterial);
        var chairBack = new ChairBack(0, 17.10, 4, this, seatMaterial);
        var chairLeg1 = new ChairLeg(3.5, 5.6, 4, this, legMaterial);
        var chairLeg2 = new ChairLeg(3.5, 5.6, -4, this, legMaterial);
        var chairLeg3 = new ChairLeg(-3.5, 5.6, 4, this, legMaterial);
        var chairLeg4 = new ChairLeg(-3.5, 5.6, -4, this, legMaterial);


        chairLeg1.createWheel(0, -4.8, 0, chairLeg1, wheelMaterial);
        this.wheel = chairLeg1.returnWheel();
        chairLeg2.createWheel(0, -4.8, 0, chairLeg2, wheelMaterial);
        chairLeg3.createWheel(0, -4.8, 0, chairLeg3, wheelMaterial);
        chairLeg4.createWheel(0, -4.8, 0, chairLeg4, wheelMaterial);

        this.add(chairSeat);
        this.add(chairBack);
        this.add(chairLeg1);
        this.add(chairLeg2);
        this.add(chairLeg3);
        this.add(chairLeg4);

        this.legs.push(chairLeg1);
        this.legs.push(chairLeg2);
        this.legs.push(chairLeg3);
        this.legs.push(chairLeg4);
    }

    update(delta){
        'use strict';

        this.switchVelocity(delta);
        this.capVelocity();
        this.positionX -= (this.velocity*delta*60 + this.acceleration*0.5*delta*delta*60*60)*Math.sin(this.rotationY);
        this.positionZ -= (this.velocity*delta*60 + this.acceleration*0.5*delta*delta*60*60)*Math.cos(this.rotationY);
        this.position.set(this.positionX, this.positionY, this.positionZ);
        this.acceleration = 0;
        this.rotateWheels(delta);
    }

    switchVelocity(delta){
        'use strict';

        if(this.velocity<0 && this.velocity+this.acceleration>=0)
            this.velocity = 0;
        else if(this.velocity>-0 && this.velocity+this.acceleration<=0)
            this.velocity = 0;
        else
            this.velocity += this.acceleration*delta;
    }

    capVelocity(){
        'use strict';

        if(this.velocity > 1)
            this.velocity = 1;
        else if (this.velocity < -1)
            this.velocity = -1;

    }

    rotateRight(delta) {
        'use strict';

        this.rotation.y -= 100*delta*(Math.PI / 180);
        this.rotationY =this.rotation.y;
    }

    rotateLeft(delta) {
        'use strict';

        this.rotation.y += 100*delta*(Math.PI / 180);
        this.rotationY =this.rotation.y;
    }

    moveForward(){
        'use strict';

        this.acceleration = this.accelerationConstant;
    }

    moveBackward(){
        'use strict';

        this.acceleration = -this.accelerationConstant;
    }

    brake(){
        'use strict';

        if(this.velocity>0)
            this.acceleration = this.brakeConstant;
        else if (this.velocity<0)
            this.acceleration = -this.brakeConstant;
        else
            this.acceleration = 0;
    }

    rotateWheels(delta){
        'use strict';

        var vector = new THREE.Vector3(0,0,1);
        for(var i = 0; i < 4; i++){
            this.angle = this.velocity*delta*Math.PI*20;
            if (this.velocity>0){
              this.legs[i].wheel.body.rotateOnAxis(vector, -this.angle);
              console.log(this.angle);
            }
            else {
              this.legs[i].wheel.body.rotateOnAxis(vector, -this.angle);
            }
        }
    }
}
