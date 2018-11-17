class chessBoard extends Item{

    constructor(x, y, z, height, width, ang){
        'use strict'

        super(x, y, z);

        var geometry = new THREE.PlaneGeometry(height, width, 100, 100);
        /*var boardTexture = new THREE.TextureLoader().load("textures/chessBoard.png");
        boardTexture.wrapS = THREE.RepeatWrapping;
        boardTexture.wrapT = THREE.RepeatWrapping;
        boardTexture.repeat.set(4,4);*/


        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.phongMaterial = new THREE.MeshPhongMaterial({ /*map: boardTexture,*/ color: 0xffffff, specular: 0x111111 })
        this.mesh = new THREE.Mesh(geometry, this.phongMaterial);
        this.rotation.x = ang;

        this.add(this.mesh);
    }
}