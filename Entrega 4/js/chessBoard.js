class chessBoard extends Item{

    constructor(x, y, z, height, width, ang){
        'use strict'

        super(x, y, z);

        var geometry = new THREE.PlaneGeometry(height, width, 100, 100);
        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.phongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111 })
        this.mesh = new THREE.Mesh(geometry, this.phongMaterial);
        this.rotation.x = ang;

        this.add(this.mesh);
    }
}