// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.height = 50;
    this.width = 80;
    this.speed = Math.floor(Math.random() * 220);


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 510) {
        this.x += this.speed * dt;
    } else {
        this.x = -200;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
        this.x = x;
        this.y = y;

        this.height = 80;
        this.width = 50;

        // Now instantiate your objects.
        // Place all enemy objects in an array called allEnemies
        // Place the player object in a variable called player

        Player.prototype.update = function() {
            if (this.y <= 0) {
                this.x = 202;
                this.y = 405;
            }

        };

        Player.prototype.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };

        // moving player using keyboard
        Player.prototype.handleInput = function(keyPress) {
            if (keyPress == 'up' && this.y > 0) {
                this.y -= 83;
            }
            if (keyPress == 'down' && this.y < 402) {
                this.y += 83;
            }
            if (keyPress == 'left' && this.x > 0) {
                this.x -= 102;
            }
            if (keyPress == 'right' && this.x < 402) {
                this.x += 102;
            }
        };

        //comparing position of each enemy with position of the player 

        Player.prototype.reset = function(x, y) {
            this.x = x;
            this.y = y;
        };

        function checkCollisions(player, allEnemies) {
            for (var i = 0; i < allEnemies.length; i++) {
                if (allEnemies[i].x < player.x + player.width && allEnemies[i].x + allEnemies[i].width > player.x && allEnemies[i].y < player.y + player.height && allEnemies[i].y + allEnemies[i].height > player.y) {
                    player.reset(200, 400);
                }
            }
        }

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