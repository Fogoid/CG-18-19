class Floor extends Item {
	constructor(x,y,z,size,parent){

		super(x,y,z);

		var geometry = new THREE.CubeGeometry(size*2,0,size);
		var material = new THREE.MeshBasicMaterial({ color: 0x4c334c, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		this.add(mesh);
		parent.add(this);
	}
}
