class PlaneCockpit extends Item {
  constructor(x, y, z, heightSquares, widthSquares) {
      'use strict';

       super(x, y, z);

       var squareSize = 1;
       heightSquares = 4;
       widthSquares = 4;

       var middleTop = super.createRectangle(x, y, z+(heightSquares-1)*squareSize, squareSize, heightSquares, widthSquares, new THREE.Vector3(-Math.PI/2,-Math.PI/2,0));
       var middleBottom = super.createRectangle(x, y-heightSquares*squareSize, z, squareSize, heightSquares, widthSquares, new THREE.Vector3(-Math.PI/2,-Math.PI/2,Math.PI));
       var middleLeft = super.createRectangle(x, y, z, squareSize, heightSquares-1, widthSquares, new THREE.Vector3(0,-Math.PI/2,0));
       var middleRight = super.createRectangle(x-widthSquares*squareSize, y, z+heightSquares*squareSize, squareSize, heightSquares-1, widthSquares, new THREE.Vector3(0,Math.PI/2,0));
       var middleFront = super.createRectangle(x, y, z+widthSquares*squareSize, squareSize, heightSquares-1, heightSquares*squareSize, null);

       middleTop.merge(middleBottom);
       middleTop.merge(middleLeft);
       middleTop.merge(middleRight);
       middleTop.merge(middleFront);

       this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
       this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
       this.mesh = new THREE.Mesh(middleTop, this.lambertMaterial);
       this.add(this.mesh);
  }
}
