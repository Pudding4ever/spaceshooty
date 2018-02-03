var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Starfield = (function (_super) {
        __extends(Starfield, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Ocean.
         *
         * @constructor
         * @param {string} imageString
         */
        function Starfield(imageString) {
            _super.call(this, core.assets.getResult(imageString));
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Starfield.prototype._reset = function () {
            this.x = -4000;
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Starfield.prototype._checkBounds = function () {
            if (this.x >= 0) {
                this._reset();
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Starfield.prototype.start = function () {
            this._reset();
            this._dx = 3; // 3px per frame down
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Starfield.prototype.update = function () {
            this.x += this._dx;
            this._checkBounds();
        };
        return Starfield;
    }(createjs.Bitmap));
    objects.Starfield = Starfield;
})(objects || (objects = {}));
//# sourceMappingURL=starfield.js.map