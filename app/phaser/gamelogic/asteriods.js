//variable that holds the game state. resolution, renderer type and div id
var game = new Phaser.Game(1024,768, Phaser.CANVAS, 'gameDiv');
var starfield;
var speedShip;
var control;

var pewPew;
var laserSpeed;
var spaceBar;
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
		game.load.image('pewPew','phaser/assets/particle_small.png');
	},
	create:function(){
		//arguments are 
		starfield = game.add.tileSprite(0,0,1024,768,'starfield');
		//add the player or starship to the center of the screen
		speedShip = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'speedShip');
		game.physics.enable(speedShip, Phaser.Physics.ARCADE);
		control = game.input.keyboard.createCursorKeys();

		//group for laser's firing from the space ship
		pewPew = game.add.group();
		pewPew.enableBody = true;
		pewPew.physicsBodyType = Phaser.Physics.ARCADE
		pewPew.createMultiple(30, 'pewPew');
		pewPew.setAll('anchor.x', 0.5);
		pewPew.setAll('anchor.y', 1);
		pewPew.setAll('outOfBoundsKill', true);
		pewPew.setAll('checkWorldBounds', true);

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

		}else if(control.right.isDown){
			//positive to move to the right
			speedShip.body.velocity.x = 200;
		}else if(spaceBar.isDown){
			shoot();
		}
	}
}

function shot(){
	if(game.time.now > bulletTime){
		bullet = pewPew.getFirstExists(false);
	}
}

game.state.add('mainState', mainState);

game.state.start('mainState');