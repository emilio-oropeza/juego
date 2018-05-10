Q.Sprite.extend("Collectable", {
    init: function(p, defaults) {
        var player = Q("Player").first();
        this._super(p, Q._defaults(defaults || {}, {
            x: player.p.x + Q.width + 50,
            type: Q.SPRITE_COLLECTABLE,
            collisionMask: Q.SPRITE_PLAYER,
            sensor: true,
            y: 800,
            vx: 0,
            vy: 0,
            gravity: 0
        }));
        this.add("animation");
  
        this.on("sensor");
    }
  });
  Q.Collectable.extend("Coin", {
    init: function(p){
        this._super(p, {
            sheet: "coin",
            sprite: "coin",
            scale: 0.5
        });
    },
    sensor: function(obj) {
        if (obj.p.sprite === "juan"){            
            obj.p.score += COIN_VAL;
            Q.stageScene('hud', 3, obj.p);
            Q.audio.play('coin.wav');
            this.destroy();
            if(obj.p.score >= 1000){
                if(currentStage === 0){   
                    Q.stageScene("russia");          
                    currentStage = 1;       
                    obj.p.score = 0;
                    Q.stageScene('hud', 3, obj.p);
                } else if(currentStage === 1){          
                    Q.stageScene("futbol");        
                    currentStage = 2;  
                    obj.p.score = 0;
                    Q.stageScene('hud', 3, obj.p);
                }
            }
        } 
    }
  });

  Q.Collectable.extend("Icecream", {
    init: function(p){
      this._super(p, {
          sheet: "icecream",
          sprite: "icecream",
          scale: 0.5
      });
    },
    sensor: function(obj) {
        if (obj.p.sprite === "juan"){
            obj.p.score += ICECREAM_VAL;
            Q.stageScene('hud', 3, obj.p);
            Q.audio.play('coin.wav');
            this.destroy();
            if(obj.p.score >= 1000){
                if(currentStage === 0){   
                    Q.stageScene("russia");          
                    currentStage = 1;       
                    obj.p.score = 0;
                    Q.stageScene('hud', 3, obj.p);
                } else if(currentStage === 1){          
                    Q.stageScene("futbol");        
                    currentStage = 2;  
                    obj.p.score = 0;
                    Q.stageScene('hud', 3, obj.p);
                }
            }
        }
    } 
});