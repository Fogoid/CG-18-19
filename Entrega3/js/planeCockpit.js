class PlaneCockpit extends Item {
  constructor(x, y, z, fuselageHeight,fuselageWidth,fuselageDepth) {
  	'use strict';
  	super(x, y, z);

    var squareSize = 1;
    var height = 3;
    var width = 5;
    var depth = 10;
    
    var diagonal = Math.sqrt(Math.pow((width - width/5)/2,2) + Math.pow(height,2));
    var angle = Math.atan(((width-width/5)/2)/height);

    var left = super.createTrapezoid(x, y, z, squareSize, height, width/5, width, new THREE.Vector3(0,Math.PI/2,0), -1);
    left.translate(0,height/2,0);

   	var right = super.createTrapezoid(x, y, z, squareSize, height, width/5, width, new THREE.Vector3(0,Math.PI/2,0), 1);
    right.translate(width/2+width/5,height/2,0);

    var front = super.createRectangle(x,y,z, squareSize, diagonal, width/3*2, new THREE.Vector3(-angle,0,0), 1);
    front.translate(0,-width/17.5,height-0.25);
    
    var back = super.createRectangle(x,y,z, squareSize, diagonal, width/3*2, new THREE.Vector3(angle,0,0), -1);
    back.translate(0,-width/17.5,-height+0.25);

    var top = super.createRectangle(x,y,z, squareSize, width/5, width/3*2, new THREE.Vector3(-Math.PI/2,0,0), 1);
	top.translate(0,height,width/10);

    left.merge(front);
    left.merge(right);
    left.merge(back);
    left.merge(top);

    left.translate(-width/3,fuselageHeight/2,fuselageDepth/3);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    this.mesh = new THREE.Mesh(left, this.lambertMaterial);
    this.add(this.mesh);


  }
}