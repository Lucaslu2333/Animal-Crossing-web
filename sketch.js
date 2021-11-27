var loadFinished = "no";
var ready_to_go = "no"
var gameStatus = "begin"
var conversationTexts = [
  "Hello! We are so excited to have you here!",
  "Let us be the first to congratulate you on your wise decision to sign up for this adventure.",
  "Welcome...to the check-in counter for your Deserted Island Getaway Package!",
  "There is so much to look forward to! But first, let us introduce ourselves.",
  "We are Timmy and Tommy with Nook Inc.",
  "We'll be flying to the island with you to help you get settled.",
  "Think of us as your partners. We're in it for the long haul! So, let's get started, shall we?",
  "Now then, we'll need to look up your application. Can we have your basic information?",
]

var current_text_id = 0
var current_text_id2 = 0

var gender;
var genderChoice = 0;
var objectBrought;
var objectChoice = 0;
var currentFrame = 0;
var times = 0
var greet = -1;
var to_go_count_down = 180
var countDown = 80;

var money;
var backpackOpen = -1;
var tomOpen = -1;
var storeOpen = -1;
var museumOpen = -1;
var coolDownTree = 1;
var coolDownFish = 1;
var fishingStatus = -1;
var backpackContent = [];
var storeContent = {
  0:[450,"shear","speed up picking"],
  1:[600,"rod","an old fishing pole"],
  2:[2000,"goldRod","a rare golden durable fishing pole"],
  3:[2500,"swim","to swim across the river"],
  4:[0,"sell","sell everything in your bag to get: "],
  5:[3000,"museumIcon","build the MUSEUM!!!"],
  6:[,"check","Congrats! You've finished all the task!"]
};
var playerTool = {
  shear:[0],
  rod:[0],
  goldRod:[0],
};

var showMuseum;
var museumList=[];
//For Test
//var museumList=["seaHorse","horse","seaBass","dab"];
//var museumList=["seaHorse","horse","seaBass","dab","squid","oarFish","shark"];

//Store selection
var selectY = 235;
var selectPass = 0; //how many selection(s) passed

//Gender selection
var genderSelector;

//Object selection
var objectSelector = -350;

// our world object - this object handles our tiles, drawing the world and converting screen
// coordinates into game coordinates - see OverheadWorld.js for more information
var theWorld;

// our user controlled character object - see Player.js for more information
var thePlayer;

// create an object to hold our "world parameters" - we will send this object into our 
// OverheadWorld to tell it how our world is organized
var worldParameters = {
  tileSize: 50,
  tileFolder: 'tiles',
  numTiles: 71, //one more should be applied
  tileMap: [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [ 0,14, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 3, 2, 3, 1, 1, 3, 1, 2, 1, 2, 1, 1, 1, 1, 3, 1, 1,18],
    [ 0,14, 3, 6, 6, 6, 4, 6, 5, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 1,18],
    [ 0,14, 1, 6, 6, 6, 6, 6, 6, 4, 6, 6, 5, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 6, 2,18],
    [ 0,14, 1, 6, 6, 6, 4, 6, 6, 4, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 1,18],
    [ 0,14, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 6, 1,18],
    [ 0,14, 3, 6, 4, 6, 6, 6, 5, 6, 6, 6, 6, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2,18],
    [ 0,14, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 6, 6, 6, 6, 6, 6,57,58,59,57,58,59, 6, 6, 6, 1,18],
    [ 0,14, 1, 6, 6, 6, 6, 6, 6, 6, 4, 6, 6, 6, 5, 6, 6, 6, 6,62,63,64,62,63,64, 6, 6, 6, 1,18],
    [ 0,22,23,21,22,23,21,22,23, 6, 6, 5, 6, 4, 6, 6, 5, 6, 8, 7, 6, 6, 6, 6, 7, 8, 6, 4, 3,18],
    [ 0,14, 1, 6, 5, 6, 5, 5,21, 6, 6, 6, 6, 6, 5, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 1,18],
    [ 0,14, 1, 4, 6, 5, 5, 5,22, 6, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 1,18],
    [ 0,14, 3, 6, 6, 6, 5, 6,23, 6, 6, 6, 6, 6, 6, 5, 6, 4, 5, 6, 6, 6, 6, 6, 5, 4, 6, 6, 2,18],
    [ 0,14, 1, 5, 4, 6, 6, 6,21, 6, 6, 6, 6, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1,18],
    [ 0,14, 1, 6, 6, 6, 6, 6,22,23,21,22,23,21,22,23,21,22,23,21,22,23,21,22, 6, 6, 5, 9, 1,18],
    [ 0,14, 2, 6, 6, 4, 5, 6, 6, 6, 6, 6, 4, 4, 6, 4, 6, 6, 6, 6, 6, 6, 6,23, 6, 6, 6, 6, 2,18],
    [ 0,14, 1, 4, 6, 6, 7, 6, 6, 6, 6, 5, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6,22, 6, 4, 6, 6, 1,18],
    [ 0,14, 3, 6, 4, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 6, 6, 6, 6,21,23,22,21,23,22,21,0],
    [ 0,14, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 6, 6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 4, 6, 3,18],
    [ 0,14, 3, 6, 5, 6, 4, 6, 6, 5, 6, 4, 6, 5, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3,18],
    [ 0,14, 1, 6, 6, 6, 6, 6, 6, 8, 6, 6, 6, 6, 6, 6, 5, 4, 9, 6, 6, 4, 6, 6, 4, 6, 6, 6, 1,18],
    [ 0,14, 3, 6, 6, 6, 6, 6, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 6, 6, 5, 2,18],
    [ 0,14, 1, 3, 1, 2, 1, 3, 1, 3, 2, 1, 1, 2, 1, 1, 1, 3, 1, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1,18],
    [ 0,13,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,19],

  ],

  solidTiles: {20:true, 16:true, 14:true, 18:true, 21:true, 22:true, 23:true, 0:true}
};

// handle the tile loading and creating our player object in preload before the game can start
function preload() {
  theWorld = new OverheadWorld(worldParameters);
  thePlayer = new Player(640, 400, theWorld);
  tree = loadImage('objects/tree.png');
  backpack = loadImage('objects/backpack.png');
  blathers = loadImage('objects/blathers.png')
  tomNook = loadImage('objects/tomNook.png')
  coin = loadImage('objects/coin.png');
  fruit = loadImage('objects/fruit.png');
  bpInterface = loadImage('objects/bp_interface.png');
  store = loadImage('objects/store.png');
  museum = loadImage('objects/museum.png');
  museumIcon = loadImage('objects/museumIcon.png');
  storeInterface = loadImage('objects/storeContent.png');
  shear = loadImage('objects/shear.png');
  rod = loadImage('objects/pole.png');
  goldRod = loadImage('objects/goldPole.png');
  swim = loadImage('objects/swim.png');
  sell = loadImage('objects/sell.png');
  check = loadImage('objects/check.png');
  prize1 = loadImage('objects/prize.png');
  prize2 = loadImage('objects/prize2.png');
  prize3 = loadImage('objects/prize3.png');
  prize4 = loadImage('objects/prize4.png');
  service = loadImage('objects/service.png')
  timmy = loadImage('objects/timmy.png')

  //keys
  keyW = loadImage('objects/keys/w.png')
  keyA = loadImage('objects/keys/a.png')
  keyS = loadImage('objects/keys/s.png')
  keyD = loadImage('objects/keys/d.png')
  keyB = loadImage('objects/keys/b.png')
  keyE = loadImage('objects/keys/e.png')
  keyI = loadImage('objects/keys/i.png')
  keyK = loadImage('objects/keys/k.png')
  keySpace = loadImage('objects/keys/space.png')

  //Fishes
  tire = loadImage('objects/fishes/0.png');
  seaHorse = loadImage('objects/fishes/1.png');
  horse = loadImage('objects/fishes/2.png');
  seaBass = loadImage('objects/fishes/3.png');
  dab = loadImage('objects/fishes/4.png');
  squid = loadImage('objects/fishes/5.png');
  oarFish = loadImage('objects/fishes/6.png');
  shark = loadImage('objects/fishes/7.png');

  //starting page
  begin = loadImage('background/begin.png')
  airport = loadImage('background/airport.png')
  boy = loadImage('objects/boyIcon.png')
  girl = loadImage('objects/girlIcon.png')
  sleepingBag = loadImage('objects/sleepingBag.png')
  lamp = loadImage('objects/lamp.png')
  eat = loadImage('objects/hamburger.png')
  play = loadImage('objects/switch.png')

  //Sound
  soundFormats('mp3', 'ogg');
  airportBGM = loadSound('sounds/airport.mp3');
  islandBGM = loadSound('sounds/island.mp3');
  obtainBGM = loadSound('sounds/obtain.mp3');
  payBGM = loadSound('sounds/pay.mp3');
  selectBGM = loadSound('sounds/select.mp3');
  errorBGM = loadSound('sounds/error.mp3');
  openBGM = loadSound('sounds/open.mp3');
  closeBGM = loadSound('sounds/close.mp3');
  prizeBGM = loadSound('sounds/prize.mp3');
}

function setup() {
  createCanvas(1280,800);
  airportBGM.loop()
}

function draw() {
  if (gameStatus=="begin"){
      background(begin)
      gameStart()
    if (mouseIsPressed && mouseX>=480 && mouseX <= 780 && mouseY>=400 && mouseY<=450){
      gameStatus="airport"
    }
  }

  if (gameStatus=="airport"){
    background(airport)
    conversation()
    console.log(objectSelector)
    
  }

  if (gameStatus=="island"){
    background(29,108,152);//sea color
    theWorld.displayWorld()
    thePlayer.move();
    thePlayer.display();
    tomGreeting();
    game();
    interface();
  }
}





function gameStart(){
  noStroke()
  fill(255,229,204)
  rect(480,400,300,50,15,15,15,15)
  fill(153,76,0)
  textSize(30)
  text("Begin Adventure!",510,435)
}

function conversation(){
  noStroke()
  fill(255,255,204)
  rect(150,500,1000,250,20,20,20,20)
  fill(255,178,102)
  rect(90,470,310,60,50,50,50,50)
  fill(102,51,0)
  textSize(35)
  text("Timmy & Tommy",105,510)
  textSize(35)
  fill(153,76,0)
  text(conversationTexts[current_text_id],180,550,900,250)
  if (current_text_id >= 8){
      image(airport,0,0,1280,800)

      fill(255,255,204,230)
      rect(150,150,1000,500,20,20,20,20)
      textSize(35)
      fill(153,76,0)
      text("Please choose your style.",420,200)
      textSize(25)
      text("(Use [J] & [L] to select, [space] to confirm)",390,230)
      if (keyIsDown(76)){
        genderSelector = 700
      }
      if (keyIsDown(74)){
        genderSelector = 300
      }
      fill(255,153,51,200)
      rect(genderSelector,300,250,250,15,15,15,15)
      image(boy,300,300,250,250)
      image(girl,700,300,250,250)
      if (keyIsDown(32) && genderSelector==300){
        gender = "male"
        genderChoice = 1
      }
      if (keyIsDown(32) && genderSelector==700){
        gender = "female"
        genderChoice = 1
      }

    }
  if (genderChoice==1){
    if(loadFinished == "no"){
      for (let i = 1; i <= 9; i++) {
        let filename = "down" + nf(i, 4) + ".png";
        thePlayer.cDown.push( loadImage("characters/" + gender + "/down/" + filename ));
      }
    
      for (let i = 1; i <= 9; i++) {
          let filename = "up" + nf(i, 4) + ".png";
          thePlayer.cUp.push( loadImage("characters/" + gender + "/up/" + filename ));
        }
      
      for (let i = 1; i <= 9; i++) {
          let filename = "left" + nf(i, 4) + ".png";
          thePlayer.cLeft.push( loadImage("characters/" + gender + "/left/" + filename ));
        }
      
      for (let i = 1; i <= 9; i++) {
          let filename = "right" + nf(i, 4) + ".png";
          thePlayer.cRight.push( loadImage("characters/" + gender + "/right/" + filename ));
        }
        loadFinished = "yes"
    }
      image(airport,0,0,1280,800)

      fill(255,255,204,230)
      rect(150,150,1000,500,20,20,20,20)
      textSize(35)
      fill(153,76,0)
      text("Which of the following objects would you like to bring with?",160,200)
      textSize(25)
      text("Think twice before you select!",430,230)
      text("(Use [J] & [L] to select, [space] to confirm)",390,260)

      fill(255,153,51,200)
      rect(objectSelector,300,200,200,15,15,15,15)
      image(sleepingBag,250,330,200,150)
      fill(153,76,0)
      textSize(20)
      text("Sleeping Bag",280,550)
      image(lamp,450,340,180,130)
      text("Lamp",510,550)
      image(eat,670,330,160,130)
      text("Food",720,550)
      image(play,860,330,180,150)
      text("Something to kill time",860,550)

      if (keyIsDown(32) && objectSelector==250){
        objectBrought = "sleeping Bag"
        objectChoice = 1
        money = 400
      }
      if (keyIsDown(32) && objectSelector==450){
        objectBrought = "lamp"
        objectChoice = 1
        money = 350
      }
      if (keyIsDown(32) && objectSelector==650){
        objectBrought = "food"
        objectChoice = 1
        money = 300
      }
      if (keyIsDown(32) && objectSelector==850){
        objectBrought = "something to kill time"
        objectChoice = 1
        money = 250
      }

  }
  if (genderChoice==1 && objectChoice==1){
    image(airport,0,0,1280,800)
    noStroke()
    fill(255,255,204)
    rect(150,500,1000,250,20,20,20,20)
    fill(255,178,102)
    rect(90,470,310,60,50,50,50,50)
    fill(102,51,0)
    textSize(35)
    text("Timmy & Tommy",105,510)
    textSize(35)
    fill(153,76,0)
    text("Great, you are all set! Now let's board the plane together!",180,550,900,250)
    to_go_count_down -= 1
    if (to_go_count_down <= 0){
      ready_to_go = "yes"
    }
    
    if (gameStatus=="airport" && genderChoice==1 && objectChoice==1 && ready_to_go=="yes"){
      if (key==" "){
        gameStatus = "island"
      }
    }
    
  }
}

function tomGreeting(){
  airportBGM.pause()
  var tomTexts = [
    "Welcome to your new island! My name is Tom Nook, and I'm the founder and president of Nook Inc.",
    "Today is your first day of your new life on this pristine, lovely island. So congratulations!",
    "Nook Inc. staff will always be here to support you and ensure your comfort and safety.",
    "Now let's get started. Since you chose to bring " + objectBrought + " with you...",
    "You get " + money + " Bells!",
    "Now let me introduce what you can do on the island. By shaking the trees, you can get fruits.",
    "Fruits can be sold at Nook Store. You can also buy tools like fishing pole and shear at the store.",
    "Earn money by picking fruits and fishing, then you can enjoy more activities on the island -- You can swin across the river, and even build a museum on this island!",
    "After building the museum, you can donate the fish you get. Try to collect as many species as possible!",
    "I think that's all I need to teach you. I believe you have the ability to fully enjoy your life here.",
    "Don't worry! You can always reach out to our service center by pressing [T]. I'm always here to help you."

  ]
  if (greet == -1){
    countDown -= 1
    for (i=4;i<10;i++){
      theWorld.solidTiles[i] = true;
    }
    if (countDown == 0){
      greet = 0
    }
  }
  if (greet == 0){
    noStroke()
    fill(255,255,204)
    rect(250,300,820,250,20,20,20,20)
    fill(255,178,102)
    rect(200,280,200,60,50,50,50,50)
    image(tomNook,850,408)
    fill(102,51,0)
    textSize(35)
    text("Tom Nook",210,320)
    textSize(25)
    fill(153,76,0)
    text(tomTexts[current_text_id2],280,350,800,250)
    if (current_text_id2 >= tomTexts.length){
      greet = 1
      for (i=4;i<10;i++){
        delete theWorld.solidTiles[i];
      }
    }
  }
    
}  
  




function interface(){
  //Not to interfere with other parts
  push();
  imageMode(CENTER);
  //Coin Icon
  image(coin,50,750,60,60);
  textSize(24);
  fill(255,255,255,220);
  text(money+" c", 85, 760);
  //Shear Icon
  if (playerTool["shear"][0]>0){
    image(shear,450,750,60,60);
    text(playerTool["shear"][0], 485, 760);
  }
  //GRod Icon
  if (playerTool["goldRod"][0]>0){
    image(goldRod,750,750,60,60);
    text(playerTool["goldRod"][0], 785, 760);
  }
  //Rod Icon
  if (playerTool["rod"][0]>0){
    image(rod,600,750,60,60);
    text(playerTool["rod"][0], 635, 760);
  }
  //Backpack Icon
  image(backpack,1200,720,64,64);
  text("E", 1194, 775);
  //show backpack content
  if (backpackOpen == 1){
    image(bpInterface,640,400);
    for(i=0;i<backpackContent.length;i++){
      if (i<7){
        image(backpackContent[i],403+80*(i-0),288+80*0,60,60)
      }
      else if(i<14){
        image(backpackContent[i],403+80*(i-7),288+80*1,60,60)
      }
      else if(i<21){
        image(backpackContent[i],403+80*(i-14),288+80*2,60,60)
      }
      else if(i<28){
        image(backpackContent[i],403+80*(i-21),288+80*3,60,60)
      }
    }
  }
  //Service Center Icon
  image(service,1100,720,70,64);
  text("T", 1094, 775);
  //show backpack content
  if (tomOpen == 1){
    push()
    noStroke()
    fill(255,255,204)
    rect(250,300,800,250,20,20,20,20)
    fill(255,178,102)
    rect(200,280,200,60,50,50,50,50)
    image(tomNook,300,478)
    fill(102,51,0)
    textSize(35)
    text("Tom Nook",210,320)
    textSize(25)
    fill(153,76,0)
    text('Hi! You can always call me by pressing [T] to see instructions!',280,380)
    image(keyW,410,420,30,30)
    image(keyA,380,450,30,30)
    image(keyS,410,450,30,30)
    image(keyD,440,450,30,30)
    textSize(20)
    text(": movement",455,455)
    image(keySpace,385,500,40,40)
    text(": fishing / picking fruits",410,505)
    image(keyI,670,435,30,30)
    image(keyK,700,435,30,30)
    text(": select items",715,440)
    image(keyB,670,495,30,30)
    text(": buy/sell(store) or donate(museum)",690,500)
    pop()
  }

  //show store
  if (storeOpen == 1){
    image(storeInterface,640,400);
    push()
    noStroke()
    fill(255,255,204)
    rect(200,630,700,150,20,20,20,20)
    fill(255,178,102)
    rect(140,600,310,60,50,50,50,50)
    fill(102,51,0)
    textSize(35)
    text("Timmy & Tommy",155,640)
    textSize(25)
    fill(153,76,0)
    text("Hello, welcome to Nook's Cranny!",220,690)
    text("How can we help you?",220,720)
    image(timmy,800,716,300,250)
    pop()
    //Freeze move
    for  (i = 62;i<65;i++){
      theWorld.solidTiles[i] = true;
    }
    //sell amount
    sellAmount = calculateValue();
    //Store content
    for (i=0;i<5;i++){
      //window[string] - convert string to value
      image(window[storeContent[i][1]],370,260+70*i,60,60);
      fill(200);
      text(storeContent[i][2],430,270+70*i);
      text(storeContent[i][0],820,270+70*i);
    }
    //Select
    fill(200,200,100,50);
    stroke(100);
    strokeWeight(2)
    rect(330,selectY,570,55,30,30,30,30)
  }
  else if(storeOpen == -1 && museumOpen == -1){
    //unfreeze
    for  (i = 62;i<65;i++){
      delete theWorld.solidTiles[i];
    }
  }
  
  //show museum
  if (museumOpen == 1){
    noStroke();
    fill(50,70,150);
    rect(340,225,600,370,30,30,30,30);
    fill(40,50,130)
    //top line
    rect(390,260,110,110,20,20,20,20);
    rect(520,260,110,110,20,20,20,20);
    rect(650,260,110,110,20,20,20,20);
    rect(780,260,110,110,20,20,20,20);
    //bottom line
    stroke(240,205,10);
    strokeWeight(7);
    fill(0,80,150);
    rect(370,400,160,160,20,20,20,20);
    rect(560,400,160,160,20,20,20,20);
    rect(750,400,160,160,20,20,20,20);

    push()
    noStroke()
    fill(255,255,204)
    rect(200,630,700,150,20,20,20,20)
    fill(255,178,102)
    rect(140,600,180,60,50,50,50,50)
    fill(102,51,0)
    textSize(35)
    text("Blathers",155,645)
    textSize(25)
    fill(153,76,0)
    text("Hello, welcome to the museum!",220,690)
    if (museumList.length==7){
      text("You've collected all the fish. You deserve\nthe honor!",220,720)
    }
    else if(museumList.length>=4){
      text("Wow, you've got a lot of species! Advanced\nfishing pole may find rare species...",220,720)
    }
    else if(museumList.length>0){
      text("Great! First step! Collect more species to\nearn the Greatest Honor!",220,720)
    }
    else {
      text("Donate the new species in your backpack by\npressing 'B'.",220,720)
    }
    image(blathers,850,700,180,150)
    pop()

    //Check bag
    

    //Show fish
    for(i=0;i<museumList.length;i++){
      if (museumList[i] == "seaHorse"){
        image(seaHorse,445,315,100,100);
      }
      else if (museumList[i] == "horse"){
        image(horse,575,315,100,100);
      }
      else if (museumList[i] == "seaBass"){
        image(seaBass,705,315,100,100);
      }
      else if (museumList[i] == "dab"){
        image(dab,835,315,100,100);
      }
      else if (museumList[i] == "squid"){
        image(squid,450,480,120,120);
      }
      else if (museumList[i] == "oarFish"){
        image(oarFish,640,480,120,120);
      }
      else if (museumList[i] == "shark"){
        image(shark,830,480,120,120);
      }
    }
    //Show prize
    if (museumList.length==7){
      image(prize1,340,225,200,200);
    }
    else if (museumList.length>=4){
      image(prize2,340,225,200,200);
    }
    else if (museumList.length>0){
      image(prize4,340,225,200,200);
    }
    else{
      image(prize3,340,225,200,200);
    }
    //Freeze move
    for  (i = 62;i<65;i++){
      theWorld.solidTiles[i] = true;
    }
  }
  pop();

}

function keyTyped() {
  if (gameStatus=="airport" && genderChoice==0 && objectChoice==0){
    if (key==" "){
      current_text_id += 1
      selectPlay();
    }
  }

  if (gameStatus=="airport" && genderChoice==1 && objectChoice==0 && objectSelector==-350){
    if (key=="j"){
      objectSelector = 250
    }
    if (key=="l"){
      objectSelector = 250
    }
  }

  if (gameStatus=="airport" && genderChoice==1 && objectChoice==0){
    if (key=="l"){
      objectSelector += 200
      if (objectSelector >= 850){
        objectSelector = 850
      }
    }
    if (key=="j"){
      objectSelector -= 200
      if (objectSelector <= 250){
        objectSelector = 250
      }
    }
    
  }


  if (gameStatus=="island"){
    if (greet==0){
      if (key == " "){
        current_text_id2 += 1
        selectPlay();
      }
    }
    if (key == "b") {
      if (storeOpen == 1){
        let good = selectPass;
        let price = storeContent[good][0];
        if (money >= price && good!=4){
          money -= price;
          payPlay();
          if (good == 0){
            //giving lifespan
            playerTool["shear"][0] += 10;
          }
          else if (good == 1){
            playerTool["rod"][0] += 5;
          }
          else if (good == 2){
            playerTool["goldRod"][0] += 10;
          }
          else if (good == 3){
            if (storeContent[3][1]=="swim"){
              //Swim Activate
              for (i=21;i<24;i++){
                delete theWorld.solidTiles[i];
              }
              //Update tiles
              for (i=13;i<16;i++){
                theWorld.tileMap[20][i] = 44+i;
              }
              for (i=16;i<19;i++){
                theWorld.tileMap[20][i] = 41+i;
              }
              for (i=13;i<16;i++){
                theWorld.tileMap[21][i] = 49+i;
              }
              for (i=16;i<19;i++){
                theWorld.tileMap[21][i] = 46+i;
              }
              //Refresh good
              for (i=0;i<3;i++){
                storeContent[3][i] = storeContent[5][i];
              }
            }
            else if (storeContent[3][1]=="museumIcon"){
              //Museum Activate
              showMuseum = "yes";
              //Refresh good
              for (i=0;i<3;i++){
                storeContent[3][i] = storeContent[6][i];
              }
            }
          }
        }
        else if (good == 4){
          if (price != 0){
            payPlay();
          }
          else {
            errorPlay();
          }
          money += price;
          storeContent[good][0] = 0;
          sellAmount = 0;
          //clear backpack
          backpackContent.splice(0,backpackContent.length);
        }
        else{
          errorPlay();
        }
      }
      else if (museumOpen == 1){
        for (i=0;i<backpackContent.length;i++){
          if (backpackContent[i] == seaHorse && !museumList.includes('seaHorse')){
            museumList.push("seaHorse")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == horse && !museumList.includes('horse')){
            museumList.push("horse")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == seaBass && !museumList.includes('seaBass')){
            museumList.push("seaBass")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == dab && !museumList.includes('dab')){
            museumList.push("dab")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == squid && !museumList.includes('squid')){
            museumList.push("squid")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == oarFish && !museumList.includes('oarFish')){
            museumList.push("oarFish")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
          else if (backpackContent[i] == shark && !museumList.includes('shark')){
            museumList.push("shark")
            backpackContent.splice(i,1);
            i-=1;
            prizePlay()
          }
        }
      }
    }

    if (key == 'k') {
      if (storeOpen == 1 && selectPass<4){
        selectPlay()
        selectY += 70;
        selectPass +=1;
      }
    }

    if (key == 'i') {
      if (storeOpen == 1 && selectPass>0){
        selectPlay()
        selectY -= 70;
        selectPass -=1;
      }
    }

    if (key == 'e') {
      //Open/Close backpack
      backpackOpen *= -1;
      if (backpackOpen == 1){
        openPlay();
      }
      else {
        closePlay();
      }
    }

    if (key == 't') {
      tomOpen *= -1;
      if (tomOpen == 1){
        openPlay();
      }
      else {
        closePlay();
      }
    }

    if (key == ' ') {
      let realX = thePlayer.realX;
      let realY = thePlayer.realY;
      //Pick fruit
      milliRecord = millis();
      coolDownTree = 1;
      coolDownFish = 1;
      //Go to store
      if (realX>980 && realX<1220 && realY>400 && realY<480){
        storeOpen *= -1;
        storeContent[4][0] = calculateValue();
        if (storeOpen == 1){
          openPlay();
        }
        else {
          closePlay();
        }
      }
      //Go to museum
      if (realX>670 && realX<920 && realY>950 && realY<1080 && showMuseum == "yes"){
        museumOpen *= -1;
        if (museumOpen == 1){
          openPlay();
        }
        else {
          closePlay();
        }
      }
    }
  }
    
}

function game(){
  //Set REAL Position
  let realX = thePlayer.realX;
  let realY = thePlayer.realY;
  //BGM
  if (islandBGM.isPlaying()) {
  }
  else {
    islandBGM.loop();
  }
  //Pick fruit
  for(i=0;i<theWorld.treesPosition.length;i++){
    if (dist(realX,realY,theWorld.treesPosition[i][0],theWorld.treesPosition[i][1])<=75){
      if (keyIsDown(32) && coolDownTree == 1 && backpackContent.length<28){
        picktime = millis()-milliRecord;
        if (playerTool["shear"]>0){
          timeNeed = 2000;
          if (picktime<=timeNeed){
            //Process bar
            fill(150);
            rect(560,450,timeNeed/10,20);
            fill(100,255,180);
            rect(560,450,picktime/10,20);
          }
          else {
            if (coolDownTree == 1){
              obtainPlay();
              backpackContent.push(fruit);
              // obtainPlay();
              playerTool["shear"][0] -=1;
              coolDownTree=0;
            }
          }
        }
        else {
          timeNeed = 5000;
          if (picktime<=timeNeed){
            //Process bar
            fill(150);
            rect(560,450,200,20);
            fill(100,255,180);
            rect(560,450,picktime/25,20);
          }
          else {
            if (coolDownTree == 1){
              obtainPlay();
              backpackContent.push(fruit);
              coolDownTree=0;
            }
          }
        }
      }
    }
  }

  //Fishing
  if (keyIsDown(32) && coolDownFish == 1 && fishingStatus == 1 && backpackContent.length<28){
    fishTime = millis()-milliRecord;
    if (playerTool["goldRod"]>0){
      timeNeed = 2000;
      if (fishTime<=timeNeed){
        //Process bar
        fill(150);
        rect(560,450,timeNeed/10,20);
        fill(100,255,180);
        rect(560,450,fishTime/10,20);
      }
      else {
        if (coolDownFish == 1){
          obtainPlay();
          randomFish = int(random(101));
          if (randomFish<=15){
            backpackContent.push(seaHorse);
          }
          else if (randomFish<=40){
            backpackContent.push(horse);
          }
          else if (randomFish<=70){
            backpackContent.push(seaBass);
          }
          else if (randomFish<=84){
            backpackContent.push(dab);
          }
          else if (randomFish<=92){
            backpackContent.push(squid);
          }
          else if (randomFish<=97){
            backpackContent.push(oarFish);
          }
          else if (randomFish<=100){
            backpackContent.push(shark);
          }
          playerTool["goldRod"][0] -=1;
          coolDownFish=0;
        }
      }
    }
    else if (playerTool["rod"]>0){
      timeNeed = 5000;
      if (fishTime<=timeNeed){
        //Process bar
        fill(150);
        rect(560,450,200,20);
        fill(100,255,180);
        rect(560,450,fishTime/25,20);
      }
      else {
        if (coolDownFish == 1){
          obtainPlay();
          randomFish = int(random(101));
          if (randomFish<=10){
            backpackContent.push(tire);
          }
          else if (randomFish<=20){
            backpackContent.push(seaHorse);
          }
          else if (randomFish<=40){
            backpackContent.push(horse);
          }
          else if (randomFish<=80){
            backpackContent.push(seaBass);
          }
          else if (randomFish<=95){
            backpackContent.push(dab);
          }
          else if (randomFish<=100){
            backpackContent.push(squid);
          }
          playerTool["rod"][0] -=1;
          coolDownFish=0;
        }
      }
    }
  }
}

function calculateValue(){
  let sell = 0;
  //Calculate value in bag
  for (i=0;i<backpackContent.length;i++){
    if (backpackContent[i] == fruit){
      //fruit price
      sell +=100;
    }
    else if (backpackContent[i] == tire){
      sell += 25;
    }
    else if (backpackContent[i] == seaHorse){
      sell += 125;
    }
    else if (backpackContent[i] == horse){
      sell += 175;
    }
    else if (backpackContent[i] == seaBass){
      sell += 200;
    }
    else if (backpackContent[i] == dab){
      sell += 275;
    }
    else if (backpackContent[i] == squid){
      sell += 350;
    }
    else if (backpackContent[i] == oarFish){
      sell += 550;
    }
    else if (backpackContent[i] == shark){
      sell += 850;
    }
  }
  return (sell);
}

var fishingEnable = function fishing(){
  fishingStatus = 1;
}
var fishingDisable = function noFishing(){
  fishingStatus = -1;
}

function obtainPlay(){
  if (obtainBGM.isPlaying()) {
    obtainBGM.stop();
    obtainBGM.play();
  }
  else {
    obtainBGM.play();
  }
}

function payPlay(){
  if (payBGM.isPlaying()) {
    payBGM.stop();
    payBGM.play();
  }
  else {
    payBGM.play();
  }
}

function selectPlay(){
  if (selectBGM.isPlaying()) {
    selectBGM.stop();
    selectBGM.play();
  }
  else {
    selectBGM.play();
  }
}

function errorPlay(){
  if (errorBGM.isPlaying()) {
    errorBGM.stop();
    errorBGM.play();
  }
  else {
    errorBGM.play();
  }
}

function openPlay(){
  if (openBGM.isPlaying()) {
    openBGM.stop();
    openBGM.play();
  }
  else {
    openBGM.play();
  }
}

function closePlay(){
  if (closeBGM.isPlaying()) {
    closeBGM.stop();
    closeBGM.play();
  }
  else {
    closeBGM.play();
  }
}

function prizePlay(){
  if (prizeBGM.isPlaying()) {
    prizeBGM.stop();
    prizeBGM.play();
  }
  else {
    prizeBGM.play();
  }
}