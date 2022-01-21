var bg,bgImage
var zombie, zombieGroup, zombieImage
var soldier, soldierImage
var diamond,diamondGroup, diamondImage
var bullet,bulletImage,bulletGroup
var ground, gameoverbg, gameoverbgImage
var blast, blastImage,score 
var gameState = "play"




function setup() {
  createCanvas(800,400);
  bg = createSprite(100, 250, 800, 400);
  bg.addImage(bgImage);
gameoverbg = createSprite(400, 200,800, 400);
gameoverbg.addImage(gameoverbgImage)
soldier = createSprite(110, 250, 20, 10);
soldier.addAnimation("running",soldierImage);
ground=createSprite(400,380,800,20);
bulletGroup=new Group();
zombieGroup=new Group()
diamondGroup=new Group();
}
function preload(){
gameoverbgImage=loadImage("Images/gameoverbg.png")
blastImage=loadAnimation("Images/b1.png","Images/b2.png","Images/b3.png","Images/b4.png",
"Images/b5.png","Images/b6.png","Images/b7.png","Images/b8.png",
"Images/b9.png","Images/b11.png","Images/b12.png",
"Images/b13.png","Images/b14.png","Images/b15.png","Images/b16.png","Images/b17.png",
"Images/b18.png","Images/b19.png","Images/b20.png")
bgImage=loadImage("Images/bg.jpg");
diamondImage=loadImage("Images/1.png")
bulletImage=loadImage("Images/bullet.png")
zombieImage=loadAnimation("Images/zombie-icegif-2-0.png","Images/zombie-icegif-2-1.png",
"Images/zombie-icegif-2-2.png","Images/zombie-icegif-2-3.png",
"Images/zombie-icegif-2-4.png","Images/zombie-icegif-2-5.png",
"Images/zombie-icegif-2-6.png","Images/zombie-icegif-2-7.png","Images/zombie-icegif-2-8.png",
"Images/zombie-icegif-2-9.png","Images/zombie-icegif-2-10.png","Images/zombie-icegif-2-11.png",
"Images/zombie-icegif-2-12.png","Images/zombie-icegif-2-13.png","Images/zombie-icegif-2-14.png",
"Images/zombie-icegif-2-15.png","Images/zombie-icegif-2-16.png","Images/zombie-icegif-2-17.png",
"Images/zombie-icegif-2-18.png")
soldierImage=loadAnimation("Images/soldier-0.png","Images/soldier-1.png","Images/soldier-2.png",
"Images/soldier-3.png","Images/soldier-4.png","Images/soldier-5.png",
"Images/soldier-6.png","Images/soldier-7.png","Images/soldier-8.png",
"Images/soldier-9.png","Images/soldier-10.png","Images/soldier-11.png",
"Images/soldier-12.png","Images/soldier-13.png","Images/soldier-14.png",
"Images/soldier-15.png","Images/soldier-16.png","Images/soldier-17.png",
"Images/soldier-18.png","Images/soldier-19.png","Images/soldier-20.png",
"Images/soldier-21.png","Images/soldier-22.png","Images/soldier-23.png",
"Images/soldier-24.png","Images/soldier-25.png","Images/soldier-26.png",
"Images/soldier-27.png","Images/soldier-28.png")



}

function Zombies(){
if(frameCount % 150 === 0){
zombie=createSprite(700,250,20,20);
zombie.addAnimation("running",zombieImage);
zombie.addAnimation("blast",blastImage);
zombie.velocityX=-4
zombie.y=Math.round(random(150,380))
zombie.scale=0.4
zombieGroup.add(zombie)
zombie.lifetime=300
}
}

function Diamonds(){
  if(frameCount % 200 === 0){
  diamond=createSprite(700,300,20,20);
  diamond.addImage("diamond",diamondImage);
  diamond.velocityX=-3
  diamond.y=Math.round(random(60,400))
  diamond.scale=0.1
  diamondGroup.add(diamond);
  diamond.lifetime=300
  }
  }
  
  function shootBullet(){
    bullet= createSprite(150, width/2, 50,20)
    bullet.y= soldier.y-20
    bullet.addImage(bulletImage)
    bullet.scale=0.12
    bullet.velocityX= 7
    bulletGroup.add(bullet)
    
  }


function draw() {
  background(255,255,255); 
  console.log(gameState)
  ground.visible = false
  gameoverbg.visible=false

if(gameState === "play"){
  
  if(bg.x < 300){
    bg.x=400
    
      }
      bg.velocityX=-2
    
Zombies();
Diamonds();

      if(keyDown("space")){
        shootBullet();
        playSound("bulletsound.mp3");
      }
    
      if(keyDown(UP_ARROW) && soldier.y > 200){
        soldier.velocityY = -10;
      }
    
      soldier.velocityY=soldier.velocityY + 0.5
      
      if(soldier.isTouching(zombieGroup)){
bg.velocityX=0
gameState="end"

      }

      if(bulletGroup.isTouching(zombieGroup)){
    handleCollision();
    playSound("explosion.mp3")
      }

      if(soldier.isTouching(diamondGroup)){
        diamondGroup.destroyEach();
      }
      
}
else if(gameState === "end"){


  soldier.remove();
  zombieGroup.destroyEach();
  diamondGroup.destroyEach();
  textSize(30);
  text("Game Over!",400,200);
  soldier.velocityY = 0
gameoverbg.visible=true
}

  soldier.collide(ground)





  drawSprites();
}

function handleCollision(){

blast=createSprite(bullet.x+30,bullet.y+30,20,20)
blast.addAnimation("blast",blastImage);
blast.life=30;
bulletGroup.destroyEach();
zombieGroup.destroyEach();
}