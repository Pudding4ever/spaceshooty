module scenes {
    export class play extends objects.Scene {
         //  PRIVATE INSTANCE VARIABLES
        private _Starfield: objects.Starfield;
        private _PStarfield: objects.PStarfield;
        private _liveslabel: GUI.Label;
        private _scorelabel: GUI.Label;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private bullet_array: Array<objects.cBullet>;
        private asteroid_array: Array<objects.Asteroid>;
        public destroyed: number = 0;

        /**
         * Creates an instance of Menu.
         * 
         */
        constructor() {
            super();
        }

        /**
         * 
         */
        public Start(): void {
            this.destroyed = 0;
            this.asteroid_array = new Array<objects.Asteroid>();
            this.bullet_array = core.bullet_array;
            this._collision = new managers.Collision();
            this._Starfield = new objects.Starfield("starfield");
            this._PStarfield = new objects.PStarfield("pstarfield");
            this._player = new objects.Player("player");
            this.Player = this._player;
            this.addChild(this._Starfield);
            this.addChild(this._PStarfield);
            this.addChild(this._player);
            // Add Menu Labels
            this._liveslabel = new GUI.Label(
                "LIVES: " + core.lives, "16px", "Impact", "#FFFFFF",
                50, 520, true
            );
            this.addChild(this._liveslabel);

            this._scorelabel = new GUI.Label(
                "ASTEROIDS DESTROYED: " + this.destroyed, "16px", "Impact", "#FFFFFF",
                200, 520, true
            );
            this.addChild(this._scorelabel);

            // add this scene to the global scene container
            core.stage.addChild(this);

            //place player ship appropriately
            this._player.placeship(200, 300);

            //populate field with asteroids
           this._PopulateAsteroidField();
        }

        public Update(): void {
            // scene updates happen here...
            this._Starfield.update();
            this._PStarfield.update();
            this._player.update();
            this.checkbullets();
            this._collision.checkPlayerAsteroid(this.asteroid_array, this._player);
            this._drawAllAsteroids();
            this._liveslabel.text = ("LIVES: " + core.lives);
            this._scorelabel.text = ("ASTEROIDS DESTROYED: " + this.destroyed);
            if(this.destroyed >= 30){
                core.scene = config.scene.PLAY2;
                core.changeScene();
            }
        }


        private checkbullets() {
            if (core.bullet_array.length > 0) {
                for (var i: number = 0; i < core.bullet_array.length; i++) {
                    if (core.bullet_array[i] != null && core.bullet_array[i].position != null) {
                        this._collision.checkPlayerBullet(this._player, core.bullet_array[i])
                        this._collision.checkBulletAsteroid(this.asteroid_array, core.bullet_array[i], this);
                    }
                }
            }
        }
        // EVENT HANDLERS ++++++++++++++++


        private _startButtonClick(event: createjs.MouseEvent): void {
            // Switch the scene
            core.scene = config.scene.PLAY;
            core.changeScene();
        }

          private _startButtonShoot(): void {
            // Switch the scene\
            core.deactivateallbullets();
            core.drawbullets();
            core.scene = config.scene.PLAY;
            core.changeScene();
        }


        private _drawAllAsteroids()
        {
            for (var i: number = 0; i < this.asteroid_array.length; i++) {
            var a = this.asteroid_array[i]; a.update();
        }
        }

        private _PopulateAsteroidField(): void {
            console.log("populate asteroids called");
            var asteroid: objects.Asteroid;
            for (var i: number = 0; i <= 10; i++){
                asteroid = new objects.Asteroid("asteroidl");
                this.addChild(asteroid);
                this.asteroid_array.push(asteroid);
                console.log("made new asteroid");
            }
        }

    }
}