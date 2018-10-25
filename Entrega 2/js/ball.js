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
		this.angle = 0;

		this.axes = new THREE.AxisHelper(1.5*radius); 
		this.vectorX = new THREE.Vector3(1,0,0);
		this.vectorZ = new THREE.Vector3(0,0,1);

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3, wireframe: false});
		var mesh = new THREE.Mesh(geometry,material);
		mesh.add(this.axes);

		mesh.position.set(x,radius,z);
		parent.add(mesh);
		this.mesh = mesh;
	}

	collision(object,wallComponent, limit){
		this.lastCollision = object.ID;

		if(object.mass==-1)
			this.velocity.setComponent(wallComponent,-this.velocity.getComponent(wallComponent));
		
		else{

			this.checkNewBallPosition(object, limit);

			var massDifference = (2*object.mass/(this.mass+object.mass));

			var distanceScalar = this.position.distanceToSquared(object.position);

			var distanceVector = this.position.clone();
			distanceVector.sub(object.position);
			distanceVector.multiply(distanceVector);

			var velocityDifference = this.velocity.clone();
			velocityDifference.sub(object.velocity);
		
			var formula = velocityDifference.multiplyScalar(massDifference);
			var angle = distanceVector.divideScalar(distanceScalar);
			formula.multiply(angle);

			this.velocity.sub(formula);
		}
	}

	checkNewBallPosition(object, limit){
		if(object.limit == 'z'){
			var d = (this.radius + limit - this.position.x)/(this.velocity.x);
		}
		else{
			var d = (this.radius + limit - this.position.z)/(this.velocity.z);
		}

		var pos = this.position;
		pos = pos.sub(this.velocity.mul(d));
		this.position.set(pos);
	}

	updatePosition(delta){
		var velocityX = this.velocity.getComponent(0);
		var velocityZ = this.velocity.getComponent(2);

		this.angle += Math.sqrt(Math.pow(velocityX, 2) + Math.pow(velocityZ, 2))*0.5

		this.positionX += velocityX*delta;
		this.positionZ += velocityZ*delta;
		var radius = this.radius;

    	if( this.positionZ <= -this.limit+radius)
      		this.positionZ = -this.limit+radius;

    	if( this.positionZ >= this.limit-radius)
      		this.positionZ = this.limit-radius;

    	if( this.positionX <= -this.limit*2+radius)
      		this.positionX = -this.limit*2+radius;

    	if( this.positionX >= this.limit*2-radius)
    		this.positionX = this.limit*2-radius;
      		
		this.position.set(this.positionX,this.positionY,this.positionZ);
		this.mesh.position.set(this.positionX,this.positionY,this.positionZ);

		this.mesh.rotateOnAxis(this.vectorX, this.angle);

		//this.mesh.rotateOnAxis(this.vectorX, -angleX);
		//this.vectorX.applyAxisAngle(new THREE.Vector3(1,0,0),angleX);

		//this.mesh.rotateOnAxis(this.vectorZ, -angleZ);
		//this.vectorZ.applyAxisAngle(new THREE.Vector3(0,0,1),angleZ);
	}

	showAxes(){
		this.axes.visible = !this.axes.visible; 
	}

	increaseVelocity(){
		this.velocity.multiplyScalar(1.2);
	}
}