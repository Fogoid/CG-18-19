class PlaneFuselage extends Item {
  constructor(x, y, z, segments, size) {
    'use strict';

    super(x, y, z);


    var top = super.createRectangle(x,y,z+4,2,segments,size,new THREE.Vector3(-Math.PI/2,-Math.PI/2,0));
    var bottom = super.createRectangle(x,y-6,z,2,segments,size,new THREE.Vector3(-Math.PI/2,-Math.PI/2,Math.PI));
    var left = super.createRectangle(x,y,z,2,segments-1,size,new THREE.Vector3(0,-Math.PI/2,0));
    var right = super.createRectangle(x-20,y,z+6,2,segments-1,size,new THREE.Vector3(0,Math.PI/2,0));
    var front = super.createRectangle(x,y,z+20,2,segments-1,3,null);
    var back = super.createRectangle(x-6,y,z,2,segments-1,3,new THREE.Vector3(0,Math.PI,0));
    
    top.merge(bottom);
    top.merge(left);
    top.merge(right);
    top.merge(front);
    top.merge(back);


    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    this.mesh = new THREE.Mesh(top, this.lambertMaterial);
    this.add(this.mesh);

  }

  changeMaterial() {
    this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
  }

}
