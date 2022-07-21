import { bomberFrames } from '../assets/loader';
import * as PIXI from 'pixi.js';

interface BomberFrames {
    front: string[];
    back: string[];
    right: string[];
    left:  string[];
}

// Prepare frames
const playerFrames: BomberFrames = bomberFrames;

// IMPORTANT: Change this value in order to see the Hot Module Reloading!
const currentFrame: keyof BomberFrames = 'front';

// Graphics Class


const gravity = 8.31;



export class GameApp {

    private app: PIXI.Application;

    private shape : Shape;

    private shapes = new Array<Shape>();
    private index = 0;

    private numberToSpawn = 4;

    constructor(parent: HTMLElement, width: number, height: number) {

        this.app = new PIXI.Application({width, height, backgroundColor : 0x000000});
        parent.replaceChild(this.app.view, parent.lastElementChild); // Hack for parcel HMR
        this.CreateShapeArray();
    }

    // Creating a shape array
    private CreateShapeArray(){
          
        this.shapes.splice(0);

        do{
            var newX = Math.random() * (window.innerHeight + 100);
            var newY = window.innerHeight - (window.innerHeight + 250);
            var newshape = new Shape(newX, newY, this.getApp());
            this.shapes.push(newshape);
            this.numberToSpawn -= 1;
        }
        while(this.numberToSpawn != 0)
    }


    public getApp(){
        return this.app;
    }    

    public update(delta){
   

        if(this.shapes.length != 0){

        this.shapes.forEach(element => {
            element.Move(delta);
        });
        }

    
    }

    public SetShape(shape : Shape){
        this.shape = shape;
    }

}

export class Shape {
    private x : number;
    private y : number;
    private weight : number;
    private graphics : PIXI.Graphics;

    constructor(x: number, y : number, app: PIXI.Application){
        this.x = x;
        this.y = y;
        this.weight = Math.random() * 3;

        this.graphics = new PIXI.Graphics();

        this.graphics.beginFill(0xDE3249);
        this.graphics.drawRect(50, 50, 100, 100);
        this.graphics.endFill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        app.stage.addChild(this.graphics);

        
    }

    public Move(delta){
        this.y += delta * 1 * gravity * this.weight;
        this.graphics.y = this.y;
        
        if(this.y > window.innerHeight){
            this.x = Math.random() * (window.innerHeight + 50);
            this.y = window.innerHeight - (window.innerHeight + 250);
            this.graphics.x = this.x;
            this.graphics.y = this.y;
        }
        

    }
}
