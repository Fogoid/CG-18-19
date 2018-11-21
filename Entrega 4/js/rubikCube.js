class rubikCube extends Item{
    constructor(x, z, base, height, width){
        'use strict'

        super(x, height/2+1, z);

        var textureCubeLeft = new THREE.TextureLoader().load("textures/cubeLeft.png");
		var textureCubeRight = new THREE.TextureLoader().load("textures/cubeRight.png");
		var textureCubeTop = new THREE.TextureLoader().load("textures/cubeTop.png");
		var textureCubeBottom = new THREE.TextureLoader().load("textures/cubeBottom.png");
		var textureCubeFront = new THREE.TextureLoader().load("textures/cubeFront.png");
		var textureCubeBack = new THREE.TextureLoader().load("textures/cubeBack.png");

		var bump = new THREE.TextureLoader().load("textures/bump.png");

		var cubeFacesPhong = 
		[
        	new THREE.MeshPhongMaterial({ map: textureCubeLeft, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false }),
        	new THREE.MeshPhongMaterial({ map: textureCubeRight, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false }),
        	new THREE.MeshPhongMaterial({ map: textureCubeTop, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false }),
        	new THREE.MeshPhongMaterial({ map: textureCubeBottom, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false }),
        	new THREE.MeshPhongMaterial({ map:  textureCubeFront, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false }),
        	new THREE.MeshPhongMaterial({ map: textureCubeBack, bumpMap: bump, color: 0xffffff, specular: 0x333333, wireframe: false })
		];
        this.phongMaterial = new THREE.MeshFaceMaterial(cubeFacesPhong);
		
		var cubeFacesBasic = 
		[
        	new THREE.MeshBasicMaterial({ map: textureCubeLeft, color: 0xffffff }),
        	new THREE.MeshBasicMaterial({ map: textureCubeRight, color: 0xffffff }),
        	new THREE.MeshBasicMaterial({ map: textureCubeTop, color: 0xffffff }),
        	new THREE.MeshBasicMaterial({ map: textureCubeBottom, color: 0xffffff }),
        	new THREE.MeshBasicMaterial({ map: textureCubeFront, color: 0xffffff }),
        	new THREE.MeshBasicMaterial({ map: textureCubeBack, color: 0xffffff })
		];
        this.basicMaterial = new THREE.MeshFaceMaterial(cubeFacesBasic);

        console.log(this.basicMaterial);
        
        var geometry = new THREE.CubeGeometry(base, height, width, 20, 20, 20);
        
        this.mesh = new THREE.Mesh(geometry, this.phongMaterial);
        this.add(this.mesh);

    }

    changeWireframe() {
        for(var i=0; i<6; i++)
            this.mesh.material.materials[i].wireframe = !this.mesh.material.materials[i].wireframe;
    }

    resetWireframe() {
        for(var i=0; i<6; i++)
            this.mesh.material.materials[i].wireframe = false;
    }  
}