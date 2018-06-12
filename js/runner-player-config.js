Q.Sprite.extend("Player",{
    
    init: function(p) {
        this._super(p,{
            sheet: "juan",
            sprite: "juan",
            collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_ENEMY | Q.SPRITE_PLATFORM | Q.SPRITE_COLLECTABLE, 
            type: Q.SPRITE_PLAYER,
            x: 40,
            y: 0,
            standingPoints: [ [ -60, 102.5], [ -60, -102.5 ], [60,-102.5], [60,102.5]],
            speed: 900,
            jump: -1300,
            strength: 100,
            score: 0,
            lives: 3,
            onPlatform: false,
            scale: 1.3
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
    
        if(this.p.y > 1500){
            this.resetLevel();
        }

        if(!this.p.onPlatform) {
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
        this.p.strength -= 100;
        Q.stageScene('hud', 3, this.p);
        if (this.p.strength == 0) {
            this.resetLevel();
        }
    },

    resetLevel: function() {
        currentStage = 0;
        var player = Q('Player').first().p;
        Q.stageScene(null, 3); 
        Q.stageScene("gameover", 0, player);  
        Q.totalScore = 0;
        Q.audio.stop("nieve.wav");
    }
});