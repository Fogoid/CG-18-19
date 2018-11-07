class PlaneStabilizer extends Item {
  constructor(x, y, z,fuselageHeight,fuselageWidth,fuselageDepth) {
      'use strict';

      super(x, y, z);

      var squareSize = 1;
      var height = 3;
      var width = 2;
      var depth = 4;
      var fuselageWidth = 10;
      var fuselageHeight = 5;
      var fuselageDepth = 20;
      var angle = Math.atan(fuselageHeight/((fuselageWidth - fuselageWidth/5)/2));

      var diagonal = Math.sqrt(Math.pow(height,2) + Math.pow(depth,2)); 
      //var diagonal=5;
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

      var stabilizerLeft = stabilizerFront.clone();
      var stabilizerRight = stabilizerFront.clone();

      stabilizerFront.translate(0,fuselageHeight/2,0);

      stabilizerLeft.rotateZ(Math.PI/2);
      stabilizerLeft.rotateY(-angle);
      stabilizerLeft.translate(-(fuselageWidth/2-fuselageWidth/10),0,0);

      
      stabilizerRight.rotateZ(-Math.PI/2);
      stabilizerRight.rotateY(angle);
      stabilizerRight.translate(fuselageWidth/2-fuselageWidth/10,0,0);

      stabilizerFront.merge(stabilizerLeft);
      stabilizerFront.merge(stabilizerRight);

      stabilizerFront.translate(0,0,-(fuselageDepth/2+fuselageHeight/2));

      this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
      this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
      this.mesh = new THREE.Mesh(stabilizerFront, this.lambertMaterial);
      this.add(this.mesh);

  }
}
