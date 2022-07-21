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
var graphics = new PIXI.Graphics();

const gravity = 8.31;

export class GameApp {

    private app: PIXI.Application;

    private shape : Shape;

    constructor(parent: HTMLElement, width: number, height: number) {

        this.app = new PIXI.Application({width, height, backgroundColor : 0x000000});
        parent.replaceChild(this.app.view, parent.lastElementChild); // Hack for parcel HMR
        graphics = new PIXI.Graphics();
        
        const newshape = new Shape(200, 100, this.getApp());
        this.shape = newshape;

    }

    public getApp(){
        return this.app;
    }    

    public update(delta){
        this.shape.Move(delta);
    }

    public SetShape(shape : Shape){
        this.shape = shape;
    }

}

export class Shape {
    private x : number;
    private y : number;

    constructor(x: number, y : number, app: PIXI.Application){
        this.x = x;
        this.y = y;

        graphics.beginFill(0xDE3249);
        graphics.drawRect(50, 50, x, y);
        graphics.endFill();
        app.stage.addChild(graphics);

        
    }

    public Move(delta){
        this.y += delta * 1 * gravity;
        graphics.y = this.y;
        
        if(this.y > window.innerHeight){
            this.x = Math.random() * (window.innerHeight + 50);
            this.y = window.innerHeight - (window.innerHeight + 250);
            graphics.x = this.x;
            graphics.y = this.y;
        }
        

    }
}
