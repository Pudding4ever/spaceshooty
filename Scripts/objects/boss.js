var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * This is the Cloud object used in the game
     *
     * @export
     * @class Cloud
     * @extends {createjs.Bitmap}
     */
    var boss = (function (_super) {
        __extends(boss, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         *
         * @constructor
         * @param {string} imageString
         */
        function boss(imageString) {
            _super.call(this, core.assets.getResult(imageString));
            this._initialize(imageString);
            this.start();
        }
        Object.defineProperty(boss.prototype, "width", {
            // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "halfWidth", {
            get: function () {
                return this._width * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "halfHeight", {
            get: function () {
                return this._height * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (newName) {
                this._name = newName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(boss.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (newState) {
                this._isColliding = newState;
            },
            enumerable: true,
            configurable: true
        });
        boss.prototype._initialize = function (imageString) {
            this.e = new createjs.Bitmap("../../Assets/images/eship.png");
            this.e2 = new createjs.Bitmap("../../Assets/images/eship2.png");
            this.e3 = new createjs.Bitmap("../../Assets/images/eship3.png");
            this.bosshealth = 50;
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new objects.Vector2(this.x, this.y);
            this.isColliding = false;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        boss.prototype.reset = function () {
            this._reset();
        };
        boss.prototype._reset = function () {
            this.image = this.e.image;
            this._dy = 0;
            this._dx = Math.floor((Math.random() * -2) - 2); // horizontal drift
            this.x = 1000;
            this.y = Math.floor((Math.random() * (500 - (this.height * 0.5))) + (this.height * 0.5));
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        boss.prototype._checkBounds = function () {
            if (this.x >= (1850 - (this.width * 0.5))) {
                this._reset();
            }
            // check left bounds
            if (this.x <= (-50 + (this.width * 0.5))) {
                this._reset();
            }
            // check top bounds
            if (this.y >= (1000 - (this.width * 0.5))) {
                this._reset();
            }
            // check bottom bounds
            if (this.y <= (-100 + (this.width * 0.5))) {
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
        boss.prototype.start = function () {
            this._reset();
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        boss.prototype.update = function () {
            this.bossfight();
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        boss.prototype.bossfight = function () {
            //DETERMINE ENEMY BEHAVIOUR
            //that is: move to 800x, match y with player, fire a burst of bullets, withdraw
            console.log(this.evade);
            if (this.x >= 600 && this.evade == false) {
                this._dx = -5;
            }
            else {
                this._dx = 0;
            }
            ;
            if (this.evade == true) {
                this._dx = 2;
            }
            if (this.x >= 1000) {
                this.evade = false;
            }
            if (core.currentScene.Player.y > this.y && this.evade == false) {
                this._dy = 3;
            }
            if (core.currentScene.Player.y < this.y && this.evade == false) {
                this._dy = -3;
            }
            if ((core.currentScene.Player.y - this.y) < 5 && (core.currentScene.Player.y - this.y) > -5 && this.x <= 650 && this.evade == false) {
                if (this.y > 270) {
                    console.log("FIRE");
                    //fire bullets
                    this._dy = -7;
                    this.evade = true;
                }
                else {
                    //fire bullets
                    console.log("FIRE");
                    this._dy = 7;
                    this.evade = true;
                }
            }
        };
        return boss;
    }(createjs.Bitmap));
    objects.boss = boss;
})(objects || (objects = {}));
//# sourceMappingURL=boss.js.map