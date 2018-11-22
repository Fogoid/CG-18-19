class poolBall extends Item {

	constructor(x,z,radius){
		'use strict'

		super(x,radius+1,z);

		var origin = new THREE.Vector3(0, 0, 0);
		this.radiusToCenter = origin.distanceTo(new THREE.Vector3(x, 0, z));
		this.radius = radius;
		this.theta = 0;
		this.velocity = 1;
		this.updatePosition(this.getRandomDelta());

		var ballTexture = new THREE.TextureLoader().load("textures/ball.png");
		var geometry = new THREE.SphereGeometry(radius,32,32)
		this.basicMaterial = new THREE.MeshBasicMaterial({map: ballTexture, color: 0xdddddd});
		this.phongMaterial = new THREE.MeshPhongMaterial({ map: ballTexture, color: 0x6666666, specular: 0xffffff, shininess: 10 });
		this.mesh = new THREE.Mesh(geometry, this.phongMaterial);

		this.add(this.mesh);

	}

	updatePosition(delta){
		'use strict'

		var prevTheta = this.theta;

		this.theta = this.theta + delta*this.velocity;
		this.position.x = Math.sin(this.theta)*this.radiusToCenter;
		this.position.z = Math.cos(this.theta)*this.radiusToCenter;

		var distance = (this.theta-prevTheta)*this.radiusToCenter;
		var angle = Math.atan2(distance, this.radius);
	
		this.rotation.y = this.theta;
		this.rotation.z -= angle;	
	}

	changeVelocity(){
		'use strict'

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
