var lives = 3;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100 ; 
    // as the boundry of canvas is from 0 to 606 
    //so enemy will be between them and away from water side and Grass Side
    this.y = rondumNum(200 , 50);
    // this height and width for check collision fn. 
    this.h = 50;    
    this.w = 50;
    // speed of enemy 
    this.speed = rondumNum(300 , 50); 
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
    // determine the player design 
    this.sprite = 'images/char-boy.png'; 
    // first x coordinator 
    this.x = 200 ;  
    // first Y coordinator
    this.y = 400 ;
    // player's height 
    this.h = 50 ; 
    // player's width 
    this.w = 50 ; 
}
// This class requires an update(), render() and
// the update fn for update player's Pos 
Player.prototype.update = function (){
    this.xn = this.x;
    this.yn = this.y; 
}
// the render fn  for drawing the player
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite) , this.x , this.y )
}
// a handleInput() method. to move the player right or left or up or down 
Player.prototype.handleInput = function(key){
    //check the key if it is left and the player far from the left boundry for canvas then decrease its x pos
    if ( key === 'left' && this.x > 20) {
        // move will be 50 
        this.x = this.x - 50 ;
    // check for up boundry  
    }else if ( key === 'up' && this.y > 50 ) {
        this.y = this.y - 50 ;
    // check for right boundry
    }else if (key === 'right' && this.x < 400) {
        this.x = this.x + 50; 
    // check for down boundry
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
// this for generate for first load
enemy.group(3)
// this fun for generate 3 enemies  
function myenemy() {
    enemy.group(3)
}
// this timer for generate enemy every 3 secounds 
var tim = setInterval(myenemy, 3000);

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
// class for text at top of game 
var Stat = function() {
    this.fontColor = 'white';
    this.curlevel = 1;
    this.curlives = 3;
    this.curScore = 0;
}
// fun. for write our status at the game to the player know his lives and his level
Stat.prototype.render = function() {
    ctx.font= "20px Georgia";
    ctx.textAlign = 'start';
    ctx.fillText('Level : ' + this.curlevel + '     your Score ==> ' + this.curScore + '       Lives : ' + this.curlives , 25 , 82);
}
var stat = new Stat();
// check collision fun. 
function checkCollisions() {
    //collision fun check if two item collision or not 
    // by check pos x for one item and pos x for secound include its width
    // and for second item check its x pos and Pos x for another and its width
    // same as Y Pos and height 
    function collision(r,t) {  
        return r.x < t.x+ t.w && r.x + r.w > t.x && r.y < t.y+t.h && r.y + r.h > t.y ;
    }
// this for loop to check player colliosion for any enemy
    for (var i = allEnemies.length - 1; i >= 0; i--) {
        if (collision(player , allEnemies[i])){
            player.x = 200 ; 
            player.y = 400;
            stat.curlives= stat.curlives -1; 
        }
    }
    // this for reset player for reach water side 
    if (player.y === 50 ) {
        player.x = 200 ; 
        player.y = 400;
        stat.curlevel = stat.curlevel+1;
        stat.curScore = stat.curScore + 200;
        if (stat.curlevel === 10){
            alert ('Congratulations!!! You Win and reach to level 10 & You have ' + stat.curScore + ' Points With '+ stat.curlives + ' Lives')
            location.reload();
            // reset level and score to playe again
            stat.curlevel= 1 ;
            stat.curScore = 0 ;
        }
    }
    // game over 
    if (stat.curlives === 0){
        alert('GameOver Please Play Again')
        location.reload();
        // reset lives to play again
        stat.curlives = 3;
    }
}
// random fun for generate one number between two numbers
function rondumNum (x,y) {
    return Math.floor(Math.random() * x) + y;
}
