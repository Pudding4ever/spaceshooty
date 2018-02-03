var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.update = function () {
        };
        //BECAUSE for whatever reason I can't use the gameobject class without it getting confused
        //I'll have to make individual checks for all the different things you can collide with instead of a generic "other"
        Collision.prototype.checkPlayerCollisions = function () {
            //run all below that pertain to player - everything that would kill a player, and the powerup.
        };
        Collision.prototype.checkEnemyCollisions = function () {
            //run all below that pertain to enemies - everything we want to make an enemy blow up
        };
        Collision.prototype.checkBulletButton = function (player, other) {
            //Trigger a button if it's struck by a bullet
        };
        Collision.prototype.checkPlayerBullet = function (player, other) {
            //hurt the player if the player is struck by a bullet
            //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < (player.halfHeight + 3) && other.active == true) {
                core.lives - 1;
                console.log("Player struck by bullet");
                other.active = false;
            }
        };
        Collision.prototype.checkButtonBullet = function (player, other) {
            //hurt the player if the player is struck by a bullet
            //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < ((player.x * 0.1)) && other.active == true) {
                console.log("Button struck by bullet");
                other.active = false;
                player.triggered = true;
            }
        };
        Collision.prototype.checkBulletAsteroid = function (array, other, destroyed) {
            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Asteroid struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    destroyed.destroyed += 1;
                    console.log(destroyed.destroyed);
                    a.reset();
                }
            }
        };
        Collision.prototype.checkBulletEnemy = function (array, other, destroyed) {
            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Enemy struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    //only the blue enemies count
                    if (array[i]._etype == 2) {
                        destroyed.destroyed += 1;
                    }
                    console.log(destroyed.destroyed);
                    a.reset();
                }
            }
        };
        Collision.prototype.checkBulletEnemy2 = function (array, other, destroyed) {
            //AWFUL HACK SO THE DAMN THING WILL JUST WORK IN TIME FOR DEMONSTRATION
            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Enemy struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    //only the blue enemies count
                    if (array[i]._etype == 3) {
                        destroyed.destroyed -= 1;
                    }
                    console.log(destroyed.destroyed);
                }
            }
        };
        Collision.prototype.checkBulletBoss = function (boss, other) {
            {
                var a = boss;
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Boss struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    //only the blue enemies count
                    a.bosshealth -= 1;
                }
            }
        };
        Collision.prototype.checkPlayerAsteroid = function (array, other) {
            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight))) {
                    console.log("Player struck by asteroid");
                    createjs.Sound.play("hurt");
                    core.lives -= 1;
                    a.reset();
                }
            }
        };
        Collision.prototype.checkPlayerEnemy = function (array, other) {
            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight))) {
                    console.log("Player struck by enemy");
                    createjs.Sound.play("hurt");
                    core.lives -= 1;
                    a.reset();
                }
            }
        };
        Collision.prototype.checkPlayerEnmy = function (player, other) {
            //Kill player if the player bumps an enemy.
            //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < (player.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    other.isColliding = true;
                    // if plane collides with cloud
                    if (other.name === "cloud") {
                        createjs.Sound.play("thunder");
                        core.lives -= 1;
                    }
                    // if plane collides with island
                    if (other.name === "island") {
                        createjs.Sound.play("yay");
                        core.score += 100;
                    }
                }
            }
            else {
                other.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map