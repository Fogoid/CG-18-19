class PlaneFuselage extends Item {
  constructor(x, y, z, heightSquares, widthSquares) {
    'use strict';

    super(x, y, z);

    var squareSize = 2;
    heightSquares = 6;
    widthSquares = 8;

    var middleTop = super.createRectangle(x, y, z+(heightSquares-1)*squareSize, squareSize, heightSquares, widthSquares, new THREE.Vector3(-Math.PI/2,-Math.PI/2,0));
    var middleBottom = super.createRectangle(x, y-heightSquares*squareSize, z, squareSize, heightSquares, widthSquares, new THREE.Vector3(-Math.PI/2,-Math.PI/2,Math.PI));
    var middleLeft = super.createRectangle(x, y, z, squareSize, heightSquares-1, widthSquares, new THREE.Vector3(0,-Math.PI/2,0));
    var middleRight = super.createRectangle(x-widthSquares*squareSize, y, z+heightSquares*squareSize, squareSize, heightSquares-1, widthSquares, new THREE.Vector3(0,Math.PI/2,0));
    var middleFront = super.createRectangle(x, y, z+widthSquares*squareSize, squareSize, heightSquares-1, heightSquares*squareSize/2, null);
    var middleBack = super.createRectangle(x-heightSquares*squareSize, y, z, squareSize, heightSquares-1, heightSquares*squareSize/2, new THREE.Vector3(0,Math.PI,0));

    middleTop.merge(middleBottom);
    middleTop.merge(middleLeft);
    middleTop.merge(middleRight);
    middleTop.merge(middleFront);
    middleTop.merge(middleBack);

    var frontTop = super.createTrapezoid(x, y, z, squareSize, widthSquares, heightSquares, 2*heightSquares, null);
    middleTop.merge(frontTop);
    //var top = super.createTrapezoid(x, y, z, squareSize, segments, size, 0, null);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xffb3ba } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xffb3ba } );
    this.mesh = new THREE.Mesh(middleTop, this.lambertMaterial);
    this.add(this.mesh);

  }

}
