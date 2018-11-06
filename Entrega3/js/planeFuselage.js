class PlaneFuselage extends Item {
  constructor(x, y, z, segments, size) {
    'use strict';

    super(x, y, z);

    var squareSize = 2;

    /*var top = super.createRectangle(x, y, z+4, squareSize, segments, size, new THREE.Vector3(-Math.PI/2,-Math.PI/2,0));
    var bottom = super.createRectangle(x, y-6, z, squareSize, segments, size, new THREE.Vector3(-Math.PI/2,-Math.PI/2,Math.PI));
    var left = super.createRectangle(x, y, z, squareSize, segments-1, size, new THREE.Vector3(0,-Math.PI/2,0));
    var right = super.createRectangle(x-20, y, z+6, squareSize, segments-1, size, new THREE.Vector3(0,Math.PI/2,0));
    var front = super.createRectangle(x, y, z+20, squareSize, segments-1, 3, null);
    var back = super.createRectangle(x-6, y, z, squareSize, segments-1, 3, new THREE.Vector3(0,Math.PI,0));
    
    top.merge(bottom);
    top.merge(left);
    top.merge(right);
    top.merge(front);
    top.merge(back);*/

    var top = super.createTrapezoid(x, y, z, squareSize, segments, size, 0, null);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xffb3ba } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xffb3ba } );
    this.mesh = new THREE.Mesh(top, this.lambertMaterial);
    this.add(this.mesh);

  }

  changeMaterial() {
    this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
  }

}
