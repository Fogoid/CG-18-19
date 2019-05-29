class chessBoard extends Item{

    constructor(x, y, z, height, width, ang){
        'use strict'

        super(x, y, z);

        var geometry = new THREE.CubeGeometry(width, height, 2, 100, 100, 100);
        var boardTexture = new THREE.TextureLoader().load("textures/chessBoard.png");
        boardTexture.wrapS = THREE.RepeatWrapping;
        boardTexture.wrapT = THREE.RepeatWrapping;
        boardTexture.repeat.set(1,1);

        this.basicMaterial = new THREE.MeshBasicMaterial( { map: boardTexture, color: 0xffffff } );
        this.phongMaterial = new THREE.MeshPhongMaterial({ map: boardTexture, color: 0xffffff, specular: 0x333333 })
        this.mesh = new THREE.Mesh(geometry, this.phongMaterial);
        this.rotation.x = ang;

        this.add(this.mesh);
    }
}