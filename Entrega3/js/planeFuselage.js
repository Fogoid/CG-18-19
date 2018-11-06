class PlaneFuselage extends Item {
  constructor(x, y, z, segments, size) {
    'use strict';

    super(x, y, z);

    var squareSize = 2;

    var top = super.createRectangle(x, y, z+(segments-1)*squareSize, squareSize, segments, size, new THREE.Vector3(-Math.PI/2,-Math.PI/2,0));
    var bottom = super.createRectangle(x, y-segments*squareSize, z, squareSize, segments, size, new THREE.Vector3(-Math.PI/2,-Math.PI/2,Math.PI));
    var left = super.createRectangle(x, y, z, squareSize, segments-1, size, new THREE.Vector3(0,-Math.PI/2,0));
    var right = super.createRectangle(x-size*squareSize, y, z+segments*squareSize, squareSize, segments-1, size, new THREE.Vector3(0,Math.PI/2,0));
    var front = super.createRectangle(x, y, z+size*squareSize, squareSize, segments-1, segments*squareSize/2, null);
    var back = super.createRectangle(x-segments*squareSize, y, z, squareSize, segments-1, segments*squareSize/2, new THREE.Vector3(0,Math.PI,0));
    
    top.merge(bottom);
    top.merge(left);
    top.merge(right);
    top.merge(front);
    top.merge(back);

    //var top = super.createTrapezoid(x, y, z, squareSize, segments, size, 0, null);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xffb3ba } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xffb3ba } );
    this.mesh = new THREE.Mesh(top, this.lambertMaterial);
    this.add(this.mesh);

  }

}
