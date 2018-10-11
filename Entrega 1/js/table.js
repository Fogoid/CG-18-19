class TableTop extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
    geometry = new THREE.CubeGeometry(40, 2, 16);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}

class TableLeg extends Item {
  constructor(x, y, z, obj, material) {
    'use strict';

    super(x, y, z);
    geometry = new THREE.CylinderGeometry(1,1,15,15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
  }
}

class Table extends Item {
  constructor(x, y, z) {
      'use strict';

      super(x, y, z);

      var topMaterial = new THREE.MeshBasicMaterial({ color: 0xbe9b7b, wireframe: wireframe_flag });
      var legMaterial = new THREE.MeshBasicMaterial({ color: 0x9a8470, wireframe: wireframe_flag });

      var tableTop = new TableTop(0, 16, 0, this, topMaterial);
      var tableLeg1 = new TableLeg(-18, 7.5, -6, this, legMaterial);
      var tableLeg2 = new TableLeg(18, 7.5, -6, this, legMaterial);
      var tableLeg3 = new TableLeg(-18, 7.5, 6, this, legMaterial);
      var tableLeg4 = new TableLeg(18, 7.5, 6, this, legMaterial);

      this.add(tableTop);
      this.add(tableLeg1);
      this.add(tableLeg2);
      this.add(tableLeg3);
      this.add(tableLeg4);
  }
}
