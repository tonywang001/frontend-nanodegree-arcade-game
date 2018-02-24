// Base class for enemy and player
var Movable = function(x, y, sprite) {
    // Location
    this.x = x;
    this.y = y;
    // Image
    this.sprite = sprite;

    // Constants
    this.X_MIN = -50;
    this.X_MAX = 450;
    this.Y_MIN = -50;
    this.Y_MAX = 450;
};

// function that checks whether movable object is allowed
// to move
Movable.prototype.canMove = function(xSpeed, ySpeed) {
    if (xSpeed) {
        var targetX = this.x + xSpeed;
        return targetX < this.X_MAX && targetX > this.X_MIN;
    }

    if (ySpeed) {
        var targetY = this.y + ySpeed;
        return targetY < this.Y_MAX && targetY > this.Y_MIN;
    }
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Movable.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;

    // override base property
    this.X_MIN = -100;
    this.X_MAX = 500;
};

Enemy.prototype = Object.create(Movable.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.canMove(this.speed * dt, undefined)) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// The player
var Player = function() {
    Movable.call(this, 200, 380, 'images/char-boy.png');
    this.xSpeed = 100; 
    this.ySpeed = 80; 
};

Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;

// Update player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(x, y) {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input
Player.prototype.handleInput = function(key) {
    console.log('key pressed');
    switch(key) {
        case 'left':
            if (this.canMove(this.xSpeed * -1, undefined)) {
                this.x -= this.xSpeed;
            }
            break;
        case 'up':
            if (this.canMove(undefined, this.ySpeed * -1)) {
                this.y -= this.ySpeed;
            }
            break;
        case 'right':
            if (this.canMove(this.xSpeed, undefined)) {
                this.x += this.xSpeed;
            }
            break;
        case 'down':
            if (this.canMove(undefined, this.ySpeed)) {
                this.y += this.ySpeed;
            }
            break;
        default:
            break;
    }
    console.log('x = ' + this.x + ' y = ' + this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 60, 30);
var enemy2 = new Enemy(-100, 140, 40);
var enemy3 = new Enemy(-100, 220, 50);

var allEnemies = [
    enemy1,
    enemy2,
    enemy3
];

var player = new Player();

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
