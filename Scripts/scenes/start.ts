module scenes {
    export class start extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _Starfield: objects.Starfield;
        private _PStarfield: objects.PStarfield;
        private _titleLabel: GUI.Label;
        private _creditLabel: GUI.Label;
        private _helpgraphic: GUI.Button;
        private _startButton: GUI.Button;
        private _helpButton: GUI.Button;
        private _exitButton: GUI.Button;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private bullet_array: Array<objects.cBullet>;

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
            createjs.Sound.play("music");
            this._helpgraphic = new GUI.Button("help", 600, 300, true);
            this.bullet_array = core.bullet_array;
            this._collision = new managers.Collision();
            this._Starfield = new objects.Starfield("starfield");
            this._PStarfield = new objects.PStarfield("pstarfield");
            this._player = new objects.Player("player");
            this._startButton = new GUI.Button("button", 400, 300, true);
            this.addChild(this._Starfield);
            this.addChild(this._PStarfield);
            this.addChild(this._player);
            this.addChild(this._startButton);
            this.addChild(this._helpgraphic);
            // Add Menu Labels
            this._titleLabel = new GUI.Label(
                "SPACE BATTLE!", "45px", "Impact", "#FFFFFF",
                200, 160, true
            );
            this.addChild(this._titleLabel);

            this._creditLabel = new GUI.Label(
                "A VIDEOTRONIC ENTERTAINMENT MODULE", "20px", "Impact", "#FFFFFF",
                200, 200, true
            );
            this.addChild(this._creditLabel);

            // add this scene to the global scene container
            core.stage.addChild(this);
            
            //button click event listener
            this._startButton.on("click", this._startButtonClick, this);

            //place player ship appropriately
            this._player.placeship(200, 300);

        }

        public Update(): void {
            // scene updates happen here...
            this._Starfield.update();
            this._PStarfield.update();
            this._player.update();
            this.checkbullets();
            if(this._startButton.triggered == true)
            {
                this._startButtonShoot();
            }
        }


        private checkbullets() {
            if (core.bullet_array.length > 0) {
                for (var i: number = 0; i < core.bullet_array.length; i++) {
                    if (core.bullet_array[i] != null && core.bullet_array[i].position != null) {
                        this._collision.checkPlayerBullet(this._player, core.bullet_array[i])
                         this._collision.checkButtonBullet(this._startButton, core.bullet_array[i])
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
            core.scene = config.scene.PLAY3;
            core.changeScene();
        }
    }
}