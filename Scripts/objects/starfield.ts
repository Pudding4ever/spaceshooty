
module objects {
    export class Starfield extends createjs.Bitmap {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _dx:number;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Ocean.
         * 
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString: string) {
            super(core.assets.getResult(imageString));

            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * 
         * @private
         * @method _reset
         * @returns {void}
         */
        private _reset():void {
            this.x = -4000;
        }

        /**
         * This method checks if the object has reached its boundaries
         * 
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            if(this.x >= 0) {
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
        public start():void {
            this._reset();
            this._dx = 3; // 3px per frame down
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
            this.x += this._dx;
            this._checkBounds();
        }
    }
}