class Ball extends Item {

	constructor(x,z,radius,velocity,parent){

		super(x,radius,z);
		this.velocity = velocity;

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xffd1b3});
		var mesh = new THREE.Mesh(geometry,material);
		this.add(new THREE.AxisHelper(50));

		mesh.position.set(x,radius,z);
		parent.add(mesh);
	}
}