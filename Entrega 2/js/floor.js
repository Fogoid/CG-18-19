class Floor extends Item {
	constructor(x,y,z,size,parent){

		super(x,y,z);

		var geometry = new THREE.CubeGeometry(size*2,0,size);
		var material = new THREE.MeshBasicMaterial({ color: 0x666699, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		mesh.position.set(x,y,z);
		parent.add(mesh);
	}
}