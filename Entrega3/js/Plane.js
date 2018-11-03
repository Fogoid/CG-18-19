class Plane extends Item{
    

    constructor(x, y, z, base, height) {
        'use strict'

        super(x, y, z);

        this.phongMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
        this.lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var geometry = new THREE.BoxGeometry(5, 5, 20);
        this.mesh = new THREE.Mesh(geometry, this.lambertMaterial);
        
        this.add(this.mesh);

        
    }

    changeMaterial() {
        this.mesh.material = this.mesh.material == this.lambertMaterial ? this.phongMaterial : this.lambertMaterial;
    }
}