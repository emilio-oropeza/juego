
Q.GameObject.extend("Launcher",{
    enemiesY: [-10, 350, 750],
    platformY: [150, 530],
    init: function() {
      this.p = {
        launchDelay: 0.7,
        launchRandom: 2,
        launch: 6
      }
    },      
    update: function(dt) {
      this.p.launch -= dt;
        if(this.p.launch < 0) {
            var randomY = Math.floor(Math.random() * 3 );
            var randomEnemy = Math.floor(Math.random() * 25 );

            if(randomY < 2){
                if ( currentStage === 0) {
                    this.stage.insert(new Q.PlatformSnow({y:this.platformY[randomY] }));
                }

                if ( currentStage === 1) {
                    this.stage.insert(new Q.PlatformRussia({y:this.platformY[randomY] }));
                }

                if ( currentStage === 2) {
                    this.stage.insert(new Q.PlatformFutbol({y:this.platformY[randomY] }));
                }
                
            } else {
                if ( currentStage === 0) {
                    this.stage.insert(new Q.PlatformSnow());
                }

                if ( currentStage === 1) {
                    this.stage.insert(new Q.PlatformRussia());
                }

                if ( currentStage === 2) {
                    this.stage.insert(new Q.PlatformFutbol());
                }
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
                case 6:
                    this.stage.insert(new Q.Robot1({y:this.enemiesY[randomY] }));
                    break;
                case 7:
                    this.stage.insert(new Q.Robot2({y:this.enemiesY[randomY] }));
                    break;
                case 8:
                    this.stage.insert(new Q.Cristiano({y:this.enemiesY[randomY] }));
                    break;
                case 9:
                    this.stage.insert(new Q.Espia({y:this.enemiesY[randomY] }));
                    break;
                case 10:
                    this.stage.insert(new Q.Suarez());
                    break;
                case 11:
                    this.stage.insert(new Q.Fireball({y:this.enemiesY[randomY] }));
                    break;
                case 12:
                    this.stage.insert(new Q.Arbitro1({y:this.enemiesY[randomY] }));
                    break;
                case 13:
                    this.stage.insert(new Q.Arbitro2({y:this.enemiesY[randomY] }));
                    break;
                case 14:
                    this.stage.insert(new Q.Ganma({y:this.enemiesY[randomY] }));
                    break;
                case 15:
                    this.stage.insert(new Q.Condor({y:200 }));
                    break;
                case 16:
                    this.stage.insert(new Q.Robben());
                    break;
                case 17:
                    this.stage.insert(new Q.Ball({y:this.enemiesY[randomY] }));
                    break;
                default:
                    break;
            }
            currentEnemies++;
            
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }
    }      
});



Q.GameObject.extend("CollectableLauncher", {
    collectable: [-10, 350, 750],
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
            var randomY = Math.floor(Math.random() * 3);
            if(random == 0) {this.stage.insert(new Q.Coin({y:this.collectable[randomY]}));}
            if (random == 1) {this.stage.insert(new Q.Icecream({y:this.collectable[randomY]})); }
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }          
    }    
});

Q.GameObject.extend("FloorLauncher", {
    init: function() {
        this.p = {
            launchDelay: 2.7,
            launchRandom: 1,
            launch: 1
        }
    },      
    update: function(dt) {
        this.p.launch -= dt;
        if(this.p.launch < 0) {
            if ( currentStage === 0) {
                this.stage.insert(new Q.PlatformPisoSnow());
            }

            if ( currentStage === 1) {
                this.stage.insert(new Q.PlatformPisoRussia());
            }

            if ( currentStage === 2) {
                this.stage.insert(new Q.PlatformPisoFutbol());
            }
            
            this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
        }          
    }    
});