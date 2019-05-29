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
      this.limitX = x+size-height/2;
      this.limitZ = z+size/2-height/2;


      this.walls[0] = new Wall(x,y,-(z+size/2),2*width,height,0,0,this, 2);
      this.walls[1] = new Wall(x,y,z+size/2,2*width,height,0,1,this, 2);
      this.walls[2] = new Wall(-(x+size),y,z,width,height,Math.PI/2,2,this, 0);
      this.walls[3] = new Wall(x+size,y,z,width,height,Math.PI/2,3,this, 0);

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

      var velocityX = Math.random() * (20 + 15) - 17.5;
      var velocityZ = Math.random() * (20 + 15) - 17.5;
      var velocity = new THREE.Vector3(velocityX,0,velocityZ);
  		this.balls[i] = new Ball(x,z,this.radius, velocity,this.limit, i, this);
      ballsCreated++;
    }
  }

  updateCycle(delta){

    this.collisionCycle(delta);
    
    for(var i=0; i<this.ballsNumber; i++){
      this.balls[i].updatePosition(delta);
    }

    
  }

  wallsCollisions(object, nextPosition){
    var positionX = nextPosition.getComponent(0);
    var positionZ = nextPosition.getComponent(2);
    var lastCollision = object.lastCollision;

    if( positionZ <= -this.limitZ && lastCollision!=this.walls[0].ID)
      object.collision(this.walls[0]);
    else if( positionZ >= this.limitZ && lastCollision!=this.walls[1].ID)
      object.collision(this.walls[1]);
    else if( positionX <= -this.limitX && lastCollision!=this.walls[2].ID)
      object.collision(this.walls[2]);
    else if( positionX >= this.limitX && lastCollision!=this.walls[3].ID)
      object.collision(this.walls[3]);

  }

  collisionCycle(delta){
    var squaredRadius = Math.pow(2*this.radius, 2);

    for(var i=0; i<this.ballsNumber; i++){

      var ballPosition = this.balls[i].predictMovement(delta);
      
      this.wallsCollisions(this.balls[i], ballPosition);

      for(var j=i+1; j<this.ballsNumber; j++){
          var distance = ballPosition.distanceToSquared(this.balls[j].predictMovement(delta));
          if(distance <= squaredRadius){
            this.balls[i].collision(this.balls[j]);
          }
        }
      }
    }

  showBallsAxes(){
    for(var i=0; i<this.ballsNumber; i++)
      this.balls[i].showAxes();
  }

  getBall(){
    return this.balls[0];
  }

  increaseBallVelocity(){
    for(var i=0; i<this.ballsNumber; i++)
      this.balls[i].increaseVelocity();
  }

}