/// <reference path="../core/game.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * This abstract scene class is used to create individual scenes
     *
     * @export
     * @abstract
     * @class Scene
     * @extends {createjs.Container}
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.call(this);
            this.Start();
        }
        /**
         * Add game objects to the scene in this method
         *
         * @method Start
         * @returns {void}
         */
        Scene.prototype.Start = function () {
            core.stage.addChild(this);
        };
        /**
         * Updates Game objects in the Scene
         *
         * @method Update
         * @returns {void}
         */
        Scene.prototype.Update = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=Scene.js.map