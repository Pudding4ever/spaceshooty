module managers {
    export class Collision {
        constructor() {

            this.start();
        }

        public start() {

        }

        public update() {

        }

//BECAUSE for whatever reason I can't use the gameobject class without it getting confused
//I'll have to make individual checks for all the different things you can collide with instead of a generic "other"

    public checkPlayerCollisions() {
        //run all below that pertain to player - everything that would kill a player, and the powerup.
        }

    public checkEnemyCollisions(){
        //run all below that pertain to enemies - everything we want to make an enemy blow up
    }

    public checkBulletButton(player: objects.cBullet, other: GUI.Button)
    {
        //Trigger a button if it's struck by a bullet
    }

        public checkPlayerBullet(player: objects.Player, other: objects.cBullet) {
            //hurt the player if the player is struck by a bullet
                        //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < (player.halfHeight + 3) && other.active == true) {
                    core.lives - 1;
                    console.log("Player struck by bullet");
                    other.active = false;
            }
            }

                    public checkButtonBullet(player: GUI.Button, other: objects.cBullet) {
            //hurt the player if the player is struck by a bullet
                        //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < ((player.x * 0.1)) && other.active == true) {
                    console.log("Button struck by bullet");
                    other.active = false;
                    player.triggered = true;
            }
            }

            public checkBulletAsteroid(array: Array<objects.Asteroid>, other: objects.cBullet, destroyed: scenes.play)
            {
                 for (var i: number = 0; i < array.length; i++)
                 {
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
            }

                      public checkBulletEnemy(array: Array<objects.enemy>, other: objects.cBullet, destroyed: scenes.play2)
            {
                 for (var i: number = 0; i < array.length; i++)
                 {
                    var a = array[i]; 
                    if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Enemy struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    //only the blue enemies count
                    if(array[i]._etype == 2)
                    {
                    destroyed.destroyed += 1;
                    }
                    console.log(destroyed.destroyed);
                    a.reset();
                    }
                 }
            }



                      public checkBulletEnemy2(array: Array<objects.enemy>, other: objects.cBullet, destroyed: scenes.play3)
            {

                //AWFUL HACK SO THE DAMN THING WILL JUST WORK IN TIME FOR DEMONSTRATION
                
                 for (var i: number = 0; i < array.length; i++)
                 {
                    var a = array[i]; 
                    if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight)) && other.active == true) {
                    console.log("Enemy struck by bullet");
                    createjs.Sound.play("explosion");
                    other.active = false;
                    //only the blue enemies count
                    if(array[i]._etype == 3)
                    {
                    destroyed.destroyed -= 1;
                    }
                    console.log(destroyed.destroyed);
                    }
                 }
            }



   public checkBulletBoss(boss: objects.boss, other: objects.cBullet)
            {
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
            }

            public checkPlayerAsteroid(array: Array<objects.Asteroid>, other: objects.Player)
            {
                 for (var i: number = 0; i < array.length; i++)
                 {
                                      var a = array[i]; 
                    if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight))) {
                    console.log("Player struck by asteroid");
                    createjs.Sound.play("hurt");
                    core.lives -= 1;
                    a.reset();
                    }
                 }
            }

            public checkPlayerEnemy(array: Array<objects.enemy>, other: objects.Player)
            {
                 for (var i: number = 0; i < array.length; i++)
                 {
                    var a = array[i]; 
                    if (objects.Vector2.distance(other.position, a.position) < ((5 + a.halfHeight))) {
                    console.log("Player struck by enemy");
                    createjs.Sound.play("hurt");
                    core.lives -= 1;
                    a.reset();
                    }
                 }
            }

        public checkPlayerEnmy(player: objects.Player, other: objects.Player) {
            //Kill player if the player bumps an enemy.
            //check to see if object is colliding
            if (objects.Vector2.distance(player.position, other.position) < (player.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    other.isColliding = true;

                    // if plane collides with cloud
                    if(other.name === "cloud") {
                        createjs.Sound.play("thunder");
                        core.lives -= 1;
                    }

                    // if plane collides with island
                    if(other.name === "island") {
                        createjs.Sound.play("yay");
                        core.score += 100;
                    }
                }
            }
            else {
                other.isColliding = false;
            }
        }
    }
}