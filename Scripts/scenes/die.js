var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var die = (function (_super) {
        __extends(die, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function die() {
            _super.call(this);
        }
        /**
         *
         */
        die.prototype.Start = function () {
            createjs.Sound.stop();
            // Add Ocean Background
            core.lives = 3;
            this._Starfield = new objects.Starfield("starfield");
            this.addChild(this._Starfield);
            // Add Menu Label
            this._menuLabel = new GUI.Label("GAME OVER", "72px", "Impact", "#FFFF00", 480, 200, true);
            this.addChild(this._menuLabel);
            this._startButton = new GUI.Button("button", 480, 270, true);
            this.addChild(this._startButton);
            // Start button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
            createjs.Sound.play("gameover");
        };
        die.prototype.Update = function () {
            // scene updates happen here...
            this._Starfield.update();
            if (core.win == true) {
                this._menuLabel.text = "YOU WIN GOOD JOB";
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        die.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.win = false;
            core.scene = config.scene.START;
            core.changeScene();
        };
        return die;
    }(objects.Scene));
    scenes.die = die;
})(scenes || (scenes = {}));
//# sourceMappingURL=die.js.map