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


      this.walls[0] = new Wall(x,y,-(z+size/2),2*width,height,0,0,this);
      this.walls[1] = new Wall(x,y,z+size/2,2*width,height,0,1,this);
      this.walls[2] = new Wall(-(x+size),y,z,width,height,Math.PI/2,2,this);
      this.walls[3] = new Wall(x+size,y,z,width,height,Math.PI/2,3,this);

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
  		this.balls[i] = new Ball(x,z,this.radius, velocity, i, this);
      ballsCreated++;
    }
  }

  updateCycle(delta){

    for(var i=0; i<this.ballsNumber; i++)
      this.balls[i].updatePosition(delta);

    this.collisionCycle(delta);
    
  }

  wallsCollisions(object){
    var positionX = object.position.getComponent(0);
    var positionZ = object.position.getComponent(2);
    var lastCollision = object.lastCollision;

    if( positionZ <= -this.limitZ && lastCollision!=this.walls[0].ID)
      object.collision(this.walls[0],2);
    else if( positionZ >= this.limitZ && lastCollision!=this.walls[1].ID)
      object.collision(this.walls[1],2);
    else if( positionX <= -this.limitX && lastCollision!=this.walls[2].ID)
      object.collision(this.walls[2],0);
    else if( positionX >= this.limitX && lastCollision!=this.walls[3].ID)
      object.collision(this.walls[3],0);

  }

  ballsCollided(a, b, delta){

    a.position.set(a.position.x - a.velocity.x*delta, 0, a.position.z - a.velocity.z*delta);
    b.position.set(b.position.x - b.velocity.x*delta, 0, b.position.z - b.velocity.z*delta);

    var posa = new THREE.Vector3(a.position.x - b.position.x, 0, a.position.z - b.position.z);
    var vela = new THREE.Vector3(a.velocity.x - b.velocity.x, 0, a.velocity.z - b.velocity.z);
    var dot = vela.dot(posa);
    var distance = a.position.distanceToSquared(b.position);
    var coef = ((2*b.mass)*dot)/((a.mass + b.mass)*distance);
    a.velocity.set(a.velocity.x - coef*posa.x, 0, a.velocity.z - coef*posa.z);

    posb = new THREE.Vector3(b.position.x - a.position.x, 0, b.position.z - a.position.z);
    velb = new THREE.Vector3(b.velocity.x - a.velocity.x, 0, b.velocity.z - a.velocity.z);
    dot = velb.dot(posb);
    distance = pos.lengthSq();
    coef = ((2*a.mass)*dot)/((b.mass + a.mass)*distance);
    b.velocity.set(b.velocity.x - coef*posb.x, 0, b.velocity.z - coef*posb.z);
  }

  ballsCollidedCool(a, b, delta){
    if(a.lastCollision==b && b.lastCollision==a)
      return 0;

    var velocity1 = a.velocity.clone();
    var coef = (2*b.mass)/(a.mass + b.mass)
    a.velocity.set(coef*b.velocity.x,coef*b.velocity.y,coef*b.velocity.z);
    var coef = (2*a.mass)/(b.mass + a.mass)
    b.velocity.set(coef*velocity1.x,coef*velocity1.y,coef*velocity1.z);
    a.lastCollision = b;
    b.lastCollision = a;
  }

  collisionCycle(delta){
    var squaredRadius = Math.pow(2*this.radius, 2);

    for(var i=0; i<this.ballsNumber; i++){

      this.wallsCollisions(this.balls[i]);
      var ballPosition = this.balls[i].position;

      for(var j=i+1; j<this.ballsNumber; j++){
          var distance = ballPosition.distanceToSquared(this.balls[j].position);
          if(distance <= squaredRadius){
            this.ballsCollidedCool(this.balls[i], this.balls[j], delta);
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