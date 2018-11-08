class PlaneCockpit extends Item {
  constructor(x, y, z, fuselageHeight,fuselageWidth,fuselageDepth) {
  	'use strict';
  	super(x, y, z);

    var squareSize = 1;
    var height = 2;
    var width = 10;
    var depth = 8;
    
    var diagonal = Math.sqrt(Math.pow((depth - depth/5)/2,2) + Math.pow(height,2));
    var angle = Math.atan(((depth-depth/5)/2)/height);

    var left = super.createTrapezoid(x, y, z, squareSize, height, depth/5, depth, new THREE.Vector3(0,Math.PI/2,0), -1);
    left.translate(0,height/2,0);

   	var right = super.createTrapezoid(x, y, z, squareSize, height, depth/5, depth, new THREE.Vector3(0,Math.PI/2,0), 1);
    right.translate(width/2+width/5,height/2,0);

    var front = super.createRectangle(x,y,z, squareSize, diagonal, width/3*2, new THREE.Vector3(-angle,0,0), 1);
    front.translate(0,0,depth/2);
    
    var back = super.createRectangle(x,y,z, squareSize, diagonal, width/3*2, new THREE.Vector3(angle,0,0), -1);
    back.translate(0,0,-depth/2);

    var top = super.createRectangle(x,y,z, squareSize, depth/5, width/3*2, new THREE.Vector3(-Math.PI/2,0,0), 1);
	top.translate(0,height,depth/10);

    left.merge(front);
    left.merge(right);
    left.merge(back);
    left.merge(top);

    left.translate(-width/3,fuselageHeight/2,fuselageDepth/3);

    this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x494684 } );
    this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x494684 } );
    this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x494684 } );
    this.lastMaterial = this.lambertMaterial;
    this.mesh = new THREE.Mesh(left, this.lambertMaterial);
    this.add(this.mesh);
  }
}