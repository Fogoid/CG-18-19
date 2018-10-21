class Ball extends Item {

	constructor(x,z,radius,velocity,ID,parent){

		super(x,radius,z);
		this.velocity = velocity;
		this.mass = 1;

		this.positionX = x;
		this.positionY = radius;
		this.positionZ = z;
		this.ID = "ball_"+ID;
		this.lastCollision = null;
		this.axes = new THREE.AxisHelper(1.5*radius); 

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3, wireframe: false});
		var mesh = new THREE.Mesh(geometry,material);
		mesh.add(this.axes);

		mesh.position.set(x,radius,z);
		parent.add(mesh);
		this.mesh = mesh;
	}

	collision(object,wallComponent){
		this.lastCollision = object.ID;

		if(object.mass==-1)
			this.velocity.setComponent(wallComponent,-this.velocity.getComponent(wallComponent));
		
		else{

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
			console.log(this.velocity);
		}
	}

	updatePosition(delta){

		var velocityIncrementX = this.velocity.getComponent(0);
		var velocityIncrementZ = this.velocity.getComponent(2);

		this.positionX += velocityIncrementX*delta;
		this.positionZ += velocityIncrementZ*delta;
		this.position.set(this.positionX,this.positionY,this.positionZ);
		this.mesh.position.set(this.positionX,this.positionY,this.positionZ);
	}

	showAxes(){
		this.axes.visible = !this.axes.visible; 
	}
}