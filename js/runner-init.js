var Q = window.Q = Quintus({ audioSupported: [ 'wav', 'ogg' ] })
	.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
	.setup({
		width:   2330,
		height:  1458,
		scaleToFit: true 
	}).touch().enableSound();

Q.input.joypadControls();
Q.input.keyboardControls({
	32: "up"
});

Q.SPRITE_ENEMY = 4;
Q.SPRITE_PLAYER = 1;
Q.SPRITE_PLATFORM = 2;
Q.SPRITE_COLLECTABLE = 3;

var currentEnemies = 0;
var currentPlatforms = 0;
var currentBullets = 0;
var COIN_VAL = 50;
var ICECREAM_VAL = 75;
var ENEMY_VAL = 100;
var currentStage= 0;

Q.gravityY = 2000;
Q.totalScore = 0;