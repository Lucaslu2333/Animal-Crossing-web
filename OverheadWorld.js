function OverheadWorld(params) {
  // store our desired tile size
  this.tileSize = params.tileSize;
  
  // store our tile map
  this.tileMap = params.tileMap;
  this.coverMap = params.coverMap;

  // store the folder in which all of our tiles are stored
  this.tileFolder = params.tileFolder;
  
  // store how many tiles we are working with
  this.numTiles = params.numTiles;
  
  // store an object that defines which tiles are solid
  this.solidTiles = params.solidTiles;

  // an array to hold all tile graphics
  this.tileLibrary = [];
  
  // offset values - we will use this to "slide" the world left and right
  // around the character
  this.offsetX = 0;
  this.offsetY = 0;

  //IMPORTANT:realX and realY is the position of the character on the map
  this.realX = 640; //from player's param
  this.realY = 400; //from player's param

  // load in all tile graphics
  for (var i = 0; i < this.numTiles; i++) {
    var tempTile = loadImage(this.tileFolder + "/" + i + ".png");
    this.tileLibrary.push(tempTile);
  }

  // displayTile: draws a single tile at a specified location
  this.displayTile = function(id, x, y) {
    image(this.tileLibrary[id], x, y);
  }

  // displayWorld: displays the current world
  // images inside wont' move along with the player!
  this.displayWorld = function() {
    // move to our offset position
    push();
    translate(this.offsetX, this.offsetY);
    
    for (var row = 0; row < this.tileMap.length; row += 1) {
      for (var col = 0; col < this.tileMap[row].length; col += 1) {
        image(this.tileLibrary[ this.tileMap[row][col] ], col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
      }
    }

    this.showObjects();
    pop();
  }
  
  // get a tile based on a screen x,y position
  this.getTile = function(x, y) {
    // convert the x & y position into a grid position
    var col = Math.floor( (x-this.offsetX)/this.tileSize);
    var row = Math.floor( (y-this.offsetY)/this.tileSize);
    console.log(col,row,this.tileMap[row][col])
    // if the computed position is not in the array we can send back a -1 value
    if (row < 0 || row >= this.tileMap.length || col < 0 || col >= this.tileMap[row].length) {
      return -1;
    }

    // get the tile from our map
    return this.tileMap[row][col];
  }
  
  // see if this tile is solid
  this.isTileSolid = function(id) {
    if (id in this.solidTiles || id == -1) {
      return true;
    }
    return false;
  }
  
  // move the world
  this.moveRight = function(val) {
    this.offsetX += val;
    this.realX = 644-this.offsetX;
  }
  this.moveLeft = function(val) {
    this.offsetX -= val;
    this.realX = 644-this.offsetX;
  }
  this.moveUp = function(val) {
    this.offsetY -= val;
    this.realY = 404-this.offsetY;
  }
  this.moveDown = function(val) {
    this.offsetY += val;
    this.realY = 404-this.offsetY;
  }

  this.showObjects = function(){
    this.plantTrees();
    image(store, 1100, 420, 320, 290);
    if (showMuseum == "yes"){
      image(museum, 800, 990, 320, 290);
    }
  }

  this.treesPosition = [
    [300,300],
    [500,1000],
    [1300,700],
    [850,400]
  ]

  this.plantTrees = function(){
    for(i=0;i<4;i++){
      imageMode(CENTER)
      image(tree, this.treesPosition[i][0], this.treesPosition[i][1],142.5,180);
    }
  }
}