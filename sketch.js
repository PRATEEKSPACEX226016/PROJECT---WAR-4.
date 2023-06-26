var BACKGROUND, FIGHTERJETFIREImg;

var E1,E2;
var BACKGROUNDImg,FIGHTERJETImg;

var E1Img
var E2Img
var gameOverImg,FIGHTERJETImg;

var E1CG, E2CG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  BACKGROUNDImg = loadImage("BG.webp");
  FIGHTERJETImg = loadImage("FIGHTER_JET-removebg-preview.png");


E1Img = loadImage("ENEMY1-removebg-preview.png");

 E2Img = loadImage("My project.png");


  FIGHTERJETFIRESound = loadSound("bad-explosion-6855.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);
// Moving background
BACKGROUND=createSprite(width/2,200);
BACKGROUND.addImage(BACKGROUNDImg);
BACKGROUND.velocityX = -5;
BACKGROUND.scale = 0.99

 FIGHTERJET = createSprite(120,150);
FIGHTERJET.addImage("JET_Running",FIGHTERJETImg);
FIGHTERJET.scale=0.50;
  
FIGHTERJET.setCollider("rectangle",0,0,40,40);


  
gameOver = createSprite(750,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
E1CG = new Group();
E2CG = new Group();

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   BACKGROUND.velocityX = -(6 + 2*distance/150);
  
   FIGHTERJET.y = World.mouseY;
  
   edges= createEdgeSprites();
   FIGHTERJET.collide(edges);}
  
  //code to reset the background
  if(BACKGROUND.x < 550){
    BACKGROUND.x = width/2;
  }
  
    
  if(keyDown("space")) {
    FIGHTERJETFIRESound.play();
  }
  
  //creating continous opponent players
  var select_E1 = Math.round(random(1,3));
  var select_E2 = Math.round(random(1,3));

  if (World.frameCount % 150 == 0) {
    if (select_E1 == 1) {
      E1();
    } else if (select_E2== 2) {
      E2();
    } 
  
   
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    BACKGROUND.velocityX = 0;
    FIGHTERJET.velocityY = 0;
    
 E1CG.setVelocityXEach(0);
  E1CG.setLifetimeEach(-1);
  
   E2CG.setVelocityXEach(0);
   E2CG.setLifetimeEach(-1);
  
 
    
   

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function E1(){
        E1 =createSprite(1100,Math.round(random(50, 250)));
     E1.scale =0.06;
       E1.velocityX = -(6 + 2*distance/150);
       E1.addImage("E1",E1Img);
      E1CG.add(E2);
}

function E2(){
      E2 =createSprite(1100,Math.round(random(50, 250)));
    E2.scale =0.06;
      E2.velocityX = -(6 + 2*distance/150);
        E2.addImage("E2",E2Img);
        E2CG.add(E1);
}



function reset(){
  gameState = PLAY;
 gameOver.visible = false;
  
 E1CG.destroyEach();
  E2CG.destroyEach();
  
  distance = 0;
}

