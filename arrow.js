$(document).ready(function(){
  var myCanvas = document.getElementById("arrow_canvas");
  var game = new Game();
  var id1;
  var id2;
  var collisionP1 = false;
  var collisionP2 = false;
  var p1dead = false;
  var p2dead = false;


function Game(){
  this.width = myCanvas.width;
  this.height = myCanvas.height;
  this.context = myCanvas.getContext("2d");
  this.context.fillStyle = "white";
  this.keys = new KeyListener();

  this.p1 = new Player(5, 0);
  this.p1.y = this.height/2 - this.p1.height/2;
  this.image1 = new Image();
  this.image1.src = "images/player1_1.png";
  this.p2 = new Player(this.width - 5 - 80, 0);
  this.p2.y = this.height/2 - this.p2.height/2;
  this.image2 = new Image();
  this.image2.src = "images/player2_1.png";

  this.a1Array = [];
  this.a1FiredArray = [];

  this.a2Array = [];
  this.a2FiredArray = [];

  this.h1Array = [];

this.p1h1 = new Heart;
this.p1h1.x = 185;
this.h1Array.push(this.p1h1);
this.p1h2 = new Heart;
this.p1h2.x = 216;
this.h1Array.push(this.p1h2);
this.p1h3 = new Heart;
this.p1h3.x = 247;
this.h1Array.push(this.p1h3);

  this.h2Array = [];

  this.p2h1 = new Heart;
  this.p2h1.x = 952;
  this.h2Array.push(this.p2h1);
  this.p2h2 = new Heart;
  this.p2h2.x = 983;
  this.h2Array.push(this.p2h2);
  this.p2h3 = new Heart;
  this.p2h3.x = 1014;
  this.h2Array.push(this.p2h3);
  // this.a1 = new Arrow();
  //
  // this.a1.x = this.p1.x;
  // this.a1.img = new Image();
  // this.a1.img.src = "images/arro_weapon_right.png";
  // this.a1Array.push(this.a1);
  // this.a2 = new Arrow();
  // this.a2.x = this.p2.x;
  // this.a2.img = new Image();
  // this.a2.img.src = "images/arro_weapon_left.png";
  // this.a2Array.push(this.a2);

};

Game.prototype.moveArrowRight = function(arrowNumber){
  console.log(game.a1Array);
  // clearInterval(id1);
  var self = this;
    id1 = setInterval(function(){
      if (!collisionP2){
    game.detectCollisionP2(arrowNumber);
  }
    self.a1Array[arrowNumber].x += 10;
    if(self.a1Array[arrowNumber].x > myCanvas.width){
      // self.a1Array.splice(arrowNumber,1);
      // clearInterval(id1);
    }
  }, 20)

};

Game.prototype.moveArrowLeft = function(arrowNumber){
  console.log(game.a2Array);
  // clearInterval(id2);
  var self2 = this;
    id2 = setInterval(function(){
      if (!collisionP1){
        game.detectCollisionP1(arrowNumber);
      }
    self2.a2Array[arrowNumber].x -= 10;
    if(self2.a2Array[arrowNumber].x < -100){
      // self2.a2Array.splice(arrowNumber2,1);
      // clearInterval(id2);
    }
  }, 20)

};

Game.prototype.detectCollisionP2 = function(arrowNumber){
  if (this.a1Array[arrowNumber].x < this.p2.x + this.p2.width &&
     this.a1Array[arrowNumber].x + this.a1Array[arrowNumber].width > this.p2.x &&
     this.a1Array[arrowNumber].y < this.p2.y + this.p2.height &&
     this.a1Array[arrowNumber].height + this.a1Array[arrowNumber].y > this.p2.y) {
       collisionP2 = true
     }
     if(collisionP2){
     console.log("collision detected for player 2!");
     this.p2.lives -= 1;
     this.h2Array.shift();
     console.log(this.h2Array);
     console.log(this.p2.lives);
     setTimeout(function(){
       collisionP2 = false;
     }, 300)
  }
};

Game.prototype.detectCollisionP1 = function(arrowNumber){
  // var collisionP1 = false;
  if (this.a2Array[arrowNumber].x < this.p1.x + this.p1.width &&
     this.a2Array[arrowNumber].x + this.a2Array[arrowNumber].width > this.p1.x &&
     this.a2Array[arrowNumber].y < this.p1.y + this.p1.height &&
     this.a2Array[arrowNumber].height + this.a2Array[arrowNumber].y > this.p1.y) {
       collisionP1 = true
  }
  if(collisionP1){
    console.log("collision detected for player 1!");
    this.p1.lives -= 1;
    this.h1Array.shift();
    console.log(this.h1Array);
    console.log(this.p1.lives);
      setTimeout(function(){
        collisionP1 = false;
      }, 300)
  }
};


  Game.prototype.draw = function(){
      this.context.clearRect(0, 0, this.width, this.height);
      // this.context.fillRect(this.width/2, 0, 2, this.height);

      this.p1.draw(this.context, this.image1);
    this.p2.draw(this.context, this.image2);

for (var i = 0; i < this.h1Array.length; i++){
  this.h1Array[i].draw(this.context, this.image);
};
for (var i = 0; i < this.h2Array.length; i++){
  this.h2Array[i].draw(this.context, this.image);
};

    // this.a1.draw(this.context, this.arrowimage1);

    for (var i = 0; i < this.a1Array.length; i++){
      this.a1Array[i].draw(this.context, this.a1Array[i].img)
    };

    for (var x = 0; x < this.a2Array.length; x++){
      this.a2Array[x].draw(this.context, this.a2Array[x].img)
      // console.log(this.a2Array);
    };






    // this.a2.draw(this.context, this.arrowimage2);
  };

  Game.prototype.update = function() {
    if (this.paused)
        return;

    if (this.keys.isPressed(83)) {
      this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
    }
    else if (this.keys.isPressed(87)) {
      this.p1.y = Math.max(0, this.p1.y - 4);
    };

    if (this.keys.isPressed(40)) {
      this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
    }
    else if (this.keys.isPressed(38)) {
      this.p2.y = Math.max(0, this.p2.y - 4);
    };



};

//
// $(".stupidButton").on("click", function(e){
//   e.currentTarget is the thing that got clicked
//   console.log("yooo,buttonpushedbrehand spacebardoesntreallywork");
// });





// console.log(this.p1.y);
  // this.a1.x = this.p1.x;
  // the while loop indicates that as long as the arrow x value is less than the width of the canvas, we're moving it to the right
  // this.draw_arrow();


//

// Game.prototype.draw_arrow = function(){
//   game.a1.x = 0;/*this.p1.x + this.p1.width*/
//   for (i = game.a1.x; i <= 100; i += .1) {
//     game.a1.x = i;
//     console.log(game.a1.x);
//     // console.log (game.a1.x);
//   }
// }

// Game.prototype.draw_arrow = function(){
//   game.a1.x = 0;/*this.p1.x + this.p1.width*/
//   while (game.a1.x <= this.width) {
//     game.a1.x += .1;
//     console.log(game.a1.x);
//     // console.log (game.a1.x);
//   }
// }

// left arrow: 37  a:65

// PLAYER
function Player(x,y) {
    this.x = x;
    this.y = y;
    // this.width = 2;
    // this.height = 28;
    this.lives = 3;
    this.width = 80;
    this.height = 116;
    this.image = new Image();
    // this.image.src = "images/player1_1.png";
    this.score = 0;

    this.draw = function (ctx, image){
      ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

};

// Player.prototype.draw = function(p)
// {
//     p.fillRect(this.x, this.y, this.width, this.height);
// };

//  ARROW
function Arrow(){
  // this.x = 0;
  // this.y = 0;
  this.width = 70;
  this.height = 20;
  // this.img = new Image();
  // this.arrows.src = "images/arro_weapon_right.png";

  this.draw = function(ctx, image){
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
};


function Heart(){
  this.width = 31;
  this.height = 29;
  this.y = 550;
  this.img = new Image();
  this.img.src = "images/life_heart.png";
  this.draw = function(ctx, image){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
};




// function shoot()
// {
//     var a = new Bitmap(arr_Img);
//
//     a.x = p1.x;
//     a.y = p1.y;
//
//     arrows.addChild(a);
//     game.update();
//
// };

// Game.prototype.update = function(){
//   if (this.keys.isPressed(65)) {
//     this.p1.shoot
//   };
// }



function KeyListener() {
  this.pressedKeys = [];

  this.keydown = function(e){
    this.pressedKeys[e.keyCode] = true;
  };

  this.keyup = function(e) {
    this.pressedKeys[e.keyCode] = false;
  };

document.addEventListener("keydown", this.keydown.bind(this));
document.addEventListener("keyup", this.keyup.bind(this));

};

KeyListener.prototype.isPressed = function(key){

  return this.pressedKeys[key] ? true : false;

};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback){

document.addEventListener("keypress", function(e){
  if (e.keyCode == keyCode)
  callback(e);
});

};






// function test (){
//   game.a1.x = 0;
//   while (game.a1.x <= game.width) {
//     game.a1.x += .5;
//     console.log (game.a1.x);
//   }
// }

function MainLoop() {
    game.update();
    game.draw();

    if (game.p1.lives < 1) {
      setTimeout(function(){
      p1dead = true;
        },1000)
    }

    if (game.p2.lives < 1) {
      setTimeout(function(){
      p2dead = true;
        },1000)
    }
    
    if (!p1dead && !p2dead){
      setTimeout(MainLoop, 33.3333);
    } else if(p1dead){
        alert("player 2 wins");
      location.reload();
    } else if(p2dead){
        alert("player 1 wins");
      location.reload();
    }
    // Call the main loop again at a frame rate of 30fps
}


// Start the game execution
MainLoop();


$(document).on("keydown",function(e){
  if(e.keyCode === 65){
    var myArrow = new Arrow();
    // this.a1.y = -32;
    myArrow.x = game.p1.x;
    myArrow.img = new Image();
    myArrow.img.src = "images/arro_weapon_right.png";
    myArrow.y = game.p1.y + game.p1.height/3;
    game.a1Array.push(myArrow);
    var index = game.a1Array.indexOf(myArrow);
    game.moveArrowRight(index);
    console.log(index);

    // for (var i = 0; i < game.a1Array.length; i++){
    //   game.a1Array[i].draw(game.context, game.a1Array[i].img)
    // }

  }
});

$(document).on("keydown",function(e){
  if(e.keyCode === 37){
    var myArrow2 = new Arrow();
    myArrow2.x = game.p2.x;
    myArrow2.img = new Image();
    myArrow2.img.src = "images/arro_weapon_left.png";
    myArrow2.y = game.p2.y + game.p2.height/3;
    game.a2Array.push(myArrow2);
    var index2 = game.a2Array.indexOf(myArrow2);
    console.log('index',index2);
    game.moveArrowLeft(index2);
  }
});



});   //end document ready
