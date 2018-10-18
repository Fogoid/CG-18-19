class Ball extends Item {

	constructor(x,y,z,radius,parent){

		super(x,y,z);

		var geometry = new THREE.SphereGeometry(radius,32,32)
		var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		mesh.position.set(x,y,z);
		parent.add(mesh);
	}
}