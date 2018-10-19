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
      this.radius = height/2;

      this.walls[0] = new Wall(x,y,-(z+size/2),2*width,height,0,this);
      this.walls[1] = new Wall(x,y,z+size/2,2*width,height,0,this);
      this.walls[2] = new Wall(-(x+size),y,z,width,height,Math.PI/2,this);
      this.walls[3] = new Wall(x+size,y,z,width,height,Math.PI/2,this);

      this.createBalls();
  }

  createBalls(){
    
    var ballsCreated = 0;
    
    for(var i=0; i<this.ballsNumber; i++){
      var collided = true;
      while(collided){
        var x = Math.random() * ((2*this.limit-this.radius) - this.radius) + this.radius - this.limit;
		    var z = Math.random() * ((this.limit-this.radius) - this.radius) + this.radius - this.limit/2;

        for(var index = 0; index < ballsCreated; index++){
          collided = Math.pow(2.5*this.radius,2)  > Math.pow(this.balls[index].position.x - x, 2) + Math.pow(this.balls[index].position.z - z, 2);
          if(collided){
            break;
          }
        }
        
        if(!i)
          break;
      }

      var velocityX = Math.random() * (2.5 - 0.5) + 0.5 - 1.5;
      var velocityZ = Math.random() * (2.5 - 0.5) + 0.5 - 1.5;
      var velocity = new THREE.Vector3(velocityX,0,velocityZ);
  		this.balls[i] = new Ball(x,z,this.radius, velocity,this);
      ballsCreated++;
    }
  }

  updateCycle(){
    for(var i=0; i<this.ballsNumber; i++){
      //Walls collision

       for(var j=0; j<this.ballsNumber; j++){
          if(i!=j){
            var distance = this.balls[i].position.distanceToSquared(this.balls[j].position);
            var squaredRadius = this.radius*this.radius;
            if(distance < squaredRadius){
              console.log("oi")
            }
          }
       }

      this.balls[i].updatePosition();
    }
  }

}