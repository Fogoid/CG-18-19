class GameBoard extends Item{

  constructor(x, y, z, size) {
      'use strict';

      super(x, y, z);

      this.limit = size;
      this.floor = new Floor(x,y,z,size,this);
      this.walls = [];
      this.balls = [];
      this.ballsNumber = 10;

      var width = size;
      var height = Math.sqrt(5)*size/10;
      console.log(height);
      this.radius = height/2;

      this.walls[0] = new Wall(x,y,-(z+size/2),2*width,height,0,this);
      this.walls[1] = new Wall(x,y,z+size/2,2*width,height,0,this);
      this.walls[2] = new Wall(-(x+size),y,z,width,height,Math.PI/2,this);
      this.walls[3] = new Wall(x+size,y,z,width,height,Math.PI/2,this);

      this.createBalls();
  }

  createBalls(){
  	
  	for(var i=0; i<this.ballsNumber; i++){
  		var x = Math.random() * ((2*this.limit-this.radius) - this.radius) + this.radius - this.limit;
  		var z = Math.random() * ((this.limit-this.radius) - this.radius) + this.radius - this.limit/2;
  		this.balls[i] = new Ball(x,this.radius,z,this.radius,this);
  	}
  }

}