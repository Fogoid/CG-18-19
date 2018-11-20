class pausedText extends Item{
    constructor(camera){
        'use strict'

        super(0, 0, -30);


        var geometry = new THREE.PlaneGeometry(15, 7.5);
        var pausedTexture = new THREE.TextureLoader().load("textures/pausedText.png");

        var basicMaterial = new THREE.MeshBasicMaterial( { map: pausedTexture,  transparent:true, opacity:1,color: 0xffffff} );
        this.mesh = new THREE.Mesh(geometry, basicMaterial);

        this.add(this.mesh);

        this.visible = true;

    }

    reset() {
        this.position.set(this.basePosition.x, this.basePosition.y, this.basePosition.z);
    }
}