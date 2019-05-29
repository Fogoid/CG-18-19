class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
      this.basePosition = new THREE.Vector3(x, y, z);
      this.Axisx = new THREE.Vector3(1,0,0);
      this.Axisy = new THREE.Vector3(0,1,0);
      this.Axisz = new THREE.Vector3(0,0,1);
  }

  changeWireframe() {
    this.mesh.material.wireframe = !this.mesh.material.wireframe;
  }

  resetWireframe() {
    this.mesh.material.wireframe = false;
  }  

  switchCalculus() {
    this.mesh.material = this.mesh.material == this.phongMaterial ? this.basicMaterial : this.phongMaterial;
  }

  reset() {
    this.position.set(this.basePosition.x, this.basePosition.y, this.basePosition.z);
    this.mesh.material = this.phongMaterial;
    this.resetWireframe();
  }
}
