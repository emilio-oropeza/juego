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
            bulletSpeed: 500,
            launchDelay: 1,
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
                currentEnemies--;
            }
            return;
        }
    
        this.play('move');

        if(player.p.x - this.p.x > 770) {
            this.destroy();
            currentEnemies--;
        }
        
        if (undefined !== this.p.shootLabel){
            var scale = (undefined !== this.p.shootScale) ? this.p.shootScale : 0.8
            this.p.launch -= dt;
            if(this.p.launch < 0) {
                this.stage.insert(
                    new Q.Bullet({
                        y: this.p.y,
                        x: this.p.x - 100,
                        xmove: this.p.shootXmove,
                        ymove: this.p.shootYmove,
                        scale: scale,
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
            currentEnemies--;
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
            currentEnemies--;
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

Q.Enemy.extend("Balls", {
    init: function(p, defaults){
        this._super(p, Q._defaults(defaults || {}, {
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_PLATFORM,
            scale: 0.7,
            y: -300
            //y: 550
        }));
    },
    step: function(dt) {
        var player = Q("Player").first();
        if(this.p.dead) {
            this.del('2d');
            this.p.deadTimer++;
            if (this.p.deadTimer > 24) {
                // Dead for 24 frames, remove it.
                this.destroy();
                currentEnemies--;
            }
            return;
        }

        this.play('move');

        if(this.p.y > 1000) {
            this.destroy();
            currentEnemies--;
        }
        
        this.p.x -= 10;
        this.p.y += 12;
    }
});

Q.Enemy.extend("Runners", {
    init: function(p, defaults){
        this._super(p, Q._defaults(defaults || {}, {
            shootLabel: undefined,
            shootYmove: undefined,
            collisionMask: Q.SPRITE_DEFAULT,
            scale: 0.7,
            y: 750
        }));
    },
    step: function(dt) {
        var player = Q("Player").first();
        if(this.p.dead) {
            this.del('2d');
            this.p.deadTimer++;
            if (this.p.deadTimer > 24) {
                // Dead for 24 frames, remove it.
                this.destroy();
                currentEnemies--;
            }
            return;
        }

        this.play('move');

        if(this.p.shootXmove >= 0){
            if(player.p.x - this.p.x < -1500) {
                this.destroy();
                currentEnemies--;
            }
        }else{
            if(player.p.x - this.p.x > 770) {
                this.destroy();
                currentEnemies--;
            }
        }

        
        
        this.p.x += this.p.shootXmove;
    }
});