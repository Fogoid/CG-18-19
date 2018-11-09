class PlaneFuselage extends Item {
  constructor(x, y, z,height,width,depth) {
    'use strict';

    super(x, y, z);

    var squareSize = 1;

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

    var frontTop = super.createTrapezoid(x, y, z, squareSize, height, width/5, width, new THREE.Vector3(Math.PI/2,0,0), -1);
    frontTop.translate(0,height/2,0);

    var frontBottom = super.createTrapezoid(x, y, z, squareSize, height, width/5, width, new THREE.Vector3(Math.PI/2,0,0), 1);
    frontBottom.translate(0,-height/2,0);

    var frontFront = super.createRectangle(x-width/10,y-height/2,z, squareSize, height, width/5,null,1);
    frontFront.translate(0,0,height/2);

    var diagonal = Math.sqrt(Math.pow((width - width/5)/2,2) + Math.pow(height,2)); 
    var angle = Math.atan(height/((width - width/5)/2));

    var frontLeft = super.createRectangle(x-diagonal/2,y-height/2,z, diagonal/10, height, diagonal,new THREE.Vector3(0,angle,0),1);
    frontLeft.translate(width/2-width/5,0,0);

    var frontRight = super.createRectangle(x-diagonal/2,y-height/2,z, diagonal/10, height, diagonal,new THREE.Vector3(0,-angle,0),1);
    frontRight.translate(-width/2+width/5,0,0);
    

    frontTop.merge(frontBottom);
    frontTop.merge(frontFront);
    frontTop.merge(frontLeft);
    frontTop.merge(frontRight);

    var backTop = frontTop.clone();
    backTop.rotateX(Math.PI);

    frontTop.translate(0,0,depth/2+height/2);
    backTop.translate(0,0,-(depth/2+height/2));

    middleTop.merge(frontTop);
    middleTop.merge(backTop);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x885480, specular: 0x111111, shininess: 30 } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x885480 } );
    this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x885480 } );
    this.lastMaterial = this.lambertMaterial;
    this.mesh = new THREE.Mesh(middleTop, this.lambertMaterial);
    this.add(this.mesh);

  }

}
