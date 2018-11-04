class spotLight extends Item{
    constructor(x, y, z){
        'use strict'

        super(x, y, z);

        var coneGeometry = new THREE.ConeGeometry(2, 30);
        var coneMaterial = new THREE.MeshBasicMaterial( 0x0000ff );
        this.cone = new THREE.Mesh(coneGeometry, coneMaterial);
        
        var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial( 0x0000ff );
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.set(0, 15, 0);
        this.sphere.material.emissive.set( 0xffffff );
        
        this.light = new THREE.SpotLight( 0xffffff, 1, 60, Math.PI / 6);
        this.light.position.set(0, 10, 0);

        this.add(this.cone);
        this.add(this.sphere);
        this.add(this.light);
        
    }

    turnOnOff(){

        this.light.intensity = this.light.intensity == 0 ? 1 : 0;
        this.sphere.material.emissiveIntensity = this.sphere.material.emissiveIntensity == 0 ? 1 : 0;
    }
}