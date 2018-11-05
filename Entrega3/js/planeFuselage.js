class PlaneFuselage extends Item {
  constructor(x, y, z) {
      'use strict';

      super(x, y, z);

      var material = new THREE.MeshNormalMaterial();
      var geometry = new THREE.CylinderGeometry(6, 3, 10, 4);
      var mesh = new THREE.Mesh(geometry, material);

      this.add(mesh);
      this.position.set(x, y, z);
      this.rotateX(-Math.PI/2);
      this.rotateY(Math.PI/4);
  }
}
