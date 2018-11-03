class TriangleGeometry extends THREE.Geometry{
    

    constructor(base, height){
        'use strict'

        super();
        
        this.base = base;
        this.height = height;
        this.side = THREE.doubleSide;

        this.vertices.push(

            new THREE.Vector3(base/2, 0, base/2),
            new THREE.Vector3(base/2, 0, -base/2),
            new THREE.Vector3(-base/2, 0, base/2),
            new THREE.Vector3(-base/2, 0, -base/2)

            //new THREE.Vector3(-base/2, 0, 0),
            //new THREE.Vector3(base/2, 0, 0),
            //new THREE.Vector3(0, height, 0),

            //new THREE.Vector3(-base/2, 0, base/2),
            //new THREE.Vector3(base/2, 0, base/2),
            //new THREE.Vector3(0, height, base/2)
        )

        this.faces.push( 
            //new THREE.Face3(0, 1, 2),
            //new THREE.Face3(3, 4, 5),
            new THREE.Face3(0,1,2),
            new THREE.Face3(3,2,1)
            //new THREE.Face4(0, 2, 3, 5)
         );
    }

    
}