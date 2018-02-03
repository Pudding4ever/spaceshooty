var managers;
(function (managers) {
    var cKeyboardInput = (function () {
        function cKeyboardInput() {
            var _this = this;
            this.keyCallback = {};
            this.keyDown = {};
            this.addKeycodeCallback = function (keycode, f) {
                _this.keyCallback[keycode] = f;
                _this.keyDown[keycode] = false;
            };
            this.keyboardDown = function (event) {
                if (_this.keyCallback[event.keyCode] != null) {
                    event.preventDefault(); //prevents arrow keys from scrolling screen, along with other default actions
                }
                _this.keyDown[event.keyCode] = true;
            };
            this.keyboardUp = function (event) {
                _this.keyDown[event.keyCode] = false;
            };
            this.inputLoop = function () {
                for (var key in _this.keyDown) {
                    var is_down = _this.keyDown[key];
                    if (is_down) {
                        var callback = _this.keyCallback[key];
                        if (callback != null) {
                            callback();
                        }
                    }
                }
            };
            document.addEventListener('keydown', this.keyboardDown);
            document.addEventListener('keyup', this.keyboardUp);
        }
        return cKeyboardInput;
    }());
    managers.cKeyboardInput = cKeyboardInput;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map