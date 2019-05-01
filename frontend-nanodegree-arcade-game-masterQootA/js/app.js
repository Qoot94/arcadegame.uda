/**
 * @description sets object properties of Enemies our Player must avoid
 * @constructor Enemy constructor
 * @param {number} x - x-axis Enemy position in page
 * @param {number} y - y-axis Enemy position in page(random from 50 to 450 max)
 * @param {number} width - object size in width
 * @param {number} height - object size in height
 * @param {number} speed - object speed(random from 100 to 500 max)
 * @param {number} sprite - object image
 */
var Enemy = function(x, y) {
    this.X = -50;
    this.y = Math.floor(Math.random() * (450 - 50) + 50);
    this.width = 40;
    this.height = 20;
    this.speed = Math.random() * (500 - 100) + 100;
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Update the enemy's position, checks enemies/player collision
 * @param {number} dt- a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    this.x += Math.floor((this.speed * ((Math.random() * (2 - 1) + 1))) * dt);
    /*ensure player stays in playarea*/
    if (this.x > 650) {
        this.x = -100;
        this.y = Math.floor(Math.random() * (450 - 50) + 50);
    }
    if (this.y > 250) {
        this.x = -100;
        this.y = Math.floor(Math.random() * (450 - 50) + 50);
    }
    //checkCollisions
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        player.reset();

        console.log(player.score);
    }
    //count scor if player cross road
    if (player.y == -50) {
        player.score += 50;
        //win/lose message
        alert('game over!!' + player.score);
        player.reset();

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 *creats Enemy objects and gathers them in an array
 * @param {Array} allEnemies, array that contain all Enemy objects
 * @param {number} b
 * @returns {object} enemy, differnt Enemy objects with random y-axis and speed.
 */
var allEnemies = [];

function hatchEnemies(enemy, array) {
    allEnemies.push(enemy);
}
(function enemyEgg(enemy) {
    var enemy = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    enemy.forEach(hatchEnemies);
})();

/**
@description sets object/function properties of Player
* @constructor Player constructor
* @param {number} x - x-axis initial player position in page
* @param {number} y - y-axis initial player  position in page(random from 50 to 450 max)
* @param {number} width - object size in width
* @param {number} height - object size in height
* @param {number} score - player score after crossing(win)
* @param {number} sprite - object image
 @returns{function} reset - returns plyer to initial position of x and y
*/
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.height = 40;
    this.width = 20;
    this.sprite = sprite;
    this.reset = function() {
        player.x = 200;
        player.y = 300;
    }
}
// This class requires an update(), render() and
Player.prototype.update = function(dt) {}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// *constructs player of Player class with x,yand sprite as argumnts
var player = new Player(200, 300, 'images/char-horn-girl.png');
//*places additional info of dev:)
var dev = new Player(10, 589, 'images/dev1.png');

/**
@description **a handleInput() method. handles input of key arrows to move player object
* @param {string} keycode- key presses code that event listened to
*/
Player.prototype.handleInput = function(keycode) {
    if (keycode == "ArrowLeft") {
        if (player.x > 0) {
            player.x -= 50;
        }
    }
    if (keycode == "ArrowRight") {
        if (player.x < 450) {
            player.x += 50;
        }
    }
    if (keycode == "ArrowDown") {
        if (player.y < 400) {
            player.y += 50;
        }
    }
    if (keycode == "ArrowUp") {
        if (player.y > -50) {
            player.y -= 50;
        }
    }
};

// This listenemys for keycodepresses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    allowedKeys[e.code];
    player.handleInput(e.code);
});
