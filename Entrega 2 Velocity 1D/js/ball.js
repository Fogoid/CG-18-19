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


	rotateVelocity(velocity, angle){
		var x = velocity.x * Math.cos(angle) - velocity.z * Math.sin(angle);
		var z = velocity.x * Math.sin(angle) + velocity.z * Math.cos(angle);

        return new THREE.Vector3(x,0,z)
	}

	collision(object){
		
		if(object.mass==-1){
			this.velocity.setComponent(object.limit,-this.velocity.getComponent(object.limit));	
			this.lastCollision = object.ID;
		}

		else{

			if(this.lastCollision==object.ID && object.lastCollision==this.ID)
      			return 0;

      		var vel_DifX = this.velocity.x - object.velocity.x;
            var vel_DifZ = this.velocity.z - object.velocity.z;

            var dist_X = object.position.x - this.position.x;
            var dist_Z = object.position.z - this.position.z;

            var angle = -Math.atan2(dist_Z,dist_X);

            var velocity1D_pre_this = this.rotateVelocity(this.velocity, angle);
            var velocity1D_pre_object = this.rotateVelocity(object.velocity, angle);

            var coef_this = (2*object.mass)/(this.mass + object.mass);
            var coef_object = (2*this.mass)/(object.mass + this.mass);

            var velocity_x_this = velocity1D_pre_this.x - (velocity1D_pre_this.x-velocity1D_pre_object.x)*coef_this;
            var velocity_z_this = velocity1D_pre_this.z;
            var velocity_this = new THREE.Vector3(velocity_x_this,0,velocity_z_this);

            var velocity_x_object = velocity1D_pre_object.x - (velocity1D_pre_object.x-velocity1D_pre_this.x)*coef_object;
            var velocity_z_object = velocity1D_pre_object.z;
            var velocity_object = new THREE.Vector3(velocity_x_object,0,velocity_z_object);

            this.velocity = this.rotateVelocity(velocity_this, -angle);
            object.velocity = this.rotateVelocity(velocity_object, -angle);

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


		this.rotateOnAxis(this.vectorX, angleX);
		this.vectorZ.applyAxisAngle(this.vectorX,-angleX);
		this.rotateOnAxis(this.vectorZ, angleZ);
		this.vectorX.applyAxisAngle(this.vectorZ,-angleZ);
	}

	showAxes(){
		this.axes.visible = !this.axes.visible; 
	}

	increaseVelocity(){
		this.velocity.multiplyScalar(1.1);
	}

	predictMovement(delta){
		var tempPosition = this.position.clone();
		var tempPositionX = this.velocity.getComponent(0)/2;
		var tempPositionZ = this.velocity.getComponent(2)/2;

		tempPosition.add(new THREE.Vector3(tempPositionX*delta,0,tempPositionZ*delta));

		return tempPosition
	}

}