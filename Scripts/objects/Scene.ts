/// <reference path="../core/game.ts"/>

module objects {
    /**
     * This abstract scene class is used to create individual scenes
     * 
     * @export
     * @abstract
     * @class Scene
     * @extends {createjs.Container}
     */

    export abstract class Scene extends createjs.Container {
       
       public Player: objects.Player;
       
        constructor() {
            super();

            this.Start();
        }

        /**
         * Add game objects to the scene in this method
         * 
         * @method Start
         * @returns {void}
         */
        public Start():void {
            core.stage.addChild(this);
        }

        /**
         * Updates Game objects in the Scene
         * 
         * @method Update
         * @returns {void} 
         */
        public Update():void {

        }
    }
}