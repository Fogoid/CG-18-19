class Ball extends Item {

	constructor(x,z,radius,velocity,parent){

		super(x,radius,z);
		this.velocity = velocity;

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3, wireframe: false});
		var mesh = new THREE.Mesh(geometry,material);
		mesh.add(new THREE.AxisHelper(1.5*radius));

		mesh.position.set(x,radius,z);
		parent.add(mesh);
	}

	collided(radius, distance){
		if (distance < radius)
			return true;
		else
			return false;			
		
	}
}