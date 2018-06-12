Q.scene("start", function(stage){
	Q.audio.play('inicio.wav',{ loop: true });
	stage.insert(new Q.Repeater({ 
		asset: "start_background.jpg",
		scale: 1.35,
		speedX: 1.0,
		repeatY: false,
		repeatX: false,
		y:0
	}));
	stage.insert(new Q.UI.Button({
		asset: 'jugar_btn.png',
		x: Q.width/2,
		y: 1300
	}, function() {
		Q.stageScene("snow");
		Q.stageScene('hud', 3, Q('Player').first().p);
		Q.audio.stop('inicio.wav');
	}));
});

Q.scene('hud',function(stage) {
	var asset = "level" + parseInt(stage.options.score/100) + ".jpg";
	if (currentStage == 2) {
		asset = "level10.jpg";
	}
	var container = stage.insert(new Q.UI.Container({
		w: 600,
		h: 400,
		x: 350, 
		y: 0
	}));
	stage.insert(new Q.Repeater({ 
		asset: asset,
		scale: 1.35,
		speedX: 1.0,
		repeatY: false,
		repeatX: false,
		y: 50,
		x: -125
	}), container);
	stage.insert(new Q.UI.Text({
		x: -300, 
		y: 0,
		label: "" + Q.totalScore,
		color: "white", 
		size: 100,
		align: "left" 
	}),	container);
});


Q.scene("gameover", function(stage){
	Q.audio.play('muerte.wav',{ loop: true });
	stage.insert(new Q.Repeater({ 
		asset: "gameover_background.jpg",
		scale: 1.35,
		speedX: 1.0,
		repeatY: false,
		repeatX: false,
		y:0
	}));
	var container = stage.insert(new Q.UI.Container({
		w: 951,
		h: 948,
		x: 600,
		y: 650
	}));
	
	stage.insert(new Q.Repeater({ 
		asset: "marcador.png",
		repeatY: false,
		repeatX: false,
		x:-237,
		y:-237
	}), container);

	stage.insert(new Q.UI.Text({ 
		label: Q.totalScore + "",
		color: "white",
		size: 160,
		y: 40
	}), container);

	stage.insert(new Q.UI.Button({
		asset: 'repeat_btn.png',
		x: -150,
		y: 400
	}, function() {
		Q.audio.stop('muerte.wav');
		Q.stageScene("snow");
		Q.stageScene('hud', 3, Q('Player').first().p);
	}), container);

	stage.insert(new Q.UI.Button({
		asset: 'share_btn.png',
		x: 150,
		y: 400
	}, function() {
		console.log("compartir");
	}), container);
});

Q.scene("snow",function(stage) {
	Q.audio.play('nieve.wav',{ loop: true });
	stage.insert(new Q.Repeater({ 
		asset:"snow_background.png",
		speedX: 1.0,
		repeatY: false,
		y:-163
	}));

	stage.insert(new Q.Repeater({
		asset: "snow_piso1.png",
		repeatY: false,
		speedX: 1.0,
		y: 440 
	}));

	stage.insert(new Q.Launcher());
	stage.insert(new Q.CollectableLauncher());
	stage.insert(new Q.FloorLauncher());
	stage.insert(new Q.Player());
	stage.insert(new Q.PlatformPisoSnow({x: 1000}));
	
	stage.add("viewport");

});

	Q.scene("russia",function(stage) {
		
		
		stage.insert(new Q.Repeater({ asset: "rusia_background.png",
			speedX: 0.5,
			repeatY: false,
			y:-163
		}));
	
		stage.insert(new Q.Repeater({ asset: "rusia_piso1.png",
			repeatY: false,
			speedX: 1.0,
			y: 440 
		}));
	
		stage.insert(new Q.Launcher());
		stage.insert(new Q.CollectableLauncher());
		stage.insert(new Q.FloorLauncher());
		stage.insert(new Q.Player());
		stage.insert(new Q.PlatformPisoRussia());
		
		stage.add("viewport");
	
	});

	Q.scene("futbol",function(stage) {
		
		stage.insert(new Q.Repeater({ asset: "futbol_background.png",
			speedX: 0.5,
			repeatY: false,
			y:-163
		}));

		stage.insert(new Q.Repeater({ asset: "futbol_piso1.png",
			repeatY: false,
			speedX: 1.0,
			y: 440 
		}));
	
		stage.insert(new Q.Launcher());
		stage.insert(new Q.CollectableLauncher());
		stage.insert(new Q.FloorLauncher());
		stage.insert(new Q.Player());
		stage.insert(new Q.PlatformPisoFutbol());
		
		stage.add("viewport");
	
	});
	
	
