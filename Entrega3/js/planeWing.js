class PlaneWing extends Item {

  constructor(x, y, z, segments, size) {
      'use strict';

       super(x, y, z);
       var u = new THREE.Vector3(x,y,z);
       var v = new THREE.Vector3(x+2,y,z);
       var w = new THREE.Vector3(x,y+2,z);
       var z = new THREE.Vector3(x+2,y+2,z);
       var u_clone = u.clone();
       var v_clone = v.clone();
       var w_clone = w.clone();
       var z_clone = z.clone();

       var padding;

       for(var i=0; i<size;i++){
       	   padding = new THREE.Vector3(0,2,0);
    	   for(var j=0; j<segments; j++){
         	  var triangles = super.createSquare(u_clone,v_clone,w_clone,z_clone);
         	  console.log(u_clone);
         	  console.log(v_clone);
         	  console.log(w_clone);
         	  console.log(z_clone);
         	  var bottom = new THREE.Mesh(triangles[0], new THREE.MeshNormalMaterial());
    		  var top = new THREE.Mesh(triangles[1], new THREE.MeshNormalMaterial());
    		  this.add(bottom);
    		  this.add(top);
    		  u_clone.add(padding);
       		  v_clone.add(padding); 
       		  w_clone.add(padding); 
        	  z_clone.add(padding);
            }

            padding = new THREE.Vector3(2,0,0);
            u.add(padding);
       		v.add(padding); 
       		w.add(padding); 
        	z.add(padding); 
        	u_clone = u.clone();
        	v_clone = v.clone();
        	w_clone = w.clone();
        	z_clone = z.clone();

    	}
    }

}
