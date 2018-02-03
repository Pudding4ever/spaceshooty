var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         *
         * @constructor
         * @param {string} imageString
         */
        function Player(imageString) {
            var _this = this;
            _super.call(this, core.assets.getResult(imageString));
            this.moveLeft = function () {
                _this.x -= _this._moverate;
            };
            this.moveUp = function () {
                _this.y -= _this._moverate;
            };
            this.moveDown = function () {
                _this.y += _this._moverate;
            };
            this.moveRight = function () {
                _this.x += _this._moverate;
            };
            this.boost = function () {
                if (_this.kb.keyDown[16]) {
                    _this._moverate = 10;
                }
                else {
                    _this._moverate = 5;
                }
            };
            this.fire = function () {
                if (!_this.kb.keyDown[16]) {
                    //shoot projectile
                    var bullet;
                    for (var i = 0; i < core.bullet_array.length; i++) {
                        bullet = core.bullet_array[i];
                        if (bullet.active == false) {
                            break;
                        }
                    }
                    if (bullet == null || bullet.active == true && core.bullet_array.length <= 4) {
                        bullet = new cBullet(_this.x + 20, _this.y, 3);
                        core.bullet_array.push(bullet);
                    }
                    else {
                        bullet.x = _this.x + 20;
                        bullet.y = _this.y;
                        if (bullet.active == false) {
                            createjs.Sound.play("pew");
                        }
                        bullet.active = true;
                    }
                    bullet.launch(_this.position);
                }
            };
            this._initialize(imageString);
            this.start();
        }
        Object.defineProperty(Player.prototype, "width", {
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
        Object.defineProperty(Player.prototype, "halfWidth", {
            get: function () {
                return this._width * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "halfHeight", {
            get: function () {
                return this._height * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (newName) {
                this._name = newName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (newState) {
                this._isColliding = newState;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype._initialize = function (imageString) {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new objects.Vector2(this.x, this.y);
            this.isColliding = false;
        };
        Player.prototype._checkBounds = function () {
            // checkbounds to stop player from going outside
            // check right bounds
            if (this.x >= (850 - (this.width * 0.5))) {
                this.x = (850 - (this.width * 0.5));
            }
            // check left bounds
            if (this.x <= (50 + (this.width * 0.5))) {
                this.x = (50 + (this.width * 0.5));
            }
            // check top bounds
            if (this.y >= (520 - (this.width * 0.5))) {
                this.y = (520 - (this.width * 0.5));
            }
            // check bottom bounds
            if (this.y <= (25 + (this.width * 0.5))) {
                this.y = (25 + (this.width * 0.5));
            }
        };
        Player.prototype.start = function () {
            //INPUT MANAGEMENT
            this.kb = new managers.cKeyboardInput;
            // PRESS LEFT ARROW OR 'A' KEY
            this.kb.addKeycodeCallback(37, this.moveLeft);
            this.kb.addKeycodeCallback(65, this.moveLeft);
            // PRESS UP ARROW OR 'W' KEY
            this.kb.addKeycodeCallback(38, this.moveUp);
            this.kb.addKeycodeCallback(87, this.moveUp);
            // PRESS RIGHT ARROW OR 'D' KEY
            this.kb.addKeycodeCallback(39, this.moveRight);
            this.kb.addKeycodeCallback(68, this.moveRight);
            // PRESS DOWN ARROW OR 'S' KEY
            this.kb.addKeycodeCallback(40, this.moveDown);
            this.kb.addKeycodeCallback(83, this.moveDown);
            // PRESS SPACE BAR
            this.kb.addKeycodeCallback(32, this.fire);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = 500;
            this.y = 500;
        };
        Player.prototype.update = function () {
            // player to follow mouse
            this.position = new objects.Vector2(this.x, this.y);
            //this.x = core.stage.mouseX;
            //this.y = core.stage.mouseY;
            // console.log(this.x);
            this._checkBounds();
            this.kb.inputLoop();
            this.boost();
        };
        Player.prototype.placeship = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Player;
    }(createjs.Bitmap));
    objects.Player = Player;
    var cBullet = (function () {
        function cBullet(x, y, size, color, lineWidth) {
            var _this = this;
            if (color === void 0) { color = "red"; }
            if (lineWidth === void 0) { lineWidth = 5; }
            this.active = true;
            this.x = 0;
            this.y = 0;
            this.lineWidth = 5;
            this.size = 0;
            this.color = "red";
            this._name = "bullet";
            this.position = new objects.Vector2(this.x, this.y);
            this.lineWidthAnimVal = 0;
            this.widthUp = true;
            this.velocity = new objects.Vector2();
            this.speed = 7;
            this.launch = function (orientation) {
                _this.velocity.copy(orientation);
                _this.x += _this.speed;
                _this.position = new objects.Vector2(_this.x, _this.y);
            };
            this.draw = function () {
                if (_this.active == false) {
                    return;
                }
                if (_this.widthUp == true) {
                    _this.lineWidthAnimVal += 0.1;
                    if (_this.lineWidthAnimVal >= 2) {
                        _this.widthUp = false;
                    }
                }
                else {
                    _this.lineWidthAnimVal -= 0.1;
                    if (_this.lineWidthAnimVal <= -2) {
                        _this.widthUp = true;
                    }
                }
                _this.x += _this.speed;
                if (_this.x < -10 || _this.x > 1000 || _this.y < -10 || _this.y > 730) {
                    _this.active = false;
                }
                _this.position = new objects.Vector2(_this.x, _this.y);
                core.ctx.save();
                core.ctx.beginPath();
                core.ctx.strokeStyle = _this.color;
                core.ctx.lineWidth = _this.lineWidth + _this.lineWidthAnimVal;
                core.ctx.rect(_this.x, _this.y, _this.size, _this.size);
                core.ctx.stroke();
                core.ctx.restore();
            };
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.lineWidth = lineWidth;
        }
        return cBullet;
    }());
    objects.cBullet = cBullet;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map