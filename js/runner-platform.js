Q.Sprite.extend("Platform", {
    init: function(p, defaults) {
        var player = Q("Player").first();
        this._super(p, Q._defaults(defaults || {}, {
            x: player.p.x + Q.width + 50,
            type: Q.SPRITE_PLATFORM,
            collisionMask: Q.SPRITE_DEFAULT,            
            gravity: 0,
            vy: 0,
            ay: 0,
            y: 530
        }));

        this.p.points = this.p.standingPoints;
        
        this.add("2d");
        this.on("bump.top",this,"onTop");
    },

    step: function(dt){
        var player = Q("Player").first();
        if(undefined !== this && player.p.x - this.p.x > 770) {
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
Q.Platform.extend("PlatformFutbol", {
    init: function(p) {
        this._super(p,{
            sheet: "platFutbol",
            sprite: "platFutbol",
            points: [ [ -205, -61], [ 205, -61 ], [205, 61], [-205, 61]],
        });
    }
});

Q.Platform.extend("PlatformRussia", {
    init: function(p) {
        this._super(p,{
            sheet: "platRussia",
            sprite: "platRussia",
            points: [ [ -205, -61], [ 205, -61 ], [205, 61], [-205, 61]]
        });
    }
});

Q.Platform.extend("PlatformSnow", {
    init: function(p) {
        this._super(p,{
            sheet: "platSnow",
            sprite: "platSnow",
            points: [ [ -219, -61], [ 219, -61 ], [219, 61], [-219, 61]],
        });
    }
});

Q.Platform.extend("PlatformPisoSnow", {
    init: function(p) {
        var player = Q("Player").first();
        this._super(p,{
            asset: "rusia_piso.png",
            x: player.p.x + Q.width + 500,
            y: 1000,
            points: [ [ -1665, -125], [ 1665, -125 ], [1665, 125], [-1665, 125]]
        });
    },
    step: function(dt){
        var player = Q("Player").first();
        if(undefined !== this && player.p.x - this.p.x > 2000) {
            this.destroy();
        }
    }
});

Q.Platform.extend("PlatformPisoRussia", {
    init: function(p) {
        var player = Q("Player").first();
        this._super(p,{
            asset: "rusia_piso.png",
            x: player.p.x + Q.width + 500,
            y: 1000,
            points: [ [ -1665, -125], [ 1665, -125 ], [1665, 125], [-1665, 125]]
        });
    },
    step: function(dt){
        var player = Q("Player").first();
        if(undefined !== this && player.p.x - this.p.x > 2000) {
            this.destroy();
        }
    }
});

Q.Platform.extend("PlatformPisoFutbol", {
    init: function(p) {
        var player = Q("Player").first();
        this._super(p,{
            asset: "rusia_piso.png",
            x: player.p.x + Q.width + 500,
            y: 1000,
            points: [ [ -1665, -125], [ 1665, -125 ], [1665, 125], [-1665, 125]]
        });
    },
    step: function(dt){
        var player = Q("Player").first();
        if(undefined !== this && player.p.x - this.p.x > 2000) {
            this.destroy();
        }
    }
});