function Player(x, y, world) {
  // store the player position
  this.x = x;
  this.y = y;

  // store a reference to our "world" object - we will ask the world to tell us about
  // tiles that are in our path
  this.world = world;

  // load & store our artwork

  this.cDown = [];
  this.cUp = [];
  this.cLeft = [];
  this.cRight = [];

  

  this.currentDirection = this.cRight;
  

  // define our speed
  this.speed = 4;

  // display our player
  this.display = function() {
    imageMode(CORNER);

    image(this.currentDirection[currentFrame],width/2, height/2,36,48)
    
 
  }

  this.cycleImages = function(){
    times += 1;
    if (times==5){
      times = 0
      currentFrame += 1
    }
    
    if (currentFrame >= this.currentDirection.length) {
      currentFrame = 0;
    }
  }

  // display "sensor" positions
  this.displaySensor = function(direction) {
    fill(255,0);
    noStroke()
    if (direction == "up") {
      ellipse(this.top[0], this.top[1], 5, 5);
    } 
    else if (direction == "down") {
      ellipse(this.bottom[0], this.bottom[1], 5, 5);
    } 
    else if (direction == "right") {
      ellipse(this.right[0], this.right[1], 5, 5);
    } 
    else if (direction == "left") {
      ellipse(this.left[0], this.left[1], 5, 5);
    }
  }

  // set our sensor positions (computed based on the position of the character and the
  // size of our graphic)
  this.refreshSensors = function() {
    this.left = [this.x, this.y+24];
    this.right = [this.x+36, this.y+24];
    this.top = [this.x+18, this.y+20];
    this.bottom = [this.x+18, this.y+48];

    this.realLeft = [this.realX-18,this.realY];
    this.realRight = [this.realX+18,this.realY];
    this.realTop = [this.realX,this.realY-24];
    this.realBottom = [this.realX,this.realY+24];
  }

  // move our character
  this.move = function() {
    // set the real position from the overheadworld
    this.realX = world.realX;
    this.realY = world.realY; 

    // refresh our "sensors" - these will be used for movement & collision detection
    this.refreshSensors();

    // see if one of our movement keys is down -- if so, we should try and move
    // note that this character responds to the following key combinations:
    // WASD
    // wasd
    // The four directional arrows
    if (keyIsDown(LEFT_ARROW) || keyIsDown(97) || keyIsDown(65)) {
      this.cycleImages();
      // see which tile is to our left
      var tile = world.getTile(this.left[0], this.left[1]);
      // see if near sea
      if(tile == 14){
        fishingEnable();
      }
      else {
        fishingDisable();
      }
      // is this tile solid?
      if (!world.isTileSolid(tile) && 
      this.frontTree(this.realLeft[0], this.realLeft[1])!="close" &&
      this.frontStore(this.realLeft[0], this.realLeft[1])!="close" &&
      this.frontMuseum(this.realLeft[0], this.realLeft[1])!="close"
      ) {
        // request that the WORLD move to the right
        this.world.moveRight(this.speed);
      }

      // change artwork
      this.currentDirection = this.cLeft;
      this.displaySensor("left");
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(100) || keyIsDown(68)) {
      this.cycleImages();
      // see which tile is to our right
      var tile = world.getTile(this.right[0], this.right[1]);
      // see if near sea
      if(tile == 18){
        fishingEnable();
      }
      else {
        fishingDisable();
      }
      // is this tile solid?
      if (!world.isTileSolid(tile) && 
      this.frontTree(this.realRight[0], this.realRight[1])!="close" &&
      this.frontStore(this.realRight[0], this.realRight[1])!="close" &&
      this.frontMuseum(this.realRight[0], this.realRight[1])!="close"
      ) {
        // request that the WORLD move to the left
        this.world.moveLeft(this.speed);
      }

      // change artwork
      this.currentDirection = this.cRight;
      this.displaySensor("right");
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(115) || keyIsDown(83)) {
      this.cycleImages();
      // see which tile is below us
      var tile = world.getTile(this.bottom[0], this.bottom[1]);
      // see if near sea
      if(tile == 20){
        fishingEnable();
      }
      else {
        fishingDisable();
      }
      // is this tile solid?
      if (!world.isTileSolid(tile) && 
      this.frontTree(this.realBottom[0], this.realBottom[1])!="close" &&
      this.frontStore(this.realBottom[0], this.realBottom[1])!="close" &&
      this.frontMuseum(this.realBottom[0], this.realBottom[1])!="close"
      ) {
        // request that the WORLD move up
        this.world.moveUp(this.speed);
      }

      // change artwork
      this.currentDirection = this.cDown;
      this.displaySensor("down");
    }    
    if (keyIsDown(UP_ARROW) || keyIsDown(119) || keyIsDown(87)) {
      this.cycleImages();
      // see which tile is below us
      var tile = world.getTile(this.top[0], this.top[1]);
      // see if near sea
      if(tile == 16){
        fishingEnable();
      }
      else {
        fishingDisable();
      }
      // is this tile solid?
      if (!world.isTileSolid(tile) && 
      this.frontTree(this.realTop[0], this.realTop[1])!="close" &&
      this.frontStore(this.realTop[0], this.realTop[1])!="close" &&
      this.frontMuseum(this.realTop[0], this.realTop[1])!="close"
      ) {
        // request that the WORLD move down
        this.world.moveDown(this.speed);
      }

      // change artwork
      this.currentDirection = this.cUp;
      this.displaySensor("up");
    }

  }

  this.frontTree = function(rx,ry){
    for(i=0;i<world.treesPosition.length;i++){
      d_from_tree = dist(rx,ry,world.treesPosition[i][0],world.treesPosition[i][1]-30);
      if (d_from_tree <= 70){
        return("close")
      }
    }
  }

  this.frontStore = function(rx,ry){
    if (rx>980 && rx<1220 && ry>275 && ry<430){
      return("close")
    }
  }

  this.frontMuseum = function(rx,ry){
    if (rx>670 && rx<920 && ry>870 && ry<1030 && showMuseum == "yes"){
      return("close")
    }
  }
}