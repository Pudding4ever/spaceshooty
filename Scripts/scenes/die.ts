module scenes {
    export class die extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _Starfield: objects.Starfield;
        private _menuLabel: GUI.Label;
        private _startButton: GUI.Button;

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
        public Start():void {
            createjs.Sound.stop();
            // Add Ocean Background
            core.lives = 3;
            this._Starfield = new objects.Starfield("starfield");
            this.addChild(this._Starfield);

            // Add Menu Label
            this._menuLabel = new GUI.Label(
                "GAME OVER", "72px","Impact", "#FFFF00",
                480, 200, true
                );
            this.addChild(this._menuLabel);
            this._startButton = new GUI.Button("button", 480, 270, true);
            this.addChild(this._startButton);

            // Start button event listener
            this._startButton.on("click", this._startButtonClick, this);

            // add this scene to the global scene container
            core.stage.addChild(this);
            createjs.Sound.play("gameover");
        }

        public Update():void {
            // scene updates happen here...
            this._Starfield.update();
            if(core.win == true)
            {
                this._menuLabel.text = "YOU WIN GOOD JOB"
            }
        }

        // EVENT HANDLERS ++++++++++++++++

        private _startButtonClick(event:createjs.MouseEvent):void {
            // Switch the scene
            core.win = false;
            core.scene = config.scene.START;
            core.changeScene();
        }
    }
}