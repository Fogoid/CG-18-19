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

   createRectangle(x, y, z, squareSize, heightSquares, widthSquares, rotation){
    var u = new THREE.Vector3(x,y,z);
    var v = new THREE.Vector3(x+squareSize,y,z);
    var w = new THREE.Vector3(x,y+squareSize,z);
    var z = new THREE.Vector3(x+squareSize,y+squareSize,z);

    var paddingX = new THREE.Vector3(squareSize,0,0);
    var paddingY = new THREE.Vector3(0,squareSize,0);
    var final = new THREE.Geometry();

    for(var i=0; i<widthSquares;i++){
      var triangles = this.createSquare(u,v,w,z);
      for(var j=0; j<heightSquares; j++){
         var copy = new THREE.Geometry();
         copy.copy(triangles);
         copy.translate(0,squareSize*j,0);
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
     var leftTriangle = this.createBigTriangle(x-widthSquaresTop-(widthSquaresBottom-widthSquaresTop)/2, y, z, (heightSquares)*squareSize, (widthSquaresBottom-widthSquaresTop)/2*squareSize, null ,-1);
     var rightTriangle = this.createBigTriangle(x+(widthSquaresTop+(1/3))*squareSize, y, z, (heightSquares)*squareSize, (widthSquaresBottom-widthSquaresTop)/2*squareSize, null,-1);
     final.merge(middleRectangle);

     final.merge(leftTriangle);
     final.merge(rightTriangle);

     if(rotation!=null){
      final.rotateX(rotation.x);
      final.rotateY(rotation.y);
      final.rotateZ(rotation.z);
     }

     return final;
   }

   createTriangleChain(x,y,z,height,bottom,numberOfSquares,rotation,normalOrientation){

    var ratio = height/bottom;

    var base = new THREE.Vector3(x,y,z);
    var topVertex = new THREE.Vector3(x,y+height,z);
    var bottomVertex = new THREE.Vector3(x+bottom,y,z);

    var base_clone = base.clone();
    var topVertex_clone = topVertex.clone();
    var bottomVertex_clone = bottomVertex.clone();

    var diagonalVertex = topVertex.clone();
    diagonalVertex.sub(bottomVertex);
    diagonalVertex.divideScalar(numberOfSquares);

    var diagonal = diagonalVertex.length();

    var unitHeight = Math.sqrt(diagonal);
    unitHeight = unitHeight/(1+ratio);
    var unitWidth = ratio*unitHeight;

    var final = new THREE.Geometry();
    base_clone.set(bottomVertex.x-unitWidth,bottomVertex.y,bottomVertex.z);
    topVertex_clone.set(base_clone.x+unitWidth,base_clone.y+unitHeight,base_clone.z);

    for(var i=0; i<numberOfSquares;i++){
      var triangle = this.createTriangle(base_clone,topVertex_clone,bottomVertex);
      triangle.translate(diagonalVertex.x*i,diagonalVertex.y*i,0);
      final.merge(triangle);
    }

    if(rotation!=null){
      final.rotateX(rotation.x);
      final.rotateY(rotation.y);
      final.rotateZ(rotation.z);
    }
    return final;
   }

   createBigTriangle(x,y,z,height,bottom,rotation,normalOrientation){

    var final = new THREE.Geometry();

    var base = new THREE.Vector3(x,y,z);
    var topVertex = new THREE.Vector3(x,y+height,z);
    var bottomVertex = new THREE.Vector3(x+bottom,y,z);

    if(normalOrientation ==1)
      var triangle = this.createTriangle(base,topVertex,bottomVertex);
    else
      var triangle = this.createTriangle(base,bottomVertex,topVertex);

    final.merge(triangle);

    if(rotation!=null){
      final.rotateX(rotation.x);
      final.rotateY(rotation.y);
      final.rotateZ(rotation.z);
    }
    return final;
   }


  changeMaterial() {
    this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
  }
}
