class Plane extends Item{


    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        var planeFuselage = new PlaneFuselage(x,y,z,5,10,20);
        this.add(planeFuselage);

        var planeWings = new PlaneWing(x,y,z);
        this.add(planeWings);       

        var planeStabilizers = new PlaneStabilizer(x,y,z,5,10,20);
        this.add(planeStabilizers);

        var planeCockpit = new PlaneCockpit(x,y,z,5,10,20);
        this.add(planeCockpit);        
    }

    changeChildrenMaterial() {

        for (var i=0; i < this.children.length; i++) {
          this.children[i].changeMaterial();
        }
    }

    changeChildrenWireframe() {

        for (var i=0; i < this.children.length; i++) {
          this.children[i].changeWireframe();
        }
    }

    switchCalculus(){
        for (var i = 0; i < this.children.length; i++){
            this.children[i].switchCalculus();
        }
    }
    
    makeHorizontalMovement(side, delta){
        this.rotation.set(this.rotation.x, this.rotation.y + side*delta*2, 0);
    }

    makeVerticalMovement(side, delta){
        this.rotation.set(this.rotation.x + side*delta*2, this.rotation.y, 0);
    }
}
