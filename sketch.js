var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var o1,o2,o3,o4,o5,o6;

var dieSound,checkPointSound,jumpSound;

var score;
var cloudGroup,obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var  restart,restartImage,gameOver,gameOverImage;
var message="123";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  o1= loadImage("obstacle1.png");
  o2= loadImage("obstacle2.png");
  o3= loadImage("obstacle3.png");
  o4= loadImage("obstacle4.png");
  o5= loadImage("obstacle5.png");
  o6= loadImage("obstacle6.png");
  
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.mp3");
  
  
  restartImage= loadImage("restart.png");
  gameOverImage= loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100);
  restart  = createSprite(300,140);
  gameOver.addImage(gameOverImage);
  restart .addImage(restartImage);
  
   gameOver.scale = 0.5;
   restart.scale =0.5;
  
   gameOver.visible = false;
   restart.visible = false;
  
  score=0;
  cloudGroup= new Group();
  obstacleGroup=new Group();
}

function draw() {
  background(180);
  text("Score: "+score,500,50);
  
  //var fr = getFrameRate();
  //console.log(fr);

  console.log(message);
  
  if(gameState === PLAY){
    score=score+Math.round(getFrameRate()/40);
    
    trex.changeAnimation("running",trex_running);
    if(score> 0 && score%100===0){
      checkPointSound.play();
    }
    ground.velocityX = -(4+ 3*score/100);
  
    
    if(keyDown("space") && trex.y>=100) {
    
    trex.velocityY = -10;
    jumpSound.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0){
    ground.x = ground.width/2;
     }
    
    spawnClouds();
    spawnObstacle();
    
    if (obstacleGroup.isTouching(trex)){
    dieSound.play();
    gameState = END;
    
    }
  }
   else if(gameState === END){
     gameOver.visible = true;
    restart.visible = true;
     
   ground.velocityX = 0;
    
   trex.changeAnimation("collided",trex_collided);
   trex.velocityY = 0;
    
   cloudGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   
   cloudGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
     
    
  
    if(mousePressedOver(restart)) {
      reset();
    }
   }
  
  trex.collide(invisibleGround);
    
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloud.lifetime=200;
    cloudGroup.add(cloud);
    }
}

function spawnObstacle() {
  if(frameCount % 60 === 0 ){
  var obstacle=createSprite(400,165,10,40);
  obstacle.velocityX=-(6+ 2*score/100);
  var r = Math.round(random(1,6));
  switch(r) {
      case 1: obstacle.addImage(o1);
    break ;
      case 2: obstacle.addImage(o2);
    break ;
      case 3: obstacle.addImage(o3);
    break ;
      case 4: obstacle.addImage(o4);
    break ;
      case 5: obstacle.addImage(o5);
    break ;
      case 6: obstacle.addImage(o6);
    break ;
    
    default: break;
   }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
     
 }

 function reset() {
   gameState = PLAY;
   score = 0;
   gameOver.visible = false;
   restart.visible = false;
   obstacleGroup.destroyEach();
   cloudGroup.destroyEach();
   
   
 }


