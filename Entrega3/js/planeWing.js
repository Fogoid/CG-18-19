class PlaneWing extends Item {

  constructor(x, y, z, segments, size) {
      'use strict';

       super(x, y, z);

       /*var rectangle = super.createRectangle(x,y,z,2,segments,size,null);
       var rectangle = super.createRectangle(x,y,z,2,segments,size,null);
       var rectangle = super.createRectangle(x,y,z,2,segments,size,null);
       var rectangle = super.createRectangle(x,y,z,2,segments,size,null);*/

       var square = new THREE.Mesh(rectangle, new THREE.MeshNormalMaterial());
       this.add(square);
    }

}
