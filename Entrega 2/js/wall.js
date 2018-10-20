class Wall extends Item {

	constructor(x,y,z,width,height,angle,limit,parent){

		super(x,y+height/2,z);
		this.mass = -1;
		this.velocity = new THREE.Vector3(0,0,0);
		this.hitbox = height/2;
		this.limit=limit;
		this.limitPosition = new THREE.Vector3(Math.abs(x),0,Math.abs(z));

		var geometry = new THREE.CubeGeometry(width,height,0);
		var material = new THREE.MeshBasicMaterial({ color: 0x6699ff, wireframe: false });
		var mesh = new THREE.Mesh(geometry,material);

		mesh.position.set(x,y+height/2,z);
		mesh.rotateY(angle);
		parent.add(mesh);
	}

	checkCollision(ballPositon){
		var ballPos = Math.abs(ballPositon.getComponent(this.limit));
		var wallPos = this.limitPosition.getComponent(this.limit) - this.hitbox; 
		if( ballPos >= wallPos )
			return true;
		return false;  
	}	
}