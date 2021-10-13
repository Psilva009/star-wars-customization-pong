var c3po, c3poLado, c3poFrente, c3poBravo;
var r2d2, r2d2Lado, r2d2Frente, r2d2Desligado;
var bola, bolaImage;
var bordas;
var somR2d2, somC3po, somHit;

//estados
//sacar
//jogar
//fim
var estadoJogo = "sacar";
//variáveis para manter a pontuação
var placarC3po = 0;
var placarR2d2 = 0;

function desenharRede(){
  stroke("white");
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
}

function sacar() {
  bola.velocityX = 3;
  bola.velocityY = 4;
}

function redefinir() {
  bola.x = 200;
  bola.y = 200;
  bola.velocityX = 0;
  bola.velocityY = 0;
  r2d2.y = 200;
  c3po.y = 200;
}



function preload(){
  c3poLado = loadImage("c3po_jogavel.png");
  r2d2Lado = loadImage("r2d2_jogavel.png");
  c3poFrente = loadImage("c3po_parado.png");
  r2d2Frente = loadImage("r2d2_parado.png");
  c3poBravo = loadImage("c3po_bravo.png");
  r2d2Desligado = loadImage("r2d2_queimado.png");
  somR2d2 = loadSound("r2d2-sad.wav");
  somC3po = loadSound("c3po-ouch.mp3");
  somHit = loadSound("hit.wav");
}

function setup() {
  createCanvas(400, 400);
  bordas =  createEdgeSprites();
  
  c3po = createSprite(25,200);
  c3po.scale = 0.8;
  
  r2d2 = createSprite(370,200);
  r2d2.scale = 0.8;
  
  bola = createSprite(200,200,15,15);
  bola.shapeColor = "red";
  
  r2d2.addImage("frente", r2d2Frente);
  c3po.addImage("frente", c3poFrente);
  r2d2.addImage("lado", r2d2Lado);
  c3po.addImage("lado", c3poLado);
  r2d2.addImage("perdeu", r2d2Desligado);
  c3po.addImage("perdeu", c3poBravo);
}

function draw() {
  background('black');
  r2d2.velocityY = 0;
  c3po.velocityY = 0;
  //coloque texto de informação no centro
  if (estadoJogo === "sacar") {
    fill("white");
    text("Aperte espaço para sacar",150,180);
    
  }
      
  //exibe o placar
  fill("white");
  text(placarC3po, 170,20);
  text(placarR2d2, 230,20);
  
  if(estadoJogo == 'jogar'){
    r2d2.changeImage("lado");
    c3po.changeImage("lado");
  }
  
  if (keyDown("space") &&  estadoJogo === "sacar") {   
    estadoJogo = "jogar";
    sacar();
  }
  
  desenharRede(); 
  
  if(bola.isTouching(r2d2) || bola.isTouching(c3po) || bola.isTouching(bordas[2]) || bola.isTouching(bordas[3])){
    somHit.play();
  }
  bola.bounceOff(r2d2);
  bola.bounceOff(c3po);
  bola.bounceOff(bordas[2]);
  bola.bounceOff(bordas[3]);
  
  if(keyDown("up")){
    r2d2.velocityY = -5;
  }
  
  if(keyDown("down")){
    r2d2.velocityY = 5;
  }
  
  
  if(keyDown("w")){
    c3po.velocityY = -5;
  }
  
  if(keyDown("s")){
    c3po.velocityY = 5;
  }
  
  
  //redefina a bola para o centro se ela cruzar a tela
  if(bola.x > 400 || bola.x <0) {
    
    if(bola.x > 400) {
      placarC3po = placarC3po + 1;
      somR2d2.play();
      r2d2.changeImage("perdeu");
    }
    
    if(bola.x < 0) {
      placarR2d2 = placarR2d2 + 1;
      somC3po.play();
      c3po.changeImage("perdeu");
    }
    
    redefinir();
    estadoJogo = "sacar";
  }
  
  if (placarR2d2 === 3 || placarC3po === 3) {
    estadoJogo = "fim";
    text("Game Over", 170,160);
    text("Aperte R para recomeçar", 150,180);
    if(placarR2d2 === 3){
      fill("red");
      textSize(25);
      text("R2D2 venceu", 150,300);
    }
    if(placarC3po === 3){
      fill("red");
      textSize(25);
      text("C3PO venceu", 150,300);
    }
  }
  
  if (keyDown("r") && estadoJogo === "fim") {
    estadoJogo = "sacar";
    r2d2.changeImage("frente");
    c3po.changeImage("frente");
    r2d2.y = 200;
    c3po.y = 200;
    placarC3po = 0;
    placarR2d2 = 0;
  }
  
  
  drawSprites();
}