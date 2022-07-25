import { bomberFrames } from '../assets/loader';
import * as PIXI from 'pixi.js';

interface BomberFrames {
    front: string[];
    back: string[];
    right: string[];
    left:  string[];
}

enum ShapeType {
    RECTANGLE = 0,
    CIRCLE = 1,
    ELLISPE = 2
}

// Prepare frames
const playerFrames: BomberFrames = bomberFrames;

// IMPORTANT: Change this value in order to see the Hot Module Reloading!
const currentFrame: keyof BomberFrames = 'front';

// Graphics Class


const gravity = 8.31;

const height = 1000;
const width = 1000;

let container = new PIXI.Container();

export class GameApp {

    private app: PIXI.Application;

    private shape : Shape;

    private shapes = new Array<Shape>();
    private index = 0;

    private numberToSpawn = 10;

    constructor(parent: HTMLElement) {

        this.app = new PIXI.Application({width, height, backgroundColor : 0x000000});
        parent.replaceChild(this.app.view, parent.lastElementChild); // Hack for parcel HMR
        var canvas = new RectnagleCanvas(this.app);
        
        
        this.CreateShapeArray();
    }

    // Creating a shape array
    private CreateShapeArray(){
          
        this.shapes.splice(0);

        do{
            var newX = Math.random() * (window.innerHeight + 100);
            var newY = window.innerHeight - (window.innerHeight + 250);
            var newshape;

            var type = Math.floor(Math.random() * 3);

            switch(type){
                case 0:
                    newshape = new Rectangle(newX, newY, this.getApp());
                    break;
                case 1:
                    newshape = new Circle(newX, newY, 100, this.getApp());
                    break;
                case 2:
                    newshape = new Ellpse(newX, newY, 50, 100, this.getApp());
                    break;
            }

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


// Rectangle Cavnca - DEPERACATED
class RectnagleCanvas {

    private graphics : PIXI.Graphics;

    constructor(app: PIXI.Application){

        this.graphics = new PIXI.Graphics();

        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
        this.graphics.x = 0;
        this.graphics.y = 0;
        app.stage.addChild(this.graphics);
    }
}


// Base Shape Class
export class Shape {
    protected x : number;
    protected y : number;
    protected weight : number;
    protected graphics : PIXI.Graphics;
    protected app : PIXI.Application;
    protected container : PIXI.Container;

    // Base Shape Constructor
    constructor(x: number, y : number, app: PIXI.Application){
        this.x = x;
        this.y = y;
        this.app = app;
        
        this.weight = Math.random() * 5;
        

        this.graphics = new PIXI.Graphics();
    }

    // Moving the Shape down the screen
    public Move(delta){
        this.y += delta * 1 * gravity * this.weight;
        this.graphics.y = this.y;     
    }

    // Reseting the position of the shape to the top of the screen
    protected ResetPosition(){
        this.x = Math.random() * width;
        this.y = 0 + Math.random() * 10;

        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.renderable = true;
    }

}

// Circle Shape Class
class Circle extends Shape {

    private radius : number;

    constructor(x: number, y : number, radius: number, app: PIXI.Application){
        super(x, y, app);
        this.radius = radius;


        this.graphics.beginFill(0xDE3249);
        this.graphics.drawCircle(this.x, this.y, this.radius);
        this.graphics.endFill();
        app.stage.addChild(this.graphics);
    }
    
    public Move(delta: any): void {
        super.Move(delta);
        var topOfCircle = this.y - (this.radius * 4);
        var botOfCircle = this.y + (this.radius * 4);

        if(topOfCircle > height){
            this.graphics.renderable = false;
            this.ResetPosition();
        }

        if(botOfCircle < 0){
            this.graphics.renderable = true;
        }

        
    }
}

// Rectange Class
class Rectangle extends Shape {
    constructor(x: number, y : number, app: PIXI.Application){
        super(x, y, app);

        this.graphics.beginFill(0xDE3249);
        this.graphics.drawRect(0, 0, 100, 100);
        this.graphics.endFill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        app.stage.addChild(this.graphics);
        
        //container.addChild(this.graphics);
    }

    public Move(delta: any): void {
        super.Move(delta);

        if(this.y > height){
            this.graphics.renderable = false;
            this.ResetPosition();
        }

        if(this.y < 0){
            this.graphics.renderable = true;
        }
    }
}

// Ellispe Class
class Ellpse extends Shape
{

    private height : number;
    private width : number;

    constructor(x: number, y : number, width : number, height : number, app: PIXI.Application){
        super(x, y, app);

        this.width = width;
        this.height = height;

        this.graphics.beginFill(0xDE3249);
        this.graphics.drawEllipse(this.x, this.y, this.width, this.height);
        this.graphics.endFill();
        app.stage.addChild(this.graphics);
    }

    public Move(delta: any): void {
        super.Move(delta);

        var topOfCircle = this.y - (this.height * 4);
        var botOfCircle = this.y + this.height;


        if(topOfCircle > height){
            this.graphics.renderable = false;
            this.ResetPosition();
        }

        if(botOfCircle < 0){
            this.graphics.renderable = true;
        }
    }
}


    

