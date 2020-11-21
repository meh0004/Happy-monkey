
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1; 

  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -3;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //monkey.debug = true;
 
}


function draw() {
  background("white");
  console.log(gameState)
 if (gameState === PLAY){
  survivalTime = Math.ceil(frameCount / frameRate());
  
   //Making monkey to jump
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  //Adding gravity
  monkey.velocityY = monkey.velocityY + 0.5;
 }
  
  if (gameState === END){
        ground.velocityX = 0;
        monkey.velocityY = 0; 
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        
       survivalTime = survivalTime;
    
        textSize(20);
        textFont("Algerian");
        text("Game Over!!", 150,200);
    
  }
   //Resetting the ground
  if(ground.x < 0){
    ground.x = ground.width/2 
  }
  
 

  
  
  
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey))
    {
        gameState = END;
        
    }
  
  spawnFood();
  spawnObstacles();
  drawSprites();
  

  textSize(20);
  fill("black");
  textFont("Algerian");
  text("Survival Time :"+survivalTime,150,20);
}

function spawnFood(){
  if(frameCount%80 === 0){
    banana = createSprite(600,random(120,270),40,10);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.1;
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth +1;
    FoodGroup.add(banana);
    banana.lifetime = 300;
  }
  
}
 function spawnObstacles(){
   if (frameCount%300 ===0){
     obstacle = createSprite(600,320,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -3;
     obstacle.scale = 0.15;
     obstacleGroup.add(obstacle);
     obstacle.lifetime = 300;
   }
 }




