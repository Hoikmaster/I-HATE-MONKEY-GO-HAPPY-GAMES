
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background, backgroundImage 

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImage = loadImage("jungle.jpg")

  
  FoodGroup=new Group();
  obstacleGroup=new Group();
 score=0;
}



function setup() {

  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1

  ground = createSprite(400,350,900,10);
//  ground.velocityX=-4;
//  ground.x = ground.width/2;
//  console.log(ground.x); 
  ground.visible=false;
  
  background = createSprite(200,200);
  background.addImage("background", backgroundImage)
  
}


function draw() {
//background("white");
  
  stroke("white");
  textSize(20);
  fill("black")
  text("Score:" + score,200,50)
  
  background.velocityX = -4;
  
  if (background.x < 0){
  background.x = background.width/2;
  }
  
   if(keyDown("space")&& monkey.y >= 250) {
     monkey.velocityY=-12;
    }
    spawnFood();
    if (FoodGroup.isTouching(monkey)) {
    score = score + 1;
    FoodGroup.destroyEach();
      monkey.scale = monkey.scale + 0.01;
    
  }

  
  spawnObstacles();
  if (obstacleGroup.isTouching(monkey)) {
    score = score - 1;
    obstacleGroup.destroyEach();
    monkey.scale = monkey.scale - 0.01;
    
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground);
  
  
  background.depth = monkey.depth;
  background.depth = background.depth - 1;
  
  drawSprites();
}

 function spawnFood() {
   if (frameCount % 80 === 0){
     var food = createSprite(400,200,10,10)
     food.addImage(bananaImage);
     food.velocityX=-4;
     food.lifetime = 100;
     food.scale=0.1;
     FoodGroup.add(food);
   }
 }

 function spawnObstacles() {
  if (frameCount % 300 === 0){
    var obstacle = createSprite(400,340,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-4;
    obstacle.lifetime = 100;
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
  }
  
}



