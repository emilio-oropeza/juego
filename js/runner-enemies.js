Q.Enemy.extend("Arbitro1", {
    init: function(p){
        this._super(p, {
            sheet: "arbitro1",
            sprite: "arbitro1",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 1.5
        })
    }
});

Q.Enemy.extend("Arbitro2", {
    init: function(p){
        this._super(p, {
            sheet: "arbitro2",
            sprite: "arbitro2",
            shootLabel: "tarjeta",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1.5
        })
    }
});

Q.Enemy.extend("Ganma", {
    init: function(p){
        this._super(p, {
            sheet: "ganma",
            sprite: "ganma",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 1.5
        })
    }
});

Q.Runners.extend("Condor", {
    init: function(p){
        this._super(p, {
            sheet: "condor",
            sprite: "condor",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 1.5
        })
    }
});


Q.Runners.extend("Robben", {
    init: function(p){
        this._super(p, {
            sheet: "robben",
            sprite: "robben",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 1.3
        })
    }
});


Q.Enemy.extend("Nieve1", {
    init: function(p){
        this._super(p, {
            sheet: "nieve1",
            sprite: "nieve1",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 1.3
        })
    }
});


Q.Enemy.extend("Nieve2", {
    init: function(p){
        this._super(p, {
            sheet: "nieve2",
            sprite: "nieve2",
            shootLabel: "nieve",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1.3
        })
    }
});


Q.Enemy.extend("Messi", {
    init: function(p){
        this._super(p, {
            sheet: "messi",
            sprite: "messi",
            shootLabel: "guacara",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1.5
        })
    }
});


Q.Enemy.extend("Chaka", {
    init: function(p){
        this._super(p, {
            sheet: "chaka",
            sprite: "chaka",
            shootLabel: "vaso",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1,
            shootScale:0.4
        })
    }
});


Q.Runners.extend("Zlatan", {
    init: function(p){
        this._super(p, {
            sheet: "zlatan",
            sprite: "zlatan",
            scale: 1.5,
            shootXmove: -20,
            scale: 1.1
        })
    }
});


Q.Enemy.extend("Robot1", {
    init: function(p){
        this._super(p, {
            sheet: "robot1",
            sprite: "robot1",
            shootLabel: undefined,
            shootXmove: undefined,
            shootYmove: undefined,
            scale: 0.8
        })
    }
});


Q.Enemy.extend("Robot2", {
    init: function(p){
        this._super(p, {
            sheet: "robot2",
            sprite: "robot2",
            shootLabel: "blast",
            shootXmove: -15,
            shootYmove: 0,
            scale: 0.8
        })
    }
});


Q.Runners.extend("Suarez", {            
    init: function(p){
        var player = Q("Player").first();
        this._super(p, {
            sheet: "suarez",
            sprite: "suarez",
            shootXmove: 20,
            scale: 1.1,
            x: player.p.x - Q.width
        });
    }
});


Q.Enemy.extend("Espia", {
    init: function(p){
        this._super(p, {
            sheet: "espia",
            sprite: "espia",
            shootLabel: "bomba",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1.1
        })
    }
});


Q.Enemy.extend("Cristiano", {
    init: function(p){
        this._super(p, {
            sheet: "cristiano",
            sprite: "cristiano",
            shootLabel: "balonoro",
            shootXmove: -15,
            shootYmove: 0,
            scale: 1.2
        })
    }
});

Q.Balls.extend("Ball", {
    init: function(p){
        this._super(p, {
            sheet: "ball",
            sprite: "ball"
        })
    }
});

Q.Balls.extend("Fireball", {
    init: function(p){
        this._super(p, {
            sheet: "fireball",
            sprite: "fireball"
        })
    }
});

Q.Balls.extend("Iceball", {
    init: function(p){
        this._super(p, {
            sheet: "iceball",
            sprite: "iceball"
        })
    }
}); 