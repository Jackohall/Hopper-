let lvl = 1,
    lives = 5,
    livesRem = document.querySelector('.lives > span'),
    score = document.querySelector('.level > span')
livesRem.innerText = lives;
score.innerText = lvl;

// Enemies our player must avoid
class Enemy {
    constructor(x, y, movement) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.movement = movement;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/spear_enemy.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.movement * dt;

        if (this.x > 600) {
            this.x = -200;
        }
        if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 400;
            lives--;
            livesRem.innerText = lives;
            if (lives === 0) {
                document.getElementById("overlay").classList.add("move")
                lives = 5;
                lvl = 1;
                livesRem.innerText = lives;
                score.innerText = lvl;
                console.log('Game over');
            }
        }
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y, movement) {
        this.x = x;
        this.y = y;
        this.movement = movement;
        this.sprite = 'images/denny.png';
    }
    update() {
        // Restricts players movements
        if (this.y > 380) {
            this.y = 380;
        }
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.x = 200;
            this.y = 380;
            lvl++;
            score.innerText = lvl;
            if (lvl === 20) {
                console.log("hi");
                lives = 5;
                lvl = 1;
                score.innerText = '';
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Moves Player with keyboard arrow keys
    handleInput(arrowKeyPressed) {
        switch (arrowKeyPressed) {
            case 'left':
                this.x -= this.movement + 50;
                break;
            case 'up':
                this.y -= this.movement + 30;
                break;
            case 'right':
                this.x += this.movement + 50;
                break;
            case 'down':
                this.y += this.movement + 30;
                break;
        }
    }
}

function off() {
    document.getElementById("overlay").classList.remove("move")
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);
enemyPosition.forEach((enemyPositionCoordinate) => {
    let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
