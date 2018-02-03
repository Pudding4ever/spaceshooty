var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var exit = (function (_super) {
        __extends(exit, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function exit() {
            _super.call(this);
        }
        /**
         *
         */
        exit.prototype.Start = function () {
            // Add Ocean Background
            this._Starfield = new objects.Starfield("starfield");
            this.addChild(this._Starfield);
            // Add Menu Label
            this._menuLabel = new GUI.Label("MAIL PILOT", "60px", "Dock51", "#FFFF00", 320, 240, true);
            this.addChild(this._menuLabel);
            this.addChild(this._startButton);
            // Start button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        exit.prototype.Update = function () {
            // scene updates happen here...
            this._Starfield.update();
        };
        // EVENT HANDLERS ++++++++++++++++
        exit.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.scene.PLAY;
            core.changeScene();
        };
        return exit;
    }(objects.Scene));
    scenes.exit = exit;
})(scenes || (scenes = {}));
//# sourceMappingURL=exit.js.map