class spotLight extends Item{
    constructor(x, y, z,rotation){
        'use strict'

        super(x, y, z);

        var coneGeometry = new THREE.ConeGeometry(3.5, 7, 64, 64);
        var coneMaterial = new THREE.MeshBasicMaterial( {color: 0xD3D3D3} );
        this.cone = new THREE.Mesh(coneGeometry, coneMaterial);
        this.cone.position.set(0,0,0);
        
        var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        this.sphereLambertMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, emissive: 0xffffff });
        this.spherePhongMaterial = new THREE.MeshPhongMaterial( { color: 0x193D66, specular: 0x111111, shininess: 30, emissive: 0xffffff } );
        this.sphereBasicMaterial = new THREE.MeshBasicMaterial( 0xffffff );
        this.lastMaterial = this.sphereLambertMaterial;
        this.sphere = new THREE.Mesh(sphereGeometry, this.sphereLambertMaterial);
        this.sphere.position.set(0, -3.5, 0);
        
        this.light = new THREE.SpotLight( 0xffffff, 1, 60, Math.PI / 6);
        this.light.position.set(0, -3.5, 0);

        this.add(this.cone);
        this.add(this.sphere);
        this.add(this.light);

        if(rotation!=null){
          this.rotateX(rotation.x);
          this.rotateY(rotation.y);
          this.rotateZ(rotation.z);
        }
    }

    turnOnOff(){
        this.light.intensity = this.light.intensity == 0 ? 1 : 0;
        this.sphere.material.emissiveIntensity = this.sphere.material.emissiveIntensity == 0 ? 1 : 0;
    }
    
    changeMaterial(){
        this.sphere.material = this.sphere.material == this.sphereLambertMaterial ? this.spherePhongMaterial : this.sphereLambertMaterial;
    }

    switchCalculus(){
        this.sphere.material = this.sphere.material == this.lastMaterial ? this.sphereBasicMaterial : this.lastMaterial;
    }
}