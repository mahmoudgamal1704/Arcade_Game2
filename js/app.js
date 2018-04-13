var lives = 3;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 ; 
    this.y = rondumNum(300 , 50); // as the boundry of canvas is from 0 to 606 so enemy will be between them and away from water side and boy start side
    this.h = 50; 
    this.w = 50;
    this.speed = rondumNum(300 , 50); // speed of enemy 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt ; 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function () {
    // determine the player paramter
    this.sprite = 'images/char-boy.png'; // determine the player design 
    this.x = 200 ;  // first x coordinator 
    this.y = 400 ; // first Y coordinator
    this.h = 50 ; // player's height
    this.w = 50 ; // player's width 
}
// This class requires an update(), render() and
// the update fn 
Player.prototype.update = function (){
    this.xn = this.x;
    this.yn = this.y; 
}
// the render fn 
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite) , this.x , this.y )
}
// a handleInput() method.
Player.prototype.handleInput = function(key){
    if ( key === 'left' && this.x > 20) {
        this.x = this.x - 50 ; // move will be 50 
    }else if ( key === 'up' && this.y > 50 ) {
        this.y = this.y - 50 ;
    }else if (key === 'right' && this.x < 400) {
        this.x = this.x + 50; 
    }else if ( key === 'down' && this.y < 400){
        this.y = this.y + 50; 
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = []; 
Enemy.prototype.group = function(num) {
    for (var i = 0; i < num ; i++) {
        allEnemies.push(new Enemy());
    }
}
// Place the player object in a variable called player
var player = new Player() ;
var enemy = new Enemy();
enemy.group(2);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function collision(r,t) {
    if (r.x < t.x+ t.w && r.x + r.w > t.x && r.y < t.y+t.h && r.y + r.h > t.h){
        return true ;
    }
}

function checkCollisions() {
    for (var i = allEnemies.length - 1; i >= 0; i--) {
        if (collision(player , allEnemies[i])){
            player.x = 200 ; 
            player.y = 400;
            lives= lives -1; 
        }
    }
    if (player.y === 50 ) {
        player.x = 200 ; 
        player.y = 400;
        enemy.group(2);
    }
    if (lives === 0){
        alert('GameOver Please Play Again')
        location.reload();
    }
}
function rondumNum (x,y) {
    return Math.floor(Math.random() * x) + y;
}