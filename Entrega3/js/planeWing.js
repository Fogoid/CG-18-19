class PlaneWing extends Item {

  constructor(x, y, z) {
      'use strict';

      super(x, y, z);


      var squareSize = 1;
      var height = 3;
      var width = 10;
      var wingDepth = 15;
      var fuselageWidth = 10;

      var wingTop = super.createTrapezoid(x, y, z, squareSize, wingDepth, width/10, width, new THREE.Vector3(Math.PI/2,0,0), -1);
      wingTop.translate(0,height/2,0);

      var wingBottom = super.createTrapezoid(x, y, z, squareSize, wingDepth, width/10, width, new THREE.Vector3(Math.PI/2,0,0), 1);
      wingBottom.translate(0,-height/2,0);

      var wingFront = super.createRectangle(x-width/20,y-height/2,z, squareSize, height, width/10,null,1);
      wingFront.translate(0,0,wingDepth/2);

      var diagonal = Math.sqrt(Math.pow((width - width/10)/2,2) + Math.pow(wingDepth,2)); 
      var angle = Math.atan(wingDepth/((width - width/10)/2));

      var wingLeft = super.createRectangle(x-diagonal/2,y-height/2,z, squareSize, height, diagonal,new THREE.Vector3(0,angle,0),1);
      wingLeft.translate(width/2-width/5-0.2,0,0);

      var wingRight = super.createRectangle(x-diagonal/2,y-height/2,z, squareSize, height, diagonal,new THREE.Vector3(0,-angle,0),1);
      wingRight.translate(-width/2+width/5+0.2,0,0);
    

      wingTop.merge(wingBottom);
      wingTop.merge(wingFront);
      wingTop.merge(wingLeft);
      wingTop.merge(wingRight);

      var rightWing = wingTop.clone();

      wingTop.rotateY(-Math.PI/2);
      rightWing.rotateY(Math.PI/2);

      wingTop.translate(-(fuselageWidth/2+wingDepth/2),0,0);
      rightWing.translate(fuselageWidth/2+wingDepth/2,0,0);

      wingTop.merge(rightWing);
      this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
      this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
      this.mesh = new THREE.Mesh(wingTop, this.lambertMaterial);
      this.add(this.mesh);
    }

}
