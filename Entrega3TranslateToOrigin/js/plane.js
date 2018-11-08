class Plane extends Item{


    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        /*this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.SphereGeometry(10, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);*/

        var planeFuselage = new PlaneFuselage(x,y,z);
        this.add(planeFuselage);       
    }

    changeChildrenMaterial() {

        for (var i=0; i < this.children.length; i++) {
          this.children[i].changeMaterial();
        }
    }

    makeHorizontalMovement(side, delta){
        this.rotation.set(this.rotation.x, this.rotation.y + side*delta*2, 0);
    }

    makeVerticalMovement(side, delta){
        this.rotation.set(this.rotation.x + side*delta*2, this.rotation.y, 0);
    }
}
