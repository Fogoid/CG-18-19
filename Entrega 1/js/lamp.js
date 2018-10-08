class LampBase {
  constructor(x, y, z, obj) {
      'use strict';

      var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
      geometry = new THREE.ConeGeometry(4,2,20);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      obj.add(mesh);
  }
}

class LampLightbulb {
  constructor(x, y, z, obj) {
    'use strict';

    geometry = new THREE.SphereGeometry(1,5,5);
    var material = new THREE.MeshBasicMaterial({ color: 0xffefc0, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}

class LampPost {
  constructor(x, y, z, obj) {
    'use strict';

    var material = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: true });
    geometry = new THREE.CylinderGeometry(0.5,0.5,30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    var lightbulb =  new LampLightbulb(0, 15, 0, mesh);
  }
}

class LampLampshade {
  constructor(x, y, z, obj) {
    'use strict';

    geometry = new THREE.CylinderGeometry(3,3,5,30,1,true);
    var material = new THREE.MeshBasicMaterial({ color: 0xa2798f, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}


class Lamp extends Item {
  constructor(x, y, z) {
      'use strict';
      super(x, y, z);

      var lampBase = new LampBase(0, 0.5, 0, this);
      var lampPost = new LampPost(0, 16, 0, this);
      var lampLampshade = new LampLampshade(0, 32, 0, this);
  }
}

