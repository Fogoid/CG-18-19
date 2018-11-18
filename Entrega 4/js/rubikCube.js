class rubikCube extends Item{
    constructor(x, z, base, height, width){
        'use strict'

        super(x, height/2, z);

        var geometry = new THREE.CubeGeometry(base, height, width, 20, 20, 20);
        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        this.phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0x111111 });
        this.mesh = new THREE.Mesh(geometry, this.phongMaterial);

        this.add(this.mesh);

    }
}