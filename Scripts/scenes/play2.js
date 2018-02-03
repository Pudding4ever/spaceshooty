var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var play2 = (function (_super) {
        __extends(play2, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function play2() {
            _super.call(this);
            this.destroyed = 0;
        }
        /**
         *
         */
        play2.prototype.Start = function () {
            this.destroyed = 0;
            this.asteroid_array = new Array();
            this.bullet_array = core.bullet_array;
            this._collision = new managers.Collision();
            this._Starfield = new objects.Starfield("starfield");
            this._PStarfield = new objects.PStarfield("nebula");
            this._player = new objects.Player("player");
            this.Player = this._player;
            this.addChild(this._Starfield);
            this.addChild(this._PStarfield);
            this.addChild(this._player);
            // Add Menu Labels
            this._liveslabel = new GUI.Label("LIVES: " + core.lives, "16px", "Impact", "#FFFFFF", 50, 520, true);
            this.addChild(this._liveslabel);
            this._scorelabel = new GUI.Label("ENEMIES DESTROYED: " + this.destroyed, "16px", "Impact", "#FFFFFF", 200, 520, true);
            this.addChild(this._scorelabel);
            // add this scene to the global scene container
            core.stage.addChild(this);
            //place player ship appropriately
            this._player.placeship(200, 300);
            //populate field with asteroids
            this._PopulateAsteroidField();
        };
        play2.prototype.Update = function () {
            // scene updates happen here...
            this._Starfield.update();
            this._PStarfield.update();
            this._player.update();
            this.checkbullets();
            this._collision.checkPlayerEnemy(this.asteroid_array, this._player);
            this._drawAllAsteroids();
            this._liveslabel.text = ("LIVES: " + core.lives);
            this._scorelabel.text = ("ENEMIES DESTROYED: " + this.destroyed);
            if (this.destroyed >= 15) {
                core.scene = config.scene.PLAY3;
                core.changeScene();
            }
        };
        play2.prototype.checkbullets = function () {
            if (core.bullet_array.length > 0) {
                for (var i = 0; i < core.bullet_array.length; i++) {
                    if (core.bullet_array[i] != null && core.bullet_array[i].position != null) {
                        this._collision.checkPlayerBullet(this._player, core.bullet_array[i]);
                        this._collision.checkBulletEnemy(this.asteroid_array, core.bullet_array[i], this);
                    }
                }
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        play2.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.scene.PLAY;
            core.changeScene();
        };
        play2.prototype._startButtonShoot = function () {
            // Switch the scene\
            core.deactivateallbullets();
            core.drawbullets();
            core.scene = config.scene.PLAY;
            core.changeScene();
        };
        play2.prototype._drawAllAsteroids = function () {
            for (var i = 0; i < this.asteroid_array.length; i++) {
                var a = this.asteroid_array[i];
                a.update();
            }
        };
        play2.prototype._PopulateAsteroidField = function () {
            console.log("populate asteroids called");
            var asteroid;
            for (var i = 0; i <= 5; i++) {
                asteroid = new objects.enemy("eship");
                asteroid._etype = 0;
                this.addChild(asteroid);
                this.asteroid_array.push(asteroid);
                console.log("made new enemy");
            }
        };
        return play2;
    }(objects.Scene));
    scenes.play2 = play2;
})(scenes || (scenes = {}));
//# sourceMappingURL=play2.js.map