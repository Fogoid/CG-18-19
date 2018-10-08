var delta = 0,theta = 0, velocity = 0, acceleration = 0, friction = 0.95;

class ChairWheel {
  constructor(x, y, z, obj) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xaba9a9, wireframe: true });
    geometry = new THREE.TorusGeometry( 0.5, 0.3, 20, 60);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, y, 0);
    mesh.rotateY(Math.PI/2);
    obj.add(mesh);
  }
}

class ChairLeg {
  constructor(x, y, z, obj) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xbababa, wireframe: true });
    geometry = new THREE.CubeGeometry(1, 8, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    var wheel = new ChairWheel(0, -4.8, 0, mesh);
  }
}

class ChairBack {
  constructor(x, y, z, obj) {
    'use strict';


    material = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: true });
    geometry = new THREE.CubeGeometry(9, 12, 1.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}
class ChairSeat {
  constructor(x, y, z, obj) {
    'use strict';


    material = new THREE.MeshBasicMaterial({ color: 0xe5c3c6, wireframe: true });
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
      var chairSeat = new ChairSeat(0, 10.35, 0, this);
      var chairBack = new ChairBack(0, 17.10, 4, this);
      var chairLeg1 = new ChairLeg(3.5, 5.6, 4, this);
      var chairLeg2 = new ChairLeg(3.5, 5.6, -4, this);
      var chairLeg3 = new ChairLeg(-3.5, 5.6, 4, this);
      var chairLeg4 = new ChairLeg(-3.5, 5.6, -4, this);
  }
}
