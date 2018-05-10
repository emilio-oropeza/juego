Q.scene("snow",function(stage) {
    
    stage.insert(new Q.Repeater({ asset: "snow_background.png",
                                  speedX: 1.0,
                                  repeatY: false,
                                  y:-163}));
  
    stage.insert(new Q.Repeater({ asset: "snow_piso.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 440 }));
  
    stage.insert(new Q.Launcher());
    stage.insert(new Q.CollectableLauncher());
    stage.insert(new Q.FloorLauncher());
    stage.insert(new Q.Player());
    stage.insert(new Q.PlatformPisoSnow());
    
    stage.add("viewport");
  
  });

  Q.scene("russia",function(stage) {
    
    
    stage.insert(new Q.Repeater({ asset: "rusia_background.png",
                                  speedX: 0.5,
                                  repeatY: false,
                                  y:-163}));
  
    /*stage.insert(new Q.Repeater({ asset: "rusia_piso.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 440 }));*/
  
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
                                  y:-163}));
  
    stage.insert(new Q.Repeater({ asset: "futbol_piso.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 440 }));
  
    stage.insert(new Q.Launcher());
    stage.insert(new Q.CollectableLauncher());
    stage.insert(new Q.FloorLauncher());
    stage.insert(new Q.Player());
    stage.insert(new Q.PlatformPisoFutbol());
    
    stage.add("viewport");
  
  });
  
  Q.scene('hud',function(stage) {
      var container = stage.insert(new Q.UI.Container({
        x: 50, y: 0
      }));  
      
    
      container.insert(new Q.UI.Text({x:2200, y: 80,
        label: "Score: " + stage.options.score, color: "white", size: 100, align: "right" }));
              
      
    
      container.fit(20);
    });

Q.scene('endGame',function(stage) {
    //stage.insert(new Q.Repeater({ asset: "gameOVER.jpg"}));
    
    var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));
    
    var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                    label: "Jugar otra vez?" }))         
    var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                        label: stage.options.label }));
    // When the button is clicked, clear all the stages
    // and restart the game.
    button.on("click",function() {
        console.log("click");
        Q.clearStages();
        Q.stageScene('snow');
    });
    container.fit(100);
});

