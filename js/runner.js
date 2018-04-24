window.addEventListener("load",function() {

    var Q = window.Q = Quintus({ development: true })
            .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
            .setup({
                width:   2330, // Set the default width to 800 pixels
                height:  1458, // Set the default height to 600 pixels
                scaleToFit: true // Scale the game to fit the screen of the player's device
              })
            .controls([
                [],
                [],
                [],
                [],
                []
            ]).touch()
    
    Q.SPRITE_ENEMY = 4;
    Q.SPRITE_PLAYER = 1;
    Q.SPRITE_PLATFORM = 2;

    var current = 0;
    
    Q.gravityY = 1500;
    
    Q.Sprite.extend("Player",{
    
        init: function(p) {
            this._super(p,{
                sheet: "player",
                sprite: "player",
                collisionMask: Q.SPRITE_ENEMY || Q.SPRITE_PLATFORM, 
                type: Q.SPRITE_PLAYER,
                x: 40,
                y: 555,
                standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
                duckingPoints : [ [ -16, 44], [ -23, 35 ], [-23,-10], [23,-10], [23, 35 ], [ 16, 44 ]],
                speed: 1000,
                jump: -900,
                scale: 0.5,
                strength: 100,
                inmune: false,
                onPlatform: false
            });
        
            this.p.points = this.p.standingPoints;
        
            this.add("2d, animation");

            this.on("enemy.hit","enemyHit");
        },

        enemyHit: function(data) {
            var col = data.col;
            var enemy = data.enemy;
            this.p.vy = -150;
            if (col.normalX == 1) {
                // Hit from left.
                this.p.x -=15;
                this.p.y -=15;
            }else {
                // Hit from right;
                this.p.x +=15;
                this.p.y -=15;
            }
            this.p.immune = true;
            this.p.immuneTimer = 0;
            this.p.immuneOpacity = 1;
            this.p.strength -= 25;
            if (this.p.strength == 0) {
                this.resetLevel();
            }
        },
    
    
        step: function(dt) {
            this.p.vx += (this.p.speed - this.p.vx)/4;
        
            if(this.p.y > 770) {
                this.p.y = 770;
                this.p.landed = 1;
                this.p.vy = 0;
            } else if(!this.p.onPlatform) {
                this.p.landed = 0;
            }
        
            if(Q.inputs['up'] && this.p.landed > 0) {
                this.p.vy = this.p.jump;
                this.p.onPlatform = false;
            } 
        
            this.p.points = this.p.standingPoints;
            if(this.p.landed) {
                this.play("walk_right");
            } else {
                this.play("jump_right");
            }
        
            this.stage.viewport.centerOn(this.p.x + 300, 400 );
        
        }
    });

    Q.Sprite.extend("Platform", {
        init: function(p, defaults) {
            var player = Q("Player").first();
            this._super(p, Q._defaults(defaults || {}, {
                x: player.p.x + Q.width + 50,
                y: 700,
                type: Q.SPRITE_PLATFORM,
                //collisionMask: Q.SPRITE_PLAYER,
                gravity: 0,
                vy: 0,
                ay: 0
            }));

            this.p.points = this.p.standingPoints;
            
            this.add("2d");
            this.on("bump.top",this,"onTop");
            //this.on("hit.sprite",this,"hit");
        },

        step: function(dt){
            var player = Q("Player").first();
            if(player.p.x - this.p.x > 770) {
                this.destroy();
            }
        },

        onTop: function(col){
            
            var player = Q("Player").first();
            if(col.obj.isA("Player")) {
                player.p.y = this.p.y - 50;
                this.p.y = player.p.y + 50;
                player.p.landed = 1;
                player.p.onPlatform = true;
                player.p.vy = this.p.vy;
                console.log(player);
            }
        }

    });

    Q.Sprite.extend("Enemy", {
        init: function(p, defaults) {
            var player = Q("Player").first();
            this._super(p, Q._defaults(defaults || {}, {
                x: player.p.x + Q.width + 50,
                y: 750,
                //sheet: "robot2",
                //sprite: "robot2",
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_PLAYER,
                gravity: 0,
                vy: 0,
                ay: 0,
                scale: 0.5
            }));

            this.p.points = this.p.standingPoints;
            
            this.add("2d, animation");
            this.on("bump.top",this,"die");
            this.on("hit.sprite",this,"hit");
        },

        step: function(dt) {
            var player = Q("Player").first();
            if(this.p.dead) {
                this.del('2d');
                this.p.deadTimer++;
                if (this.p.deadTimer > 24) {
                    // Dead for 24 frames, remove it.
                    this.destroy();
                    current --;
                }
                return;
            }
        
            this.play('move');

            if(player.p.x - this.p.x > 770) {
                this.destroy();
                current --;
            }
        },

        hit: function(col) {
            if(col.obj.isA("Player") && !col.obj.p.immune && !this.p.dead) {
                col.obj.trigger('enemy.hit', {"enemy":this,"col":col});
            }
        },
        die: function(col) {
            if(col.obj.isA("Player")) {
                this.p.vx=this.p.vy=0;
                this.play('dead');
                this.p.dead = true;
                var that = this;
                col.obj.p.vy = -300;
                this.p.deadTimer = 0;
                this.destroy();
                current --;
            }
        }
    });

    Q.Enemy.extend("Robot1", {
        init: function(p) {
            this._super(p,{
                sheet: "robot1",
                sprite: "robot1",
            });
        }
    });

    Q.Enemy.extend("Robot2", {
        init: function(p) {
            this._super(p,{
                sheet: "robot2",
                sprite: "robot2",
            });
        }
    });

    Q.Enemy.extend("Espia", {
        init: function(p) {
            this._super(p,{
                sheet: "espia",
                sprite: "espia",
            });
        }
    });

    Q.Platform.extend("Plataforma", {
        init: function(p) {
            this._super(p,{
                sheet: "plataforma",
                sprite: "plataforma",
            });
        }
    });

    Q.GameObject.extend("NieveThrower",{
        init: function() {
          this.p = {
            launchDelay: 3,
            launchRandom: 2,
            launch: 1,
            limit: 2
          }
        },
      
        update: function(dt) {
          this.p.launch -= dt;
            if (this.p.limit > current){
                if(this.p.launch < 0) {
                    //this.stage.insert(new Q.Espia());
                    //this.stage.insert(new Q.Robot1());
                    this.stage.insert(new Q.Robot2());
                    this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
                    current++;
                }
            }
        }
      
      });

      Q.GameObject.extend("PlatformLauncher",{
        init: function() {
          this.p = {
            launchDelay: 3,
            launchRandom: 2,
            launch: 1
          }
        },
      
        update: function(dt) {
          this.p.launch -= dt;

            if(this.p.launch < 0) {
                this.stage.insert(new Q.Plataforma());
                this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();

            }
        }
      
      });
    
    
    Q.scene("level1",function(stage) {
    
      stage.insert(new Q.Repeater({ asset: "background2.png",
                                    speedX: 0.5,
                                    repeatY: false,
                                    y:-163}));
    
      stage.insert(new Q.Repeater({ asset: "piso2.png",
                                    repeatY: false,
                                    speedX: 1.0,
                                    y: 440 }));
    
      stage.insert(new Q.PlatformLauncher());
      stage.insert(new Q.NieveThrower());
      
    
      stage.insert(new Q.Player());
      stage.add("viewport");
    
    });
    
    Q.scene('hud',function(stage) {
        var container = stage.insert(new Q.UI.Container({
          x: 50, y: 0
        }));
      
        var label = container.insert(new Q.UI.Text({x:200, y: 20,
          label: "Score: " + stage.options.score, color: "white" }));
          
        /*stage.insert(new Q.Repeater({ 
            asset: "piso2.png",
            repeatY: false,
            speedX: 1.0,
            y: 440 
        }));*/
      
        var strength = container.insert(new Q.UI.Text({x:500, y: 20,
          label: "Health: " + stage.options.strength + '%', color: "white" }));
      
        container.fit(20);
      });
      
    Q.load("player.json, juanito.png, background2.png, piso2.png, robot1.png, robot2.png, espia.png, robot1.json, robot2.json, espia.json, plataforma.png, plataforma.json", function() {
        Q.compileSheets("juanito.png","player.json");
        Q.compileSheets("robot1.png","robot1.json");
        Q.compileSheets("robot2.png","robot2.json");
        Q.compileSheets("espia.png","espia.json");
        Q.compileSheets("plataforma.png","plataforma.json");
        Q.animations("player", {
          walk_right: { frames: [0,1,2,3,4,5,6,7], rate: 1/10, flip: false, loop: true },
          jump_right: { frames: [7], rate: 1/10, flip: false },
          stand_right: { frames:[7], rate: 1/10, flip: false },
          duck_right: { frames: [7], rate: 1/10, flip: false },
        });
        Q.animations("robot1", {
            move: { frames: [0,1,2,3,4,5,6], rate: 1/10, flip: false, loop:true},
            dead: { frames: [0], rate: 1/10 }
        });
        Q.animations("robot2", {
            move: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], rate: 1/10, flip: false, loop:true},
            dead: { frames: [0], rate: 1/10 }
        });
        Q.animations("espia", {
            move: { frames: [0,1,2,3,4,5,6,7,8,9,10,11], rate: 1/10, flip: false, loop:true},
            dead: { frames: [0], rate: 1/10 }
        });
        Q.animations("plataforma", {
            move: { frames: [0], rate: 1/10, flip: false, loop:true}
        });
        Q.stageScene("level1");
        Q.stageScene('hud', 3, Q('Player').first().p);
      
    });
    
    
});
    