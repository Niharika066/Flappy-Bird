
  var bird,bird_running, ground,cloud,cloudImg;
  var obstacle, obstacle2, ObstacleImage, Obstacle2Image;
  var obstaclesGroup, obstacles2Group;
  var food, foodGroup, foodImg
  var survivalTime=0, score=0;
 

function preload(){
  bird_running = loadAnimation("img1.png","img2.png","img3.png","img4.png")
ObstacleImage = loadImage("obstacle.png");
Obstacle2Image=loadImage("obstacle2.png")
foodImg=loadImage("food.png");
}

  function setup(){
    createCanvas(1000,300);
 
   obstaclesGroup= new Group();
   obstacles2Group= new Group();
   foodGroup=new Group();

    //create monkey sprite
    bird=createSprite(80,215,20,20);
    bird.addAnimation("running",bird_running);
    bird.scale=0.28;
    
    
   ground=createSprite(400,290,3000,20);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    ground.shapeColor="green";
    //create an invisible ground
    invisibleGround = createSprite(400,290,3000,120);
    invisibleGround.visible = false;
    }
  function draw(){
    background(117, 211, 226);
    
    
      //give controls to game
    if(keyDown("space") && bird.y >= 100) {
      bird.velocityY = -10;
    }        

    bird.velocityY = bird.velocityY + 0.8  

    if(bird.isTouching(foodGroup)){
      score=score+2;
      foodGroup.destroyEach();
      switch(score){
        case 10:bird.scale=0.34;
        break;
        case 20:bird.scale=0.4;
        break;
        case 30:bird.scale=0.45;
        break;    
        default: break;
      }
    }
if(bird.isTouching(obstaclesGroup) ||  (obstacles2Group)){
bird.scale=0.3;
}

  if(ground.x<0){
      ground.x=30;
    }
    bird.collide(invisibleGround); 

    //add survival time
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survivalTime:"+survivalTime, 30,30);   
    
    stroke("white");
    textSize(20);
    fill("white");
    text("score="+ score, 270,30);
   
   spawnObstacles();
   spawnfood();
   spawnObstacles2();
   drawSprites();
  }

  //create function for spawning obstacles
  function spawnObstacles(){
    if (frameCount % 190 === 0) {
      var obstacle = createSprite(700,190,40,10);
      
      obstacle.addImage(ObstacleImage);
     obstacle.scale = 0.37;
      obstacle.velocityX = -6;
      obstacle.lifetime=400;  
      obstaclesGroup.add(obstacle);  
  }
  }
  
  function spawnObstacles2(){
    if (frameCount % 100 === 0) {
      var obstacle2 = createSprite(700,233,40,10);
     
      obstacle2.addImage(Obstacle2Image);
     obstacle2.scale = 0.3;
      obstacle2.velocityX = -6;
      obstacle2.lifetime=400;  
      obstacles2Group.add(obstacle2);  
  }
  }

  function spawnfood() {
    if (frameCount % 50 === 0) {
      var food = createSprite(400,50,40,10);
      food.y = Math.round(random(100,120));
      food.addImage(foodImg);
     food.scale = 0.1;
      food.velocityX = -6;
      food.lifetime=200;  
      foodGroup.add(food);
    }
    
  }
  