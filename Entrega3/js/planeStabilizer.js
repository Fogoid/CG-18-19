class PlaneStabilizer extends Item {
  constructor(x, y, z,fuselageHeight,fuselageWidth,fuselageDepth) {
      'use strict';

      super(x, y, z);

      var squareSize = .2;
      var height = 3;
      var width = 1;
      var depth = 4;
      var angle = Math.atan(fuselageHeight/((fuselageWidth - fuselageWidth/5)/2));

      var diagonal = Math.sqrt(Math.pow(height,2) + Math.pow(depth,2)); 
      var angle = Math.atan(height/depth);

      var stabilizerFront = super.createRectangle(x-width/2, y-diagonal/2, z, squareSize, diagonal, width, new THREE.Vector3(-(Math.PI/2-angle),0,0), 1);
	stabilizerFront.translate(0,(3*y+height)/6,(3*x+depth)/6);

	var stabilizerLeft = super.createBigTriangle(x-(3*x+depth)/3, y-(3*y+height)/3, z, height, depth, new THREE.Vector3(0,-Math.PI/2,0), -1,"right");
	stabilizerLeft.translate(-width/2,0,0);

      var stabilizerRight = super.createBigTriangle(x-(3*x+2*depth)/3, y-(3*y+height)/3, z, height, depth, new THREE.Vector3(0,Math.PI/2,0), 1);
      stabilizerRight.translate(width/2,0,0);

      var stabilizerBack = super.createRectangle(x-width/2, y-height/2, z, squareSize, height, width, new THREE.Vector3(0,0,0), -1);
      stabilizerBack.translate(0,(3*y+height)/6,-(3*x+2*depth)/6);

      stabilizerFront.merge(stabilizerLeft);
      stabilizerFront.merge(stabilizerRight);
      stabilizerFront.merge(stabilizerBack);

      stabilizerFront.translate(0,fuselageHeight/2,-(fuselageDepth/2+fuselageHeight/2));



      var leftStabilizerFront = super.createRectangle(x-width/2, y-diagonal/2, z, squareSize, diagonal, width, new THREE.Vector3(-(Math.PI/2-angle),0,0), 1);
      leftStabilizerFront.translate(0,(3*y+height)/6,(3*x+depth)/6);

      var leftStabilizerLeft = super.createBigTriangle(x-(3*x+depth)/3, y-(3*y+height)/3, z, height, depth, new THREE.Vector3(0,-Math.PI/2,0), -1,"right");
      leftStabilizerLeft.translate(-width/2,0,0);

      var leftStabilizerRight = super.createBigTriangle(x-(3*x+2*depth)/3, y-(3*y+height)/3, z, height, depth, new THREE.Vector3(0,Math.PI/2,0), 1);
      leftStabilizerRight.translate(width/2,0,0);

      var leftStabilizerBack = super.createRectangle(x-width/2, y-height/2, z, squareSize, height, width, new THREE.Vector3(0,0,0), -1);
      leftStabilizerBack.translate(0,(3*y+height)/6,-(3*x+2*depth)/6);
      
      leftStabilizerFront.merge(leftStabilizerLeft);
      leftStabilizerFront.merge(leftStabilizerRight);
      leftStabilizerFront.merge(leftStabilizerBack);

      leftStabilizerFront.scale(1,1.5,1.5);
      var rightStabilizerFront = leftStabilizerFront.clone();      

      leftStabilizerFront.rotateZ(Math.PI/2);
      leftStabilizerFront.rotateX(Math.PI);
      leftStabilizerFront.rotateY(-angle);
      leftStabilizerFront.translate(-depth,0,-12.5);

      rightStabilizerFront.rotateZ(-Math.PI/2);
      rightStabilizerFront.rotateX(-Math.PI);
      rightStabilizerFront.rotateY(angle);
      rightStabilizerFront.translate(depth,0,-12.5);

      stabilizerFront.merge(leftStabilizerFront);
      stabilizerFront.merge(rightStabilizerFront);

      this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x193D66, specular: 0x111111, shininess: 30 } );
      this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x193D66 } );
      this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x193D66 } );
      this.lastMaterial = this.lambertMaterial;
      this.mesh = new THREE.Mesh(stabilizerFront, this.lambertMaterial);
      this.add(this.mesh);

  }
}
