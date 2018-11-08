class Cloud extends Item{


    constructor(x, y, z) {
        'use strict'

        super(x, y, z);

        
        var geometry = new THREE.PlaneGeometry(60,60);

        this.phongMaterial = new THREE.MeshPhongMaterial();
        this.lambertMaterial = new THREE.MeshLambertMaterial();
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);
        this.add(this.mesh);      
    }
}