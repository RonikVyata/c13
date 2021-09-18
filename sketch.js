//declaring variables
var trex ,trex_running;
var ground, ground_Image;
var invisibleGround;
var cloud, cloudImage
var obstacle, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score = 0

//to load animation, images and sounds
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png")  
  ground_Image = loadImage("ground2.png");
  cloudImage = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
}

//runs once; at the start of the game; is used to create stuff
function setup(){
  //creating canvas
  createCanvas(600,200);
  
  //create a trex sprite, gave it animation and scaled it down
  trex = createSprite (50,160);
  trex.addAnimation("running trex", trex_running)
  trex.scale = (0.5);

  //created a ground sprite, gave it image
  ground = createSprite(300,180,600,10);
  ground.addImage(ground_Image);
  //to move the ground right to left
  ground.velocityX = -4;

  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false

  
}

//runs for every frame, continuous function
function draw(){
  //clears the screen and gives it color
  background(255);
  
  //to make the trex jump when space key is pressed
  if(keyDown("space")&&(trex.y > 155)){
    trex.velocityY = -11;
  }

  //to give gravity to the trex
  trex.velocityY = trex.velocityY+1;

  //to make the ground infinite
  //checking if ground is leaving the left edge
  if(ground.x<0){
    //starting it back from center of the canvas
    ground.x = width/2
  }

  //The text which displays the score 
  text("Score :"+score,25,25);
  //We are adding score to the value and we are rounding it so there are no decimals
  score = score+Math.round(frameCount/150);

  //to make the trex walk on top of the ground
  trex.collide(invisibleGround);

  //Calling function
  spawnClouds();
  spawnObstacles();
  
  //display sprites
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60 ===0){
    cloud = createSprite(600,30)
    cloud.velocityX = -4
    cloud.addImage(cloudImage);
    cloud.scale = 0.5
    cloud.y = Math.round(random (10,90))

    console.log (trex.depth)
    console.log (cloud.depth)
    //we are making the trex depth equal to the cloud depth and adding 1 depth so the trex is infront of the cloud
    trex.depth = cloud.depth;
    trex.depth +=1

    //This is how much time a object stays in your board
    cloud.lifetime=170
  }
 
}

//This is a custom function which allows us to create a obstacle every 80 frames with a random obstacle
function spawnObstacles(){
  if(frameCount%80 ===0){
    obstacle = createSprite (600,165);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200
    obstacle.scale = 0.54;

    var randomObstacle = Math.round(random(1,6));
    switch(randomObstacle){
      case 1: obstacle.addImage(obstacle1)
      break;
      case 2: obstacle.addImage(obstacle2)
      break;
      case 3: obstacle.addImage(obstacle3)
      break;
      case 4: obstacle.addImage(obstacle4)
      break;
      case 5: obstacle.addImage(obstacle5)
      break;
      case 6: obstacle.addImage(obstacle6)
      break;
      default:break;
    }
  }
}