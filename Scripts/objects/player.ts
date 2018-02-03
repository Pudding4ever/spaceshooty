module objects {
    export class Player extends createjs.Bitmap {

        


        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++

private kb: managers.cKeyboardInput;

        private _moverate: number;


//STUFF FROM GAME OBJECT BECAUSE FOR SOME REASON I DON'T UNDERSTAND THE WHOLE THING FALLS APART WHEN I TRY TO EXTEND GAMEOBJECT

         // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
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

        private _checkBounds(): void {
            // checkbounds to stop player from going outside

            // check right bounds
            if (this.x >= (850 - (this.width * 0.5))) {
                this.x = (850 - (this.width * 0.5));
            }

            // check left bounds
            if (this.x <= (50 + (this.width * 0.5))) {
                this.x = (50 + (this.width * 0.5));
            }

            // check top bounds
            if (this.y >= (520 - (this.width * 0.5))) {
                this.y = (520 - (this.width * 0.5));
            }

            // check bottom bounds
            if (this.y <= (25 + (this.width * 0.5))) {
                this.y = (25 + (this.width * 0.5));
            }
        }

        public start(): void {

            //INPUT MANAGEMENT

            this.kb = new managers.cKeyboardInput;

        // PRESS LEFT ARROW OR 'A' KEY
        this.kb.addKeycodeCallback(37, this.moveLeft);
        this.kb.addKeycodeCallback(65, this.moveLeft);

        // PRESS UP ARROW OR 'W' KEY
        this.kb.addKeycodeCallback(38, this.moveUp);
        this.kb.addKeycodeCallback(87, this.moveUp);
        // PRESS RIGHT ARROW OR 'D' KEY
        this.kb.addKeycodeCallback(39, this.moveRight);
        this.kb.addKeycodeCallback(68, this.moveRight);

        // PRESS DOWN ARROW OR 'S' KEY
        this.kb.addKeycodeCallback(40, this.moveDown);
        this.kb.addKeycodeCallback(83, this.moveDown);

        // PRESS SPACE BAR
        this.kb.addKeycodeCallback(32, this.fire);

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = 500;
            this.y = 500;
        }

        public moveLeft=():  void => {

            this.x -= this._moverate;
        }

        private moveUp=(): void => {

            this.y -= this._moverate;

        }
        private moveDown=(): void => {

            this.y += this._moverate;
        }
        private moveRight=(): void => {

            this.x += this._moverate;

        }

        private boost=(): void => {
            if(this.kb.keyDown[16])
            {
                this._moverate = 10;
            }
            else{
                this._moverate = 5
            }
        }

        private fire=(): void=> {
if(!this.kb.keyDown[16]){
            //shoot projectile
  var bullet: cBullet;
  for (var i: number = 0; i < core.bullet_array.length; i++) {
   bullet = core.bullet_array[i];
   if (bullet.active == false) {
       
    break;
   }
  }
  if (bullet == null || bullet.active == true && core.bullet_array.length <= 4) {
   bullet = new cBullet(this.x+20, this.y, 3);
   core.bullet_array.push(bullet);
  }
  else {
   bullet.x = this.x+20;
   bullet.y = this.y;
   if(bullet.active == false){createjs.Sound.play("pew");}
   bullet.active = true;
  }
  bullet.launch(this.position);

 }
        }

        public update(): void {
            // player to follow mouse
            this.position = new Vector2(this.x, this.y);
            //this.x = core.stage.mouseX;
            //this.y = core.stage.mouseY;
           // console.log(this.x);
            this._checkBounds();
            this.kb.inputLoop();
            this.boost();
        }



 public placeship(x: number, y: number)
 {
     this.x = x;
     this.y = y;
 }







    }


export interface iShape {
   draw(): void;
   x: number;
   y: number;
   color: string;
   lineWidth: number;
}

 export class cBullet implements iShape {
 public active: boolean = true;
 public x: number = 0;
 public y: number = 0;
 public lineWidth: number = 5;
 public size: number = 0;
 public color: string = "red";
 public _name: string = "bullet";
 public position = new Vector2(this.x, this.y);
 public lineWidthAnimVal: number = 0;
 public widthUp: boolean = true;

 public velocity = new Vector2();
 public speed: number = 7;

 public launch = (orientation: objects.Vector2): void => {
  this.velocity.copy(orientation);
  this.x += this.speed;
  this.position = new Vector2(this.x, this.y);
 }

 public draw = (): void => {
  if (this.active == false) {
   return;
  }

  if (this.widthUp == true) {
   this.lineWidthAnimVal += 0.1;

   if (this.lineWidthAnimVal >= 2) {
    this.widthUp = false;
   }
  }
  else {
   this.lineWidthAnimVal -= 0.1;
   if (this.lineWidthAnimVal <= -2) {
    this.widthUp = true;
   }
  }
  this.x += this.speed

  if (this.x < -10 || this.x > 1000 || this.y < -10 || this.y > 730) {
   this.active = false;
  }
  this.position = new Vector2(this.x, this.y);
  core.ctx.save();
  core.ctx.beginPath();
  core.ctx.strokeStyle = this.color;
  core.ctx.lineWidth = this.lineWidth + this.lineWidthAnimVal;
  core.ctx.rect(this.x, this.y, this.size, this.size);
  core.ctx.stroke();
  core.ctx.restore();
 }

 public constructor(x: number, y: number, size: number, color: string = "red", lineWidth: number = 5) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.lineWidth = lineWidth;
 }
}    
}