class Plane extends Item{
    

    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        /*this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.SphereGeometry(10, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);*/

        this.add(new PlaneFuselage(x,y,z,3,10));
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