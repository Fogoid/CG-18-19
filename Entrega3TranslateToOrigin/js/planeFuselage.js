class PlaneFuselage extends Item {
  constructor(x, y, z) {
    'use strict';

    super(x, y, z);

    var squareSize = 1;
    var height = 5;
    var width = 10;
    var depth = 20;

    var middleTop = super.createRectangle(x-width/2, y-depth/2, z, squareSize, depth, width,  new THREE.Vector3(Math.PI/2,0,0), -1);
    middleTop.translate(0,height/2,0);
    var middleBot = super.createRectangle(x-width/2, y-depth/2, z, squareSize, depth , width,  new THREE.Vector3(Math.PI/2,0,0), 1);
    middleBot.translate(0,-height/2,0);

    var middleFront = super.createRectangle(x-width/2, y-height/2, z, squareSize, height, width , null,1);
    middleFront.translate(0,0,depth/2);
    var middleBack = super.createRectangle(x-width/2, y-height/2, z, squareSize, height, width , null, -1);
    middleBack.translate(0,0,-depth/2);

    var middleLeft = super.createRectangle(x-depth/2, y-height/2, z, squareSize, height, depth , new THREE.Vector3(0,Math.PI/2,0),-1);
    middleLeft.translate(-width/2,0,0);
    var middleRight = super.createRectangle(x-depth/2, y-height/2, z, squareSize, height, depth , new THREE.Vector3(0,Math.PI/2,0),1);
    middleRight.translate(width/2,0,0);

    middleTop.merge(middleBot);
    middleTop.merge(middleFront);
    middleTop.merge(middleBack);
    middleTop.merge(middleLeft);
    middleTop.merge(middleRight);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xffb3ba } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xffb3ba } );
    this.mesh = new THREE.Mesh(middleTop, this.lambertMaterial);
    this.add(this.mesh);
    console.log(this.position);
  }

}
