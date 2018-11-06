class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
  }

  createTriangle(u,v,w){
  	var geometry = new THREE.Geometry();
  	geometry.vertices.push(u,v,w);
  	geometry.faces.push( new THREE.Face3(0,1,2));
  	geometry.computeFaceNormals();
	  return geometry;  
  }

   createSquare(u,v,w,z){
  	var triangle1 = this.createTriangle(u,v,w);
  	var triangle2 = this.createTriangle(z,w,v);
    triangle1.merge(triangle2, triangle2.matrix);
    return triangle1;   
  }

   createRectangle(x,y,z,spacing,segments,size,rotation){
    var u = new THREE.Vector3(x,y,z);
    var v = new THREE.Vector3(x+spacing,y,z);
    var w = new THREE.Vector3(x,y+spacing,z);
    var z = new THREE.Vector3(x+spacing,y+spacing,z);

    var paddingX = new THREE.Vector3(spacing,0,0);
    var paddingY = new THREE.Vector3(0,spacing,0);
    var final = new THREE.Geometry();

    for(var i=0; i<size;i++){
      var triangles = this.createSquare(u,v,w,z);
      for(var j=0; j<segments; j++){
         var copy = new THREE.Geometry();
         copy.copy(triangles);
         copy.translate(0,spacing*j,0);
         final.merge(copy);
       }
      u.add(paddingX);
      v.add(paddingX); 
      w.add(paddingX); 
      z.add(paddingX);
    }

    if(rotation!=null){
      final.rotateX(rotation.x);
      final.rotateY(rotation.y);
      final.rotateZ(rotation.z);
    }
    return final; 
   }

   createTrapezoid(x, y, z, squareSize, heightSquares, widthSquaresTop, widthSquaresBottom, rotation){
     var final = new THREE.Geometry();
     var middleRectangle = this.createRectangle(x, y, z, squareSize, heightSquares, widthSquaresTop, null);
     var leftTriangle = this.createTriangleChain(x, y, z, squareSize, heightSquares, widthSquaresTop, null,1);
     var rightTriangle = this.createTriangleChain(x, y, z, squareSize, heightSquares, widthSquaresTop, new THREE.Vector3(Math.PI,0,0),-1);
     final.merge(middleRectangle);

     leftTriangle.translate(0,squareSize*heightSquares,0);
     final.merge(leftTriangle);

     //rightTriangle.translate(0,0,0);
     final.merge(rightTriangle);

     return final;
   }

   createTriangleChain(x,y,z,spacing,segments,size,rotation, normalOrientation){
    var u = new THREE.Vector3(x,y,z);
    var v = new THREE.Vector3(x+spacing,y,z);
    var w = new THREE.Vector3(x,y+spacing,z);
    var z = new THREE.Vector3(x+spacing,y+spacing,z);

    var lastSquare = -1;
    var paddingX = new THREE.Vector3(spacing,0,0);
    var paddingY = new THREE.Vector3(0,spacing,0);
    var final = new THREE.Geometry();

    var square,triangle;

    for(var i=0; i<size;i++){
      if(normalOrientation == 1){
        square = this.createSquare(u,v,w,z);
        triangle = this.createTriangle(u,v,w);
      }
      else {
        square = this.createSquare(u,w,v,z);
        triangle = this.createTriangle(w,v,u);
      }

      for(var j=0; j<i; j++){
         var copy = new THREE.Geometry();
         copy.copy(square);
         copy.translate(0,spacing*j,0);
         final.merge(copy);
         lastSquare = j;
       }
      var copy = new THREE.Geometry();
      copy.copy(triangle);
      copy.rotateZ(Math.PI/2);
      copy.translate(spacing*(lastSquare+2),0,0);
      final.merge(copy); 
      u.add(paddingX);
      v.add(paddingX); 
      w.add(paddingX); 
      z.add(paddingX);
    }

    if(rotation!=null){
      final.rotateX(rotation.x);
      final.rotateY(rotation.y);
      final.rotateZ(rotation.z);
    }
    return final; 
   }


}