class Wall extends Item {

	constructor(x,y,z,width,height,angle,ID,parent, limit){

		super(x,y+height/2,z);
		this.mass = -1;
		this.velocity = new THREE.Vector3(0,0,0);
		this.hitbox = height/2;
		this.ID = "wall_" + ID;
		this.limit = limit;

		var geometry = new THREE.CubeGeometry(width,height,0);
		var material = new THREE.MeshBasicMaterial({ color: 0x6699ff, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		this.add(mesh);
		this.rotateY(angle);
		parent.add(this);
	}
}