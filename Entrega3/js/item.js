class Item extends THREE.Object3D {
  constructor(x, y, z) {
      'use strict';

      super();
      this.position.set(x, y, z);
      this.Axisx = new THREE.Vector3(1,0,0);
      this.Axisy = new THREE.Vector3(0,1,0);
      this.Axisz = new THREE.Vector3(0,0,1);
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

   createRectangle(x, y, z, squareSize, height, width, rotation, normalOrientation){
    var u = new THREE.Vector3(x,y,z);
    var v = new THREE.Vector3(x+squareSize,y,z);
    var w = new THREE.Vector3(x,y+squareSize,z);
    var z = new THREE.Vector3(x+squareSize,y+squareSize,z);

    var widthSquares = width/squareSize;
    var heightSquares = height/squareSize;

    var paddingX = new THREE.Vector3(squareSize,0,0);
    var paddingY = new THREE.Vector3(0,squareSize,0);
    var final = new THREE.Geometry();
    var triangles;

    for(var i=0; i<widthSquares;i++){
      if(normalOrientation==1)
        triangles = this.createSquare(u,v,w,z);
      else
        triangles = this.createSquare(u,w,v,z);

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

   createTrapezoid(x, y, z, squareSize, height, widthTop, widthBottom, rotation, normalOrientation){
     var final = new THREE.Geometry();

     var middleRectangle = this.createRectangle(x-widthTop/2, y-height/2, z, squareSize, height, widthTop, null,normalOrientation);

     var leftTriangle = this.createBigTriangle(x, y-height/2, z, height, (widthBottom-widthTop)/2, null ,normalOrientation,"left");
     leftTriangle.translate(-(widthTop/2+(widthBottom-widthTop)/2),0,0);

     var rightTriangle = this.createBigTriangle(x, y-height/2, z, height, (widthBottom-widthTop)/2,null,-normalOrientation,"right");
     rightTriangle.translate(widthTop/2,0,0);

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

   createBigTriangle(x,y,z,height,bottom,rotation,normalOrientation,orientation){

    var final = new THREE.Geometry();

    if( orientation == "right"){
      var base = new THREE.Vector3(x,y,z);
      var topVertex = new THREE.Vector3(x,y+height,z);
      var bottomVertex = new THREE.Vector3(x+bottom,y,z);
    }
    else{
      var base = new THREE.Vector3(x+bottom,y,z);
      var topVertex = new THREE.Vector3(x+bottom,y+height,z);
      var bottomVertex = new THREE.Vector3(x,y,z);
    }

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



  changeMaterial() {
    this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
  }
}
