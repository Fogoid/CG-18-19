class Plane extends Item{


    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        /*this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.SphereGeometry(10, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);*/

        var planeFuselage = new PlaneFuselage(x,y,z,4,8);
        planeFuselage.position.set(-2*2,-2*2,-4*2);
        this.add(planeFuselage);

        var planeLeftWing = new PlaneWing(x,y,z,4,8);
        planeLeftWing.position.set(planeLeftWing.position.x+5,planeLeftWing.position.y,planeLeftWing.position.z);
        this.add(planeLeftWing);


        var planeRightWing = new PlaneWing(x,y,z,4,8);
        planeRightWing.position.set(planeRightWing.position.x-5,planeRightWing.position.y,planeRightWing.position.z);
        this.add(planeRightWing);

        var planeCockpit = new PlaneCockpit(x,y,z,4,8);
        this.add(planeCockpit);        
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
