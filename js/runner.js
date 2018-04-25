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
    
    Q.gravityY = 2000;
    
    Q.Sprite.extend("Player",{
    
        init: function(p) {
            this._super(p,{
                sheet: "player",
                sprite: "player",
                collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_ENEMY | Q.SPRITE_PLATFORM, 
                type: Q.SPRITE_PLAYER,
                x: 40,
                y: 555,
                standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
                speed: 900,
                jump: -1100,
                scale: 0.5,
                strength: 100,
                score: 0,
                lives: 3,
                conos: 0,
                monedas: 0,
                vasos: 0,
                onPlatform: false
            });
        
            this.p.points = this.p.standingPoints;
        
            this.add("2d, animation, tween");

            this.on("enemy.hit","enemyHit");
        },

        step: function(dt) {
            if (this.p.immune) { 
                if ((this.p.immuneTimer % 12) == 0) {
                    var opacity = (this.p.immuneOpacity == 1 ? 0 : 1);
                    this.animate({"opacity":opacity}, 0);
                    this.p.immuneOpacity = opacity;
                }
                this.p.immuneTimer++;
                if (this.p.immuneTimer > 144) {
                    this.p.immune = false;
                    this.animate({"opacity": 1}, 1);
                }
            }


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
            this.p.strength -= 10;
            Q.stageScene('hud', 3, this.p);
            if (this.p.strength == 0) {
                this.resetLevel();
            }
        },

        resetLevel: function() {
            Q.stageScene("level1");
            this.p.strength = 100;
            this.animate({opacity: 1});
            Q.stageScene('hud', 3, this.p);
        }
    });

    Q.Sprite.extend("Platform", {
        init: function(p, defaults) {
            var player = Q("Player").first();
            this._super(p, Q._defaults(defaults || {}, {
                x: player.p.x + Q.width + 50,
                type: Q.SPRITE_PLATFORM,
                collisionMask: Q.SPRITE_DEFAULT,
                standingPoints: [ [ -465, -135], [ 465, -135 ], [465, 135], [-465, 135]],
                gravity: 0,
                vy: 0,
                ay: 0
            }));

            this.p.points = this.p.standingPoints;
            
            this.add("2d");
            this.on("bump.top",this,"onTop");
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
                player.p.landed = 1;
                player.p.onPlatform = true;
            }
        }

    });

    Q.Sprite.extend("Enemy", {
        init: function(p, defaults) {
            var player = Q("Player").first();
            this._super(p, Q._defaults(defaults || {}, {
                x: player.p.x + Q.width + 50,
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_DEFAULT,
                gravity: 0,
                vy: 0,
                ay: 0,
                scale: 0.5,
                bulletSpeed: 500,
                launchDelay: 0,
                launchRandom: 2,
                launch: 1,
                shootLabel: ""
            }));

            this.p.points = this.p.standingPoints;
            
            this.add("2d, aiBounce, animation");
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
            
            if (undefined !== this.p.shootLabel){
                this.p.launch -= dt;
                if(this.p.launch < 0) {
                    this.stage.insert(
                        new Q.Bullet({
                            y: this.p.y,
                            x: this.p.x - 100,
                            xmove: this.p.shootXmove,
                            ymove: this.p.shootYmove,
                            scale: 0.8,
                            sheet: this.p.shootLabel,
                            sprite: this.p.shootLabel
                        })
                    );
                    this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
                }
            }
        },

        hit: function(col) {
            if(col.obj.isA("Player") && !col.obj.p.immune && !this.p.dead) {
                col.obj.trigger('enemy.hit', {"enemy":this,"col":col});
                this.destroy();
                current --;
            }
        },
        die: function(col) {
            if(col.obj.isA("Player")) {
                var player = Q("Player").first();
                this.p.vx=this.p.vy=0;
                this.play('dead');
                this.p.dead = true;
                var that = this;
                col.obj.p.vy = -300;
                this.p.deadTimer = 0;
                this.destroy();
                current --;
                player.p.score += 10;
                Q.stageScene('hud', 3, player.p);
            }
        }
    });

    Q.Sprite.extend("Bullet", {
        init: function(p, defaults) {
            var player = Q("Player").first();
            this._super(p, Q._defaults(defaults || {}, {
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_DEFAULT,
                gravity: 0,
                vy: 0,
                ay: 0
            }));

            this.p.points = this.p.standingPoints;
            
            this.add("2d, aiBounce, animation");
            this.on("bump.top",this,"die");
            this.on("hit.sprite",this,"hit");
        },
        step: function(){
            this.p.x += this.p.xmove;
            this.p.y += this.p.ymove;
            var player = Q("Player").first();
            if( this.p.y > 800 || player.p.x - this.p.x > 770){
                this.destroy();
            }
        },
        hit: function(col) {
            if(col.obj.isA("Player") && !col.obj.p.immune && !this.p.dead) {
                col.obj.trigger('enemy.hit', {"enemy":this,"col":col});
                this.destroy();
            }
        }
    });

    Q.Enemy.extend("EnemyRusia", {
        enemies: ["robot1", "robot2", "espia"],
        shootLabel: [undefined, "blast", "bomb"],
        shootXmove: [undefined, -15, -15],
        shootYmove: [undefined, 0, 15],
        init: function(p, e) {
            this._super(p,{
                sheet: this.enemies[e],
                sprite: this.enemies[e],
                shootLabel: this.shootLabel[e],
                shootXmove: this.shootXmove[e],
                shootYmove: this.shootYmove[e]
            });
        }
    });

    Q.Platform.extend("Plataforma", {
        init: function(p) {
            this._super(p,{
                sheet: "plataforma",
                sprite: "plataforma"
            });
        }
    });

    Q.GameObject.extend("EnemyThrower",{
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
                    this.stage.insert(new Q.Robot2());
                    this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
                    current++;
                }
            }
        }
      
      });

      Q.GameObject.extend("PlatformLauncher",{
        enemiesY: [270, 440, 750],
        platformY: [430, 600],
        init: function() {
          this.p = {
            launchDelay: 0.7,
            launchRandom: 2,
            launch: 2,
            limit: 2
          }
        },      
        update: function(dt) {
          this.p.launch -= dt;
            if(this.p.launch < 0) {
                var randomPlatform = Math.floor(Math.random() * 3 );
                var randomEnemy = Math.floor(Math.random() * 5 );

                if(randomPlatform < 2){
                    this.stage.insert(new Q.Plataforma({y:this.platformY[randomPlatform] }  )); 
                }

                if (this.p.limit > current && randomEnemy < 3){
                    this.stage.insert(new Q.EnemyRusia({
                        y:this.enemiesY[randomPlatform]
                    }, randomEnemy));
                    current++;
                }
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
      
    
      stage.insert(new Q.Player());
      stage.add("viewport");
    
    });
    
    Q.scene('hud',function(stage) {
        var container = stage.insert(new Q.UI.Container({
          x: 50, y: 0
        }));

        stage.insert(new Q.Repeater({ 
            asset: "vidas.png",
            repeatY: false,
            repeatX: false,
            speedX: 1.0,
            y: 40,
            x: 40
        }));

        container.insert(new Q.UI.Text({x:210, y: 75,
            label: ""+stage.options.lives, color: "white", size: 100 }));

        container.insert(new Q.UI.Text({x:160, y: 180,
            label: "Vida: " + stage.options.strength + '%', color: "white", size: 50  }));

        stage.insert(new Q.Repeater({ 
            asset: "cono.png",
            repeatY: false,
            repeatX: false,
            speedX: 1.0,
            y: 40,
            x: 400
        }));

        container.insert(new Q.UI.Text({x:830, y: 90,
            label: ""+stage.options.conos, color: "white", size: 100, align: "left" }));

        stage.insert(new Q.Repeater({ 
            asset: "moneda.png",
            repeatY: false,
            repeatX: false,
            speedX: 1.0,
            y: 25,
            x: 420,
            scale: 1.5
        }));

        container.insert(new Q.UI.Text({x:1150, y: 90,
            label: ""+stage.options.monedas, color: "white", size: 100, align: "left" }));

        stage.insert(new Q.Repeater({ 
            asset: "vaso.png",
            repeatY: false,
            repeatX: false,
            speedX: 1.0,
            y: 25,
            x: 690
        }));

        container.insert(new Q.UI.Text({x:1430, y: 90,
            label: ""+stage.options.vasos, color: "white", size: 100, align: "left" }));

        
      
        container.insert(new Q.UI.Text({x:2200, y: 80,
          label: "Score: " + stage.options.score, color: "white", size: 100, align: "right" }));
                
        
      
        container.fit(20);
      });
      
    Q.load("player.json, juanito.png, background2.png, piso2.png, robot1.png,"+
     " robot2.png, espia.png, robot1.json, robot2.json, espia.json, plataforma.png,"+
     " plataforma.json, bomba.png, bomba.json, blast.png, blast.json, vidas.png," +
     " cono.png, moneda.png, vaso.png" , function() {
        Q.compileSheets("juanito.png","player.json");
        Q.compileSheets("robot1.png","robot1.json");
        Q.compileSheets("robot2.png","robot2.json");
        Q.compileSheets("espia.png","espia.json");
        Q.compileSheets("plataforma.png","plataforma.json");
        Q.compileSheets("bomba.png","bomba.json");
        Q.compileSheets("blast.png","blast.json");
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
    