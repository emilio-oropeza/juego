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
    
    Q.gravityY = 1000;
    
    Q.Sprite.extend("Player",{
    
        init: function(p) {
            this._super(p,{
                sheet: "player",
                sprite: "player",
                collisionMask: Q.SPRITE_ENEMY, 
                type: Q.SPRITE_PLAYER,
                x: 40,
                y: 555,
                standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
                duckingPoints : [ [ -16, 44], [ -23, 35 ], [-23,-10], [23,-10], [23, 35 ], [ 16, 44 ]],
                speed: 500,
                jump: -700
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
        
            if(this.p.y > 900) {
                this.p.y = 900;
                this.p.landed = 1;
                this.p.vy = 0;
            } else {
                this.p.landed = 0;
            }
        
            if(Q.inputs['up'] && this.p.landed > 0) {
                this.p.vy = this.p.jump;
            } 
        
            this.p.points = this.p.standingPoints;
            if(this.p.landed) {
                if(Q.inputs['down']) { 
                    this.play("duck_right");
                    this.p.points = this.p.duckingPoints;
                } else {
                    this.play("walk_right");
                }
            } else {
                this.play("jump_right");
            }
        
            this.stage.viewport.centerOn(this.p.x + 300, 400 );
        
        }
    });

    Q.Sprite.extend("Nieve", {
        init: function(p) {
            var player = Q("Player").first();
            this._super(p, {
                x: player.p.x + Q.width + 50,
                y: 900,
                sheet: "nieve",
                sprite: "nieve",
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_PLAYER,
                gravity: 0,
                //vx: -600 + 200 * Math.random(),
                vy: 0,
                ay: 0,
                scale: 0.5
            });

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
                }
                return;
            }
        
            this.play('move');

            if(player.p.x - this.p.x > 800) {
                this.destroy();
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
            }
        }
    });

    Q.GameObject.extend("NieveThrower",{
        init: function() {
          this.p = {
            launchDelay: 10,
            launchRandom: 2,
            launch: 1
          }
        },
      
        update: function(dt) {
          this.p.launch -= dt;
      
          if(this.p.launch < 0) {
            this.stage.insert(new Q.Nieve());
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
    
      //stage.insert(new Q.BoxThrower());
      stage.insert(new Q.NieveThrower());
      
    
      stage.insert(new Q.Player());
      stage.add("viewport");
    
    });
      
    Q.load("player.json, juanito-sprite.png, background2.png, piso2.png, enemigo_nieve.png, nieve.json", function() {
        Q.compileSheets("juanito-sprite.png","player.json");
        Q.compileSheets("enemigo_nieve.png","nieve.json");
        Q.animations("player", {
          walk_right: { frames: [0,1,2,3,4,5,6,7], rate: 1/10, flip: false, loop: true },
          jump_right: { frames: [7], rate: 1/10, flip: false },
          stand_right: { frames:[7], rate: 1/10, flip: false },
          duck_right: { frames: [7], rate: 1/10, flip: false },
        });
        Q.animations("nieve", {
            move: { frames: [0,1,2,3], rate: 1/10, flip: false, loop:true},
            dead: { frames: [2], rate: 1/10 }
        });
        Q.stageScene("level1");
      
    });
    
    
    });
    