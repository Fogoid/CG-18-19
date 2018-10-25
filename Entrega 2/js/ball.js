class Ball extends Item {

	constructor(x,z,radius,velocity,limit,ID,parent){

		super(x,radius,z);

		this.velocity = velocity;
		this.mass = 1;
		this.radius = radius;
		this.positionX = x;
		this.positionY = radius;
		this.positionZ = z;
		this.limit = limit;
		this.ID = "ball_"+ID;
		this.lastCollision = null;

		this.axes = new THREE.AxisHelper(1.5*radius); 
		this.vectorX = new THREE.Vector3(-1,0,0);
		this.vectorZ = new THREE.Vector3(0,0,1);

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3, wireframe: false});
		var mesh = new THREE.Mesh(geometry,material);

		this.add(mesh);
		this.add(this.axes);

		parent.add(this);
	}

	collision(object){
		
		if(object.mass==-1){
			this.velocity.setComponent(object.limit,-this.velocity.getComponent(object.limit));	
			this.lastCollision = object.ID;
		}

		else{

			if(this.lastCollision==object.ID && object.lastCollision==this.ID)
      			return 0;

    		var velocity1 = this.velocity.clone();
    		var coef = (2*object.mass)/(this.mass + object.mass);

    		this.velocity.set(coef*object.velocity.x,0,coef*object.velocity.z);
    		var coef = (2*this.mass)/(object.mass + this.mass);

    		object.velocity.set(coef*velocity1.x,0,coef*velocity1.z);
    		this.lastCollision = object.ID;
   		 	object.lastCollision = this.ID;
		}
	}

	updatePosition(delta){
		var velocityX = this.velocity.getComponent(0);
		var velocityZ = this.velocity.getComponent(2);

		this.positionX += velocityX*delta;
		this.positionZ += velocityZ*delta;
		var radius = this.radius;
      		
		this.position.set(this.positionX,this.positionY,this.positionZ);

		var angleX = -velocityX*delta/radius;
		var angleZ = -velocityZ*delta/radius;
		console.log(angleX);
		console.log(angleZ);
		this.rotateOnAxis(this.vectorX, angleX);
		this.vectorZ.applyAxisAngle(this.vectorX,-angleX);
		this.rotateOnAxis(this.vectorZ, angleZ);
		this.vectorX.applyAxisAngle(this.vectorZ,-angleZ);
	}

	showAxes(){
		this.axes.visible = !this.axes.visible; 
	}

	increaseVelocity(){
		this.velocity.multiplyScalar(1.15);
	}

	predictMovement(delta){
		var tempPosition = this.position.clone();
		var tempPositionX = this.velocity.getComponent(0)/2;
		var tempPositionZ = this.velocity.getComponent(2)/2;

		tempPosition.add(new THREE.Vector3(tempPositionX*delta,0,tempPositionZ*delta));

		return tempPosition
	}

}