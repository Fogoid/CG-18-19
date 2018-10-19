class Ball extends Item {

	constructor(x,z,radius,velocity,parent){

		super(x,radius,z);
		this.velocity = velocity;
		console.log(this.velocity);
		this.mass = 1;

		this.positionX = x;
		this.positionY = radius;
		this.positionZ = z;

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3, wireframe: false});
		var mesh = new THREE.Mesh(geometry,material);
		mesh.add(new THREE.AxisHelper(1.5*radius));

		mesh.position.set(x,radius,z);
		parent.add(mesh);
		this.mesh = mesh;
	}

	collision(object){
		var distanceScalar = this.position.distanceToSquared(object.position);
		var massDifference = (2*object.mass/this.mass+object.mass);
		var distanceVector = this.position.sub(object.position);
		distanceVector = distanceVector.multiply(distanceVector); 
		this.velocity.sub((this.velocity.sub(object.velocity)).divideScalar(distanceScalar).multiply(distanceVector).multiplyScalar(massDifference));	
	}

	updatePosition(){
		this.positionX += this.velocity.getComponent(0);
		this.positionZ += this.velocity.getComponent(2);
		this.position.set(this.positionX,this.positionY,this.positionZ);
		this.mesh.position.set(this.positionX,this.positionY,this.positionZ);
	}
}