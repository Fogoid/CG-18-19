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

     /*var leftTriangle = this.createBigTriangle(x, y-height/2, z, height, (widthBottom-widthTop)/2, null ,normalOrientation,"left");
     leftTriangle.translate(-(widthTop/2+(widthBottom-widthTop)/2),0,0);

     var rightTriangle = this.createBigTriangle(x, y-height/2, z, height, (widthBottom-widthTop)/2,null,-normalOrientation,"right");
     rightTriangle.translate(widthTop/2,0,0);*/

     var leftTriangle = this.createTriangleChain(x, y-height/2, z, height, (widthBottom-widthTop)/2, null ,20,normalOrientation,"left");
     leftTriangle.translate(-(widthTop/2+(widthBottom-widthTop)/2),0,0);

     var rightTriangle = this.createTriangleChain(x, y-height/2, z, height, (widthBottom-widthTop)/2,null,20,-normalOrientation,"right");
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

   createTriangleChain(x,y,z,height,bottom,rotation,segmentation,normalOrientation,orientation){

    var final = new THREE.Geometry();

    var padding = new THREE.Vector3(0,0,0);

    padding.x = x+bottom/segmentation;
    padding.y = x+height/segmentation;
    var triangle;

    if( orientation == "right"){
      var base = new THREE.Vector3(x,y,z);
      var topVertex = new THREE.Vector3(x,y+padding.y,z);
      var bottomVertex = new THREE.Vector3(x+padding.x,y,z);

      for(var i=0; i<segmentation;i++){
        if(normalOrientation ==1)
          triangle = this.createTriangle(base,topVertex,bottomVertex);
        else
          triangle = this.createTriangle(base,bottomVertex,topVertex);
        final.merge(triangle);
        topVertex.y += padding.y;
        bottomVertex.x += padding.x;
      }
    }

    else{
      var base = new THREE.Vector3(x+padding.x,y,z);
      var topVertex = new THREE.Vector3(x+padding.x,y+padding.y,z);
      var bottomVertex = new THREE.Vector3(x,y,z);

      for(var i=0; i<segmentation;i++){
        if(normalOrientation ==1)
          triangle = this.createTriangle(base,topVertex,bottomVertex);
        else
          triangle = this.createTriangle(base,bottomVertex,topVertex);
        final.merge(triangle);
        topVertex.x += padding.x;
        topVertex.y += padding.y;
        base.x += padding.x;
      }
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
