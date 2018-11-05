class Plane extends Item{
    

    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.SphereGeometry(10, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);

        /*var geometry = new THREE.Geometry();

    	geometry.vertices.push(
    		new THREE.Vector3(0,0,0),
    		new THREE.Vector3(0,15,0),
    		new THREE.Vector3(0,0,15),
    		new THREE.Vector3(0,15,15)
    	);

    	geometry.faces.push(
    		new THREE.Face3(0,1,2),
    		new THREE.Face3(3,2,1)
    	);

    	this.mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
    	geometry.computeFaceNormals();*/

        this.add(this.mesh);
    }

    changeMaterial() {
        this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
    }

    makeHorizontalMovement(side, delta){
        this.rotation.set(this.rotation.x, this.rotation.y + side*delta*2, 0);
    }

    makeVerticalMovement(side, delta){
        this.rotation.set(this.rotation.x + side*delta*2, this.rotation.y, 0);
    }
}