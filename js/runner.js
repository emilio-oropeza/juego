window.addEventListener("load",function() {
      
    Q.load("juan.json, juan.png, "+
            "random.png, platforms.png, platforms.json, gameOVER.jpg,"+
            "start_background.jpg, jugar_btn.png, score_hub.png," +
            "level0.jpg, level1.jpg, level2.jpg, level3.jpg, level4.jpg," +
            "level5.jpg, level6.jpg, level7.jpg, level8.jpg, level9.jpg, level10.jpg," +
            "gameover_background.jpg, repeat_btn.png, share_btn.png, marcador.png," +
            "snow_background.png, snow_piso.png, snow_piso1.png," +
            "rusia_background.png, rusia_piso.png, rusia_piso1.png," +
            "futbol_background.png, futbol_piso.png, futbol_piso1.png," +
            "enemies.png, enemies.json, bullets.png, bullets.json," +
            "inicio.wav, nieve.wav, muerte.wav," +
            "collectables.png, collectables.json, coin.wav",
    function() {
        Q.compileSheets("juan.png","juan.json");
        Q.compileSheets("collectables.png","collectables.json");
        Q.compileSheets("platforms.png","platforms.json");
        Q.compileSheets("enemies.png","enemies.json");
        Q.compileSheets("bullets.png","bullets.json");
        Q.animations("juan", {
          walk_right: { frames: [2,3,4,5,6,7,8,9], rate: 1/10, flip: false, loop: true },
          jump_right: { frames: [6], rate: 1/10, flip: false },
          stand_right: { frames:[10], rate: 1/10, flip: false },
          hit: {frames: [1,0], rate:1/2, flip:false, loop:false}
        });
        Q.animations("arbitro1", {
            move: { frames: [0,1,2], rate: 1/3, flip: false, loop: true },
            dead: { frames: [0,1,2], rate: 1/3, flip: false, loop: true }
        });
        Q.animations("arbitro2", {
            move: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true },
            dead: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true }
        });
        Q.animations("ganma", {
            move: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true },
            dead: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true }
        });
        Q.animations("condor", {
            move: { frames: [0,1,2], rate: 1/3, flip: false, loop: true },
            dead: { frames: [0,1,2], rate: 1/3, flip: false, loop: true }
        });
        Q.animations("robben", {
            move: { frames: [0,1,2], rate: 1/3, flip: false, loop: false },
            dead: { frames: [0,1,2], rate: 1/3, flip: false, loop: false }
        });
        Q.animations("nieve1", {
            move: { frames: [0,1,2], rate: 1/3, flip: false, loop: true },
            dead: { frames: [0,1,2], rate: 1/3, flip: false, loop: true }
        });
        Q.animations("nieve2", {
            move: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true },
            dead: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true }
        });
        Q.animations("messi", {
            move: { frames: [0,1,2,3,4,5], rate: 1/6, flip: false, loop: true },
            dead: { frames: [0,1,2,3,4,5], rate: 1/6, flip: false, loop: true }
        });
        Q.animations("chaka", {
            move: { frames: [0,1,2,4], rate: 1/5, flip: false, loop: true },
            dead: { frames: [0,1,2,4], rate: 1/5, flip: false, loop: true }
        });
        Q.animations("zlatan", {
            move: { frames: [0,1,2,3,4,5,6], rate: 1/7, flip: false, loop: true },
            dead: { frames: [0,1,2,3,4,5,6], rate: 1/7, flip: false, loop: true }
        });
        Q.animations("robot1", {
            move: { frames: [0,1,2], rate: 1/3, flip: false, loop: true },
            dead: { frames: [0,1,2], rate: 1/3, flip: false, loop: true }
        });
        Q.animations("robot2", {
            move: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true },
            dead: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true }
        });
        Q.animations("suarez", {
            move: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true },
            dead: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true }
        });
        Q.animations("espia", {
            move: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true },
            dead: { frames: [0,1,2,3,4], rate: 1/5, flip: false, loop: true }
        });
        Q.animations("cristiano", {
            move: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true },
            dead: { frames: [0,1,2,3], rate: 1/4, flip: false, loop: true }
        });
        Q.animations("ball", {
            move: { frames: [0], rate: 1/1, flip: false, loop: true },
            dead: { frames: [0], rate: 1/1, flip: false, loop: true }
        });
        Q.animations("fireball", {
            move: { frames: [0], rate: 1/1, flip: false, loop: true },
            dead: { frames: [0], rate: 1/1, flip: false, loop: true }
        });
        Q.animations("iceball", {
            move: { frames: [0], rate: 1/1, flip: false, loop: true },
            dead: { frames: [0], rate: 1/1, flip: false, loop: true }
        });
        Q.stageScene("start");
      
    });    
});
    