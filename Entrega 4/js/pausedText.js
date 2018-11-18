class pausedText extends Item{
    constructor(camera){
        'use strict'

        super(0, 0, 0);


        var geometry = new THREE.PlaneGeometry(40, 20);
        var basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh(geometry, basicMaterial);

        this.add(this.mesh);

        this.visible = false;

    }

    setPosition(camPos){
        this.position.x = camPos.x/2;
        this.position.y = camPos.y/2;
        this.position.z = camPos.z/2;

        this.lookAt(camPos);

    }
}