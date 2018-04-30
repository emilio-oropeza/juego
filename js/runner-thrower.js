
Q.GameObject.extend("SnowLauncher",{
    enemiesY: [200, 380, 750],
    platformY: [390, 560],
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
            var randomY = Math.floor(Math.random() * 3 );
            var randomEnemy = Math.floor(Math.random() * 10 );

            if(randomY < 2){
                this.stage.insert(new Q.PlatformSnow({y:this.platformY[randomY] }));
            } else {
                this.stage.insert(new Q.PlatformSnow());
            }
            
            switch(randomEnemy) {
                case 0:
                    this.stage.insert(new Q.Nieve1({y:this.enemiesY[randomY] }));
                    break;
                case 1:
                    this.stage.insert(new Q.Nieve2({y:this.enemiesY[randomY] }));
                    break;
                case 2:
                    this.stage.insert(new Q.Messi({y:this.enemiesY[randomY] }));
                    break;
                case 3:
                    this.stage.insert(new Q.Chaka({y:this.enemiesY[randomY] }));
                    break;
                case 4:
                    this.stage.insert(new Q.Zlatan());
                    break;
                case 5:
                    this.stage.insert(new Q.Iceball({y:this.enemiesY[randomY] }));
                    break;
            }
            currentEnemies++;
            
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }
    }      
});

Q.GameObject.extend("RussianLauncher",{
    enemiesY: [200, 380, 750],
    platformY: [390, 560],
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
            var randomY = Math.floor(Math.random() * 3 );
            var randomEnemy = Math.floor(Math.random() * 10 );

            if(randomY < 2){
                this.stage.insert(new Q.PlatformRussia({y:this.platformY[randomY] }));
            } else {
                this.stage.insert(new Q.PlatformRussia());
            }
            
            switch(randomEnemy) {
                case 0:
                    this.stage.insert(new Q.Robot1({y:this.enemiesY[randomY] }));
                    break;
                case 1:
                    this.stage.insert(new Q.Robot2({y:this.enemiesY[randomY] }));
                    break;
                case 2:
                    this.stage.insert(new Q.Cristiano({y:this.enemiesY[randomY] }));
                    break;
                case 3:
                    this.stage.insert(new Q.Espia({y:this.enemiesY[randomY] }));
                    break;
                case 4:
                    this.stage.insert(new Q.Suarez());
                    break;
                case 5:
                    this.stage.insert(new Q.Fireball({y:this.enemiesY[randomY] }));
                    break;
            }
            currentEnemies++;
            
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }
    }      
});

Q.GameObject.extend("FutbolLauncher",{
    enemiesY: [200, 380, 750],
    platformY: [390, 560],
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
            var randomY = Math.floor(Math.random() * 3 );
            var randomEnemy = Math.floor(Math.random() * 10 );

            if(randomY < 2){
                this.stage.insert(new Q.PlatformFutbol({y:this.platformY[randomY] }));
            } else {
                this.stage.insert(new Q.PlatformFutbol());
            }
            
            switch(randomEnemy) {
                case 0:
                    this.stage.insert(new Q.Arbitro1({y:this.enemiesY[randomY] }));
                    break;
                case 1:
                    this.stage.insert(new Q.Arbitro2({y:this.enemiesY[randomY] }));
                    break;
                case 2:
                    this.stage.insert(new Q.Ganma({y:this.enemiesY[randomY] }));
                    break;
                case 3:
                    this.stage.insert(new Q.Condor({y:200 }));
                    break;
                case 4:
                    this.stage.insert(new Q.Robben());
                    break;
                case 5:
                    this.stage.insert(new Q.Ball({y:this.enemiesY[randomY] }));
                    break;
            }
            currentEnemies++;
            
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }
    }      
});

Q.GameObject.extend("CollectableLauncher", {
    init: function() {
        this.p = {
            launchDelay: 0.7,
            launchRandom: 2,
            launch: 2
        }
    },      
    update: function(dt) {
        this.p.launch -= dt;
        if(this.p.launch < 0) {
            var random = Math.floor(Math.random() * 2);
            var randomY = Math.floor(Math.random() * 400) + 300;
            if(random == 0) {this.stage.insert(new Q.Coin({y:randomY}));}
            if (random == 1) {this.stage.insert(new Q.Icecream({y:randomY})); }
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }          
    }    
});