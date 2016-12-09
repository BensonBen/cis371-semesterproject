//variable that holds the game state. resolution, renderer type and div id
var game = new Phaser.Game(1024,768, Phaser.CANVAS, 'gameDiv');
var starfield;
var speedShip;
var control;
var levelText;

var bullets;
var laserSpeed = 0;
var spaceBar;
var p;
var shotsFired = 0;
var accuracy = 0;

var enemies;
var lifeGroup;
var score = 0;
var scoreText;
var accText;
var winText;
var vm = this;
var level= 0;
var lives = 3;
var livesText;
//JSON object of functions

/*
* For Tommorow understand how a group works.
* Understand more of the actual group objects.
*/
var mainState = {
	preload:function(){
		//intially set up to grab our assets for the actual game state itself.
		//the first argument to the image object is "starfield id", then the path to it.
		game.load.image('starfield','phaser/assets/starfield.png');
		game.load.image('speedShip', 'phaser/assets/speedship.png');
		game.load.image('bullet','phaser/assets/particle_small.png');
		game.load.image('asteroid1','phaser/assets/asteroid1.png');
		game.load.image('asteroid2','phaser/assets/asteroid2.png');
		game.load.image('asteroid3','phaser/assets/asteroid3.png');
	},
	create:function(){
		//arguments are 
		starfield = game.add.tileSprite(0,0,1024,768,'starfield');
		//add the player or starship to the center of the screen
		speedShip = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'speedShip');
		game.physics.enable(speedShip, Phaser.Physics.ARCADE);
		speedShip.body.collideWorldBounds = true;
		control = game.input.keyboard.createCursorKeys();

		//group for laser's firing from the space ship
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		makeLives();
		scoreText = game.add.text(0,710, 'Score: ', {font: '26px Arial', fill: '#fff'});
		accText = game.add.text(0, 660, 'Accuracy: ', {font: '26px Arial', fill: '#fff'});
		levelText = game.add.text(900,710, 'Level: 0', {font: '26px Arial', fill: '#fff'});
		winText = game.add.text(game.world.centerX, game.world.centerY, 'You died... alot', {font: '32px Arial', fill: '#fff'});
		livesText = game.add.text(150,690, 'lives', {font: '12px Arial', fill: '#fff'});
		winText.visible = false;
		spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		p = game.input.keyboard.addKey(Phaser.Keyboard.P);
		moveAsteroids();
		spawnAsteroids();
	},
	update:function(){
		//updates every frame of the game.
		game.physics.arcade.overlap(bullets, enemies, handleEnemyShot, null, this);
		game.physics.arcade.overlap(speedShip, enemies, shipCollision, null, this);
		starfield.tilePosition.y += 2;
		//
		speedShip.body.velocity.x = 0;
		speedShip.body.velocity.y = 0;
		if(control.left.isDown){
			//negative to move to the left
			speedShip.body.velocity.x = -220;

		}
		if(control.right.isDown){
			//positive to move to the right
			speedShip.body.velocity.x = 220;
		}
		if(control.up.isDown){
			speedShip.body.velocity.y = -220;
		}
		if(control.down.isDown){
			speedShip.body.velocity.y = 220;
		}
		if(spaceBar.isDown){
			shot();
		}
		if(p.onDown){
			if (game.paused = false){
				game.paused = true;
			}
			else game.paused = false;
		}
		scoreText.text = 'Score: '+ score;
		accText.text = 'Accuracy: '+ accuracy + '%';
		enemies.forEachAlive(function(rock){
			rock.angle += 1;
		}, this)
	}
}

function makeLives(){
	var lifeGraphic = game.add.graphics(0,0);
	lifeGraphic.beginFill(0xFFFFFF);
	lifeGraphic.drawRect(150,690, 180, 50);
	lifeGraphic.alpha = .3
	lifeGroup = this.game.add.group();
	for(var i = 0; i < lives; i++){
		var lifeShip = lifeGroup.create(150 + 70 * i, 700, 'speedShip');
		lifeShip.scale.setTo(.6);
	}
}

function shipCollision(ship, rock){
	lives --;
	ship.kill();
	lifeGroup.children[lifeGroup.length - 1].destroy();
	if(lives > 0){
		--level;
		this.create();
	}
	else if(lives == 0){
		window.setTimeout(function(){
				winText.visible = true;
				game.paused = true;
				if (confirm("Submit high score?") == true){
					var name = prompt("Please enter your name:");
					if (name != null){
						document.getElementById("name").value = name;
						document.getElementById("score").value = score;
						document.getElementById("accuracy").value = accuracy;
						document.getElementById("scoreform").submit();
					}
				}
				else if(confirm("Do you wish to play again?") == true) {
   					location.reload();
				}
		}, 800);
	}
}

function shot(){
	if(game.time.now > laserSpeed){
		bullet = bullets.getFirstExists(false);
		if(bullet){
			bullet.reset(speedShip.x+32, speedShip.y);
			bullet.body.velocity.y = -400;
			laserSpeed = game.time.now +200;
			shotsFired += 1;
			accuracy = ((score / shotsFired) * 100).toFixed(2);
		}
	}
}

function handleEnemyShot(bullet, enemy){
	enemy.destroy();
	bullet.kill();
	score += 1;
	accuracy = ((score / shotsFired) * 100).toFixed(2);
	if(enemies.length === 0){
		spawnAsteroids()
	}
}

function descend(){
	vm.enemies.y += 10;
}

function spawnAsteroids(){
	level ++;
	for(var i = 0; i < 10 + level * 4; i++){
		var randomEnemy = Math.floor(Math.random() * 3) + 1;
		var enemy = enemies.create(this.game.rnd.integerInRange(100, 900), 
			this.game.rnd.integerInRange(50, 200), 'asteroid'+randomEnemy)
		enemy.anchor.setTo(0.5, 0.5);
		enemy.body.collideWorldBounds = true;
		enemy.body.bounce.setTo(.9, .9)
		enemy.level = level;
		enemy.scale.set(this.game.rnd.integerInRange(.7, 1.5));

	}
	changeVelocity();
	levelText.setText('Level: ' + level)
	//game.time.events.add(5000 - level * 100, spawnAsteroids, this)
}

function moveAsteroids(){
	enemies.forEachAlive(function(rock){
		xVelocity = this.game.rnd.integerInRange(-50, 50);
		yVelocity = this.game.rnd.integerInRange(0, 50);
		rock.body.velocity.x = xVelocity;
		rock.body.velocity.y = yVelocity;
	}, this)

}

function changeVelocity(){
	enemies.forEachAlive(function(rock){
		rock.body.velocity.x = this.game.rnd.integerInRange(-50 - rock.level * 5, 50 + rock.level * 5);
		if(rock.y < 500)
			rock.body.velocity.y = this.game.rnd.integerInRange(-25 + rock.level * 5, 50 + rock.level * 5);
		else
			rock.body.velocity.y = this.game.rnd.integerInRange(-60 + rock.level * 5, 20 + rock.level * 5);	
	}, this)
}

game.state.add('mainState', mainState);

game.state.start('mainState');
