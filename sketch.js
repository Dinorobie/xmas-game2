
var character;
var bg,backgroundimg,invisibleGround;
var evil, evilimg
var tree

function preload(){
    characterimg= loadAnimation("./assets/char.gif");
    backgroundimg=loadImage("./assets/forest.gif");
    evilimg=loadImage("./assets/zombie.gif");
    treeimg=loadImage("./assets/goblin.webp")
}

function setup(){
    createCanvas(600, 450);
    
//Add background object
    bg = createSprite (400,180,600,600);
    bg.addImage("bg",backgroundimg);
    //bg.velocityX=1;
    // bg.velocityX = -(2 + 1)
    bg.velocityX = -1.5;

// Add zombie
    evil = createSprite(40,350,30,50);
    evil.addImage("evil",evilimg)
    evil.scale=0.58;
   

// Add character
    character = createSprite(170,350,30,50);
    character.addAnimation("character",characterimg);
    character.scale=0.5;


//Add invisible ground
//invisibleGround = createSprite(600,460,600,590);
    invisibleGround = createSprite(50,450,600,10);
    invisibleGround.visible = false;

    
}

function draw(){

    drawSprites(); 
   

//moving background
//if (bg.x > 400){
//    bg.x = 300;
//}
    if (bg.x <= 100){
        bg.x = 400;
      }


//move character
    if(keyDown("space") && character.y>=100){
        character.velocityY=-7;
    }



// add gravity to character+ground
    character.velocityY = character.velocityY + 0.8
    character.collide(invisibleGround); 
    evil.collide(invisibleGround); 
     // esta linea de codigo se sustituye con los IFs de arriba debido a el bug que tiene la engine p5 con la funcion collide.   
    //Add tree
    obstacles();
    console.log(obstacles)   
 }

 function obstacles(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite(600,400);
        obstacle.x = Math.round(random(80,120));
        obstacle.addImage(treeimg);
        obstacle.scale = 0.2;
        obstacle.lifetime = 200;
    }
}