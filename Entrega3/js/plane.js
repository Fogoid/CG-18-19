class Plane extends Item{
    

    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        /*this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.SphereGeometry(10, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);*/



        /*var u = new THREE.Vector3(0,0,0);
        var v = new THREE.Vector3(15,0,0);
        var w = new THREE.Vector3(0,15,0);
        var z = new THREE.Vector3(15,15,0);

        var geometries = super.createSquare(u,v,w,z);

    	var bottom = new THREE.Mesh(geometries[0], new THREE.MeshNormalMaterial() );
    	var top = new THREE.Mesh(geometries[1], new THREE.MeshNormalMaterial() );

        this.add(bottom);
        this.add(top);*/

        this.add(new PlaneWing(x,y,z,1,10))
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