module objects {
    /**
     * This is the Cloud object used in the game
     * 
     * @export
     * @class Cloud
     * @extends {createjs.Bitmap}
     */
    export class Asteroid extends createjs.Bitmap {
     private _moverate: number;


//STUFF FROM GAME OBJECT BECAUSE FOR SOME REASON I DON'T UNDERSTAND YET THE WHOLE THING FALLS APART WHEN I TRY TO EXTEND GAMEOBJECT
//WASTED A LOT OF TIME, HAVE TO GET ON WITH IT

         // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _dy:number;
        private _dx:number;
        private _width:number;
        private _height:number;
        private _name:string;
        private _position:Vector2;
        private _isColliding:boolean;
        public sound:createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++

        get width():number {
            return this._width;
        }

        set width(newWidth:number) {
            this._width = newWidth;
        }

        get halfWidth():number {
            return this._width * 0.5;
        }

        get height():number {
            return this._height;
        }

        set height(newHeight:number) {
            this._height = newHeight;
        }

        get halfHeight():number{
            return this._height * 0.5;
        }

        get name():string {
            return this._name;
        }

        set name(newName:string) {
            this._name = newName;
        }

        get position():Vector2 {
            return this._position;
        }

        set position(newPosition:Vector2) {
            this._position = newPosition;
        }

        get isColliding():boolean {
            return this._isColliding;
        }

        set isColliding(newState:boolean) {
            this._isColliding = newState;
        }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         * 
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString:string) {
            super(core.assets.getResult(imageString))
            
            this._initialize(imageString);

            this.start();
        }
        
        private _initialize(imageString:string):void {
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
        public reset():void
        {
            this._reset();
        }

        private _reset():void {
            this._dy = Math.floor((Math.random() * 2) - 1); // vertical speed
            this._dx = Math.floor((Math.random() * -2) - 2); // horizontal drift

            //this.y = -this.height;

            // get a random x location
            this.x = 1000
            this.y = Math.floor((Math.random() * (1000 - (this.height * 0.5))) + (this.height * 0.5));
        }

        /**
         * This method checks if the object has reached its boundaries
         * 
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            if (this.x >= (1850 - (this.width * 0.5))) {
                this._reset();}

            // check left bounds
            if (this.x <= (-50 + (this.width * 0.5))) {
                 this._reset();}

            // check top bounds
            if (this.y >= (1520 - (this.width * 0.5))) {
                 this._reset();}

            // check bottom bounds
            if (this.y <= (-250 + (this.width * 0.5))) {
                  this._reset();}
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
        public start():void {
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
        public update():void {
            this.position = new Vector2(this.x, this.y);
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        }
    }
}