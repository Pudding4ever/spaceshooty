/**
 * @author Tom Tsiliopoulos ttsliop@my.centennialcollege.ca
 * @studentID 300818577
 * @date July 4, 2016
 * @version 0.01 - Initial version of the button class
 */

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic objects namespace
 * 
 * @module objects
 */
module GUI {
    /**
     * This simple Button class extends the createjs.Bitmap object.
     * It includes two private methods to handle mouseover and mouseout events.
     * 
     * @export
     * @class Button
     * @extends {createjs.Bitmap}
     */
    export class Button extends createjs.Bitmap {

        position:objects.Vector2;
        public triggered:boolean;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Button.
         * 
         * @constructor 
         * @param {string} pathString
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         */
        constructor(imageString: string, x:number, y:number, isCentered:boolean) {
            super(core.assets.getResult(imageString));
            this.position = new objects.Vector2;
            // Check if user wants to change regX and regY values to the center 
            if(isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.x = x;
            this.y = y;
            this.position.x = x;
            this.position.y = y;
            // binds the mouseover and mouseout events to the button object
            this.on("mouseover", this._mouseOver, this);
            this.on("mouseout", this._mouseOut, this)
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * This is an event handler for the mouseover event
         * 
         * @private
         * @method _mouseOver
         * @param {createjs.MouseEvent} event
         */
        private _mouseOver(event:createjs.MouseEvent):void {
            this.alpha = 0.7;
        }

        /**
         * This is an event handler for the mouseout event
         * 
         * @private
         * @method _mouseOut
         * @param {createjs.MouseEvent} event
         */
        private _mouseOut(event:createjs.MouseEvent):void {
            this.alpha = 1.0;
        }
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++