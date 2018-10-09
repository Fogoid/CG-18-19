class LampBase {
  constructor(x, y, z, obj, material) {
      'use strict';

      geometry = new THREE.ConeGeometry(4,2,20);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      obj.add(mesh);
  }
}

class LampLightbulb {
  constructor(x, y, z, obj, material) {
    'use strict';

    geometry = new THREE.SphereGeometry(1,5,5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}

class LampPost {
  constructor(x, y, z, obj, material, lightbulbMaterial) {
    'use strict';

    geometry = new THREE.CylinderGeometry(0.5,0.5,30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    var lightbulb =  new LampLightbulb(0, 15, 0, mesh, lightbulbMaterial);
  }
}

class LampLampshade {
  constructor(x, y, z, obj, material) {
    'use strict';

    geometry = new THREE.CylinderGeometry(3,3,5,30,1,true);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}


class Lamp extends Item {
  constructor(x, y, z) {
      'use strict';
      super(x, y, z);

      var baseMaterial = new THREE.MeshBasicMaterial({ color: 0xdfdfde, wireframe: wireframe_flag });
      var lightbulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffefc0, wireframe: wireframe_flag });
      var lampshadeMaterial = new THREE.MeshBasicMaterial({ color: 0xa2798f, wireframe: wireframe_flag });

      var lampBase = new LampBase(0, 0.5, 0, this, baseMaterial);
      var lampPost = new LampPost(0, 16, 0, this, baseMaterial, lightbulbMaterial);
      var lampLampshade = new LampLampshade(0, 32, 0, this, lampshadeMaterial);
  }
}

