class pausedText extends Item{
    constructor(camera){
        'use strict'

        super(0, 0, 0);


        var geometry = new THREE.PlaneGeometry(40, 20);
        var phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0x111111 });
        this.mesh = new THREE.Mesh(geometry, phongMaterial);

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