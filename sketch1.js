
var character;
var bg,backgroundimg,invisibleGround;
var evil, evilimg;
var tree, group;
var statict;
var gameState= 1;
var score=0;


function preload(){
    characterimg= loadAnimation("./assets/goblin_01.png","./assets/goblin_02.png","./assets/goblin_03.png");
    backgroundimg=loadImage("./assets/xmas_2bg.png");
    evilimg=loadAnimation("./assets/bear_01.png","./assets/bear_02.png","./assets/bear_03.png","./assets/bear_04.png",
    "./assets/bear_05.png","./assets/bear_06.png");
    staticimg = loadAnimation("./assets/santa_01.png","./assets/santa_02.png","./assets/santa_03.png","./assets/santa_04.png","./assets/santa_05.png")
    treeimg=loadImage("./assets/obs_tree.png")
}

function setup(){
createCanvas(windowWidth, windowHeight);
    
//Add background object
   bg = createSprite (width-5,height/2-30,width, height);
   bg.addAnimation("bg",backgroundimg);
    //bg.velocityX=1;
    // bg.velocityX = -(2 + 1)

// Add vilan
    evil = createSprite(150,height-3,30,50);
    evil.addAnimation("evil",evilimg)
    evil.scale=0.3;
    

// Add character
    character = createSprite(500,height-100,30,50);
    character.addAnimation("character",characterimg);
    character.scale=0.9;
    // character.setCollider("circle",0,0,40);
    // character.debug = true;

// Add static
    // statict = createSprite(500,height-780,30,50);
    // statict.addAnimation("static",staticimg);
    // statict.scale=0.4;


//Add invisible ground
//invisibleGround = createSprite(600,460,600,590);
    invisibleGround = createSprite(50,height-3,width,10);
    invisibleGround.visible = false;

    group = new Group();

    
}

function draw(){
   background(0);
   // print(character.x)
   // print(character.y)
   
   
   
    if (gameState === 1){
        //puntuacion
        
        score = score + Math.round(getFrameRate()/60);
        
        //moving background
        bg.velocityX = -(6.3+score/100);
        if (bg.x <= 200){
            bg.x = width-300;
        }

     //move character 
        if(keyDown("space") && character.y>=height-300){
            character.velocityY=-14;
            evil.y = character.y;
        }

     // add gravity to character+ground
        character.velocityY = character.velocityY + 0.8
        character.collide(invisibleGround); 
        evil.velocityY = evil.velocityY + 0.9
        evil.collide(invisibleGround); 
        // esta linea de codigo se sustituye con los IFs de arriba debido a el bug que tiene la engine p5 con la funcion collide.   
        //Add tree
        statics();
        obstacles();

        if(group.isTouching(character)){
            gameState = 0;
            console.log("se acabo el juego");  
        }    
        drawSprites();
        textSize(20);
        fill("blue");
        stroke("white");
        text("score: " + score,width-180,50)
    }
    else if (gameState === 0){

        textSize(50);
        stroke("red");
        fill("white");
        text("Game Over",width/3,height/2);

        }
    //console.log(obstacles)   
    
 }

 function obstacles(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite(width+100,height-100);
        obstacle.x = Math.round(random(width+100, width+150));
        obstacle.velocityX = -(6.3+3*score/100);
        obstacle.addImage(treeimg);
        obstacle.scale = 0.2;
        obstacle.lifetime = (width/2);

        group.add(obstacle)
    }
}

function statics(){
    if (frameCount % 60 === 0) {
        statict = createSprite(525,height-820,30,50);
        statict.y = Math.round(random(height-780, height-500));
        //statict.x = Math.round(random(width+100, width+150));
        statict.addAnimation("static",staticimg);
        statict.scale=0.5;       
        statict.velocityX = 3.3;
        
         //asignar ciclo de vida a la variable
         statict.lifetime = 60;
        
        //agregar cada nube al grupo
      }
    
}
