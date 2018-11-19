class poolBall extends Item {

	constructor(x,z,radius){
		'use strict'

		super(x,radius,z);

		var origin = new THREE.Vector3(0, 0, 0);
		this.radiusToCenter = origin.distanceTo(new THREE.Vector3(x, 0, z));
		this.radius = radius;
		this.theta = Math.PI / 2
		this.velocity = 1;
		this.updatePosition(this.getRandomDelta());

		var ballTexture = new THREE.TextureLoader().load("textures/ball.png");
		var geometry = new THREE.SphereGeometry(radius,32,32)
		this.basicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffbd});
		this.phongMaterial = new THREE.MeshPhongMaterial({ map: ballTexture, color: 0xffffbd, specular: 0xffffff });
		this.mesh = new THREE.Mesh(geometry, this.phongMaterial);

		this.add(this.mesh);

	}

	updatePosition(delta){
		'use strict'

		this.theta = this.theta + delta*this.velocity;
		this.position.x = Math.cos(this.theta)*this.radiusToCenter;
		this.position.z = Math.sin(this.theta)*this.radiusToCenter;
	}

	changeVelocity(){
		this.velocity = this.velocity == 1 ? 0 : 1;
	}

	reset(){
		super.reset();
		this.theta = Math.PI / 2;
		this.updatePosition(this.getRandomDelta());
		this.velocity = 1;

	}

	getRandomDelta(){
		return Math.random()*6.3;
	}
}
