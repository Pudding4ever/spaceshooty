module objects {
    /**
     * This is the Cloud object used in the game
     * 
     * @export
     * @class Cloud
     * @extends {createjs.Bitmap}
     */
    export class boss extends createjs.Bitmap {
        private _moverate: number;


        //STUFF FROM GAME OBJECT BECAUSE FOR SOME REASON I DON'T UNDERSTAND YET THE WHOLE THING FALLS APART WHEN I TRY TO EXTEND GAMEOBJECT
        //WASTED A LOT OF TIME, HAVE TO GET ON WITH IT

        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private e: createjs.Bitmap;
        private e2: createjs.Bitmap;
        private e3: createjs.Bitmap;
        private _dy: number;
        private _dx: number;
        private _width: number;
        private _height: number;
        private _name: string;
        private _position: Vector2;
        private _isColliding: boolean;
        public sound: createjs.AbstractSoundInstance;
        public _etype: number;
        public evade: boolean;
        public bosshealth: number;

        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++

        get width(): number {
            return this._width;
        }

        set width(newWidth: number) {
            this._width = newWidth;
        }

        get halfWidth(): number {
            return this._width * 0.5;
        }

        get height(): number {
            return this._height;
        }

        set height(newHeight: number) {
            this._height = newHeight;
        }

        get halfHeight(): number {
            return this._height * 0.5;
        }

        get name(): string {
            return this._name;
        }

        set name(newName: string) {
            this._name = newName;
        }

        get position(): Vector2 {
            return this._position;
        }

        set position(newPosition: Vector2) {
            this._position = newPosition;
        }

        get isColliding(): boolean {
            return this._isColliding;
        }

        set isColliding(newState: boolean) {
            this._isColliding = newState;
        }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         * 
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString: string) {
            super(core.assets.getResult(imageString))

            this._initialize(imageString);

            this.start();
        }

        private _initialize(imageString: string): void {
            this.e = new createjs.Bitmap("../../Assets/images/eship.png");
            this.e2 = new createjs.Bitmap("../../Assets/images/eship2.png");
            this.e3 = new createjs.Bitmap("../../Assets/images/eship3.png");
            this.bosshealth = 50;
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new Vector2(this.x, this.y);
            this.isColliding = false;
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         * 
         * @private
         * @method _reset
         * @returns {void}
         */
        public reset(): void {
            this._reset();
        }

        private _reset(): void {
                    this.image = this.e.image;
                    this._dy = 0;
                    this._dx = Math.floor((Math.random() * -2) - 2); // horizontal drift
                    this.x = 1000
                    this.y = Math.floor((Math.random() * (500 - (this.height * 0.5))) + (this.height * 0.5));
            }

        /**
         * This method checks if the object has reached its boundaries
         * 
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds(): void {
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
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        /**
         * This method is used to initialize public properties 
         * and private instance variables
         * 
         * @public 
         * @method start
         * @returns {void}
         */
        public start(): void {
            this._reset();
        }

        /**
         * This method updates the object's properties
         * every time it's called
         * 
         * @public 
         * @method update
         * @returns {void}
         */
        public update(): void {
            this.bossfight();
            this.position = new Vector2(this.x, this.y);
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();

        }

        public bossfight(): void
        {
  //DETERMINE ENEMY BEHAVIOUR
                    //that is: move to 800x, match y with player, fire a burst of bullets, withdraw
                    console.log(this.evade);
                    if (this.x >= 600 && this.evade == false) {
                        this._dx = -5;
                    }
                    else { this._dx = 0 };

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
    }
    }
}
