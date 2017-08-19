var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.shadowBlur=100;
context.shadowColor="black";
var game = new Game();
// var enemy = new Enemy();
var firedMissile;
var reloadingMissile;


// Game Constructor////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Game(){

this.width = canvas.width;
this.height = canvas.height;
this.keys = new KeyListener();
this.playerShip = new Ship(this.width /2 -79 ,690);
this.enemy = new Enemy();

}

Game.prototype.draw = function()
{
    context.clearRect(0, 0, this.width, this.height);
    this.playerShip.draw(context);
    this.enemy.draw(context);
};


Game.prototype.updateMovement = function(){

    if (this.keys.isPressed(37)) { // Left
         this.playerShip.updateLeft();
     } else if (this.keys.isPressed(39)) { // Right
         this.playerShip.updateRight();
     }
};
this.spaceIsPressed = true;

Game.prototype.updateShooting = function(){

    if (this.keys.isPressed(32)){
        if(spaceIsPressed === true){
          this.playerShip.stockedMissiles[0].update();
          spaceIsPressed = false;
        }
    }
    if (!this.keys.isPressed(32)) {
      spaceIsPressed = true;
    }
};

Game.prototype.detectCollision = function(){
  if (game.playerShip.firedMissiles[0].x < this.enemy.x + this.enemy.width &&
     game.playerShip.firedMissiles[0].x + game.playerShip.firedMissiles[0].width > this.enemy.x &&
     game.playerShip.firedMissiles[0].y < this.enemy.y + this.enemy.height &&
     game.playerShip.firedMissiles[0].height + game.playerShip.firedMissiles[0].y > this.enemy.y) {

     console.log("collision detected!");
     this.enemy.image.src = 'img/explosion.png';
  }
};

// Ship Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ship(x,y){
  this.image = new Image();
  this.image.src = 'img/ship.png';
  this.x = x;
  this.y = y;
  this.height = 130;
  this.width = 130;
  this.speed = 17;
  this.stockedMissiles = [];
  for(var m = 0;m < 30; m++){
    this.stockedMissiles[m] = new Missile();
  }
  this.firedMissiles = [];
  }

  Ship.prototype.draw = function(){
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  Ship.prototype.updateRight = function(){
    game.playerShip.x = Math.min(game.width - game.playerShip.width - 55, game.playerShip.x + game.playerShip.speed);
  };

  Ship.prototype.updateLeft = function(){
    game.playerShip.x = Math.max(0, game.playerShip.x - game.playerShip.speed);
  };


// Missile Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Missile(x,y){
  this.alive = false;
  this.image = new Image();
  this.image.src = 'img/missile.png';
  this.x = x;
  this.y = y;
  this.yv = 4;
  this.height = 100;
  this.width = 80;
}

Missile.prototype.draw = function(){
  if(this.alive === true){
    console.log("this.alive is true");
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  }

};

Missile.prototype.update = function(){
  this.alive =true;
  if(this.alive === true){
    firedMissile = game.playerShip.stockedMissiles.splice(0,1)[0];
    game.playerShip.firedMissiles.push(firedMissile);
    console.log(game.playerShip.stockedMissiles);
    this.x = game.playerShip.x + 25;
    this.y = game.playerShip.y - 55;
    var self = this;
    var x =  setInterval(function(){
      context.drawImage(self.image,self.x, self.y, self.width, self.height);
      game.detectCollision();
      self.y -= self.yv;
        if(self.y < -100){
          clearInterval(x);
          reloadingMissile = game.playerShip.firedMissiles.splice(0,1)[0];
          game.playerShip.stockedMissiles.push(reloadingMissile);
          self.alive = false;
        }
      },5);
    }
};



// Collision Detector////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var explosion = new Image();
// explosion.src = 'img/Explosion.png';
//
// var spriteWidth  = 1152,
//     spriteHeight = 69,
//     pixelsLeft   = 170,
//     pixelsTop    = 10,
//     // Where are we going to draw
//     // the sprite on the canvas
//     canvasPosX   = 150,
//     canvasPosY   = 150
// ;
//
// context.drawImage(explosion,
//     pixelsLeft,
//     pixelsTop,
//     spriteWidth,
//     spriteHeight,
//     canvasPosX,
//     canvasPosY,
//     spriteWidth,
//     spriteHeight
// );

// function Sprite(img, width, height, positions){
//   this.img = img;
//   this.width = width;
//   this.height = height;
//   this.positions = positions;
// }
// Sprite.prototype = {
//   draw: function(position, x, y){
//       var pos = this.positions[position];
//       context.drawImage(
//         this.img,
//         pos[0],
//         pos[1],
//         this.width,
//         this.height,
//         x, y,
//         this.width,
//         this.height
//       );
//     }
// };
//
// var explosionSprite = new Sprite(explosion, 32, 16, [
//     // specify a sprite location
//     [10, 523]
// ]);
//
// explosionSprite.draw(0, 10, 200);
// explosionSprite.draw(1, 50, 200);
// explosionSprite.draw(2, 90, 200);




// Enemy Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Enemy(){
  this.image = new Image();
  this.image.src = 'img/orangeEnemyShip.png';
  this.health = 1;
  this.x = 100;
  this.y = 100;
  this.height = 110;
  this.width = 120;
  this.speed = 10;

  Enemy.prototype.draw = function(){
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  };
}


// KeyListener Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyListener() {
    this.pressedKeys = [];

    this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
    };

    this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
    };

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(key)
{
    return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
{
    document.addEventListener("keypress", function(e) {
        if (e.keyCode == keyCode)
            callback(e);
    });
};

// MainLoop Constructor//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MainLoop(){
  game.draw();
  game.updateMovement();
  game.updateShooting();
  setTimeout(MainLoop, 20);
}




MainLoop();
