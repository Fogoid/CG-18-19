class Wall extends Item {

	constructor(x,y,z,width,height,angle,parent){

		super(x,y,z);

		var geometry = new THREE.CubeGeometry(width,height,0.4);
		var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		mesh.position.set(x,y,z);
		mesh.rotateY(angle);
		parent.add(mesh);
	}	
}