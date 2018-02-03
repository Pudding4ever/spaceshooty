///<reference path="_reference.ts"/>
var core;
(function (core) {
    core.canvas = document.getElementById("canvas");
    core.ctx = CanvasRenderingContext2D.prototype = core.canvas.getContext("2d");
    // score, lives, and collision
    core.score = 0;
    core.lives = 3;
    core.win = false;
    //Object pools for projectiles
    core.bullet_array = new Array();
    //Main title screen text labels/buttons
    var gameTitle;
    var gameCredit;
    var StartGame;
    var Instructions;
    var ExitGame;
    // asset manifest for images and sounds
    var assetData = [
        { id: "starfield", src: "../../Assets/images/starfield.gif" },
        { id: "nebula", src: "../../Assets/images/nebula.png" },
        { id: "player", src: "../../Assets/images/player.gif" },
        { id: "pstarfield", src: "../../Assets/images/parallaxstarfield.gif" },
        { id: "button", src: "../../Assets/images/button.png" },
        { id: "asteroidl", src: "../../Assets/images/asteroidl.png" },
        { id: "asteroidm", src: "../../Assets/images/asteroidm.png" },
        { id: "asteroids", src: "../../Assets/images/asteroids.png" },
        { id: "eship", src: "../../Assets/images/eship.png" },
        { id: "eship2", src: "../../Assets/images/eship2.png" },
        { id: "eship3", src: "../../Assets/images/eship3.png" },
        { id: "boss", src: "../../Assets/images/spacedragon.png" },
        { id: "help", src: "../../Assets/images/instructions.png" },
        { id: "explosion", src: "Assets/audio/explosion.wav" },
        { id: "hurt", src: "Assets/audio/hurt.wav" },
        { id: "pew", src: "Assets/audio/pew.wav" },
        { id: "music", src: "Assets/audio/music.mp3" },
        { id: "gameover", src: "Assets/audio/gameover.mp3" }
    ];
    //Game Scenes
    var start;
    var play;
    var play2;
    var play3;
    var die;
    //INPUT MANAGER
    //?
    function preload() {
        core.assets = new createjs.LoadQueue(); // instantiates the loader
        core.assets.installPlugin(createjs.Sound);
        core.assets.loadManifest(assetData);
        core.assets.on("complete", init, this);
    }
    function init() {
        //SETUP INPUT MANAGER
        //Actual inputs are added when a player is added to the scene
        core.stage = new createjs.Stage(core.canvas);
        core.stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; //THE HUMAN EYE CAN'T PERCIEVE ALL THESE FRAMES!!111!1
        createjs.Ticker.on("tick", gameLoop);
        core.scene = config.scene.START;
        changeScene();
    }
    function gameLoop() {
        core.currentScene.Update();
        core.stage.update();
        drawbullets();
        if (core.lives <= 0) {
            core.scene = config.scene.DIE;
            changeScene();
        }
    }
    function drawbullets() {
        //Draw all the pew pew bullets
        for (var i = 0; i < core.bullet_array.length; i++) {
            var bullet = core.bullet_array[i];
            bullet.draw();
        }
    }
    core.drawbullets = drawbullets;
    //stop drawing all bullets when we want them to all go away
    function deactivateallbullets() {
        for (var i = 0; i < this.bullet_array.length; i++) {
            core.bullet_array[i].active = false;
        }
    }
    core.deactivateallbullets = deactivateallbullets;
    function changeScene() {
        //Launch Various Scenes
        switch (core.scene) {
            // Show the MENU Scene
            case config.scene.START:
                core.stage.removeAllChildren();
                start = new scenes.start();
                core.currentScene = start;
                break;
            // Show the PLAY Scene
            case config.scene.PLAY:
                core.stage.removeAllChildren();
                play = new scenes.play();
                core.currentScene = play;
                break;
            // Show the GAME OVER Scene
            case config.scene.DIE:
                core.stage.removeAllChildren();
                die = new scenes.die();
                core.currentScene = die;
                break;
            //Show level 2
            case config.scene.PLAY2:
                core.stage.removeAllChildren();
                play2 = new scenes.play2();
                core.currentScene = play2;
                break;
            //Show level 3
            case config.scene.PLAY3:
                core.stage.removeAllChildren();
                play3 = new scenes.play3();
                core.currentScene = play3;
                break;
        }
    }
    core.changeScene = changeScene;
    window.addEventListener("load", preload);
})(core || (core = {}));
//# sourceMappingURL=game.js.map