//variable that holds the game state. resolution, renderer type and div id
var game = new Phaser.Game(1024,768, Phaser.CANVAS, 'gameDiv');
var starfield;
var speedShip;
var control;

var bullets;
var laserSpeed = 0;
var spaceBar;

var enemies;
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
		createEnemies();

		spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update:function(){
		//updates every frame of the game.
		starfield.tilePosition.y += 2;
		//
		speedShip.body.velocity.x = 0;
		if(control.left.isDown){
			//negative to move to the left
			speedShip.body.velocity.x = -200;

		}
		if(control.right.isDown){
			//positive to move to the right
			speedShip.body.velocity.x = 200;
		}
		if(spaceBar.isDown){
			shot();
		}
	}
}

function shot(){
	if(game.time.now > laserSpeed){
		bullet = bullets.getFirstExists(false);
		if(bullet){
			bullet.reset(speedShip.x+32, speedShip.y);
			bullet.body.velocity.y = -400;
			laserSpeed = game.time.now +200;
		}
	}
}

function createEnemies(){
	
	for( var y = 0; y<4; y+=1){
		for(var x = 0; x < 18; x++){
			var randomEnemy = Math.floor(Math.random() * 3) + 1 ;
			var enemy = enemies.create(x*48, y*50, 'asteroid'+randomEnemy);
			enemy.anchor.setTo(0.5, 0.5);
		}
	}

	enemies.x = 100;
	enemies.y = 50;
	var tween = game.add.tween(enemies).to({x:200}, Phaser.Easing.Linear.None, true,0,1000,true);
	tween.onLoop.add(descend, this);
}

function descend(){
	enemies.y += 10;
}

game.state.add('mainState', mainState);

game.state.start('mainState');
