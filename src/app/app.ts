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


export class GameApp {

    private app: PIXI.Application;

    constructor(parent: HTMLElement, width: number, height: number) {

        this.app = new PIXI.Application({width, height, backgroundColor : 0x000000});
        parent.replaceChild(this.app.view, parent.lastElementChild); // Hack for parcel HMR

        // init Pixi loader
        let loader = new PIXI.Loader();

        // Add user player assets
        console.log('Player to load', playerFrames);
        Object.keys(playerFrames).forEach(key => {
            loader.add(playerFrames[key]);
        });

        // Load assets
        loader.load(this.onAssetsLoaded.bind(this));
    }

    private onAssetsLoaded() {

        const playerIdle: PIXI.AnimatedSprite = new PIXI.AnimatedSprite(playerFrames[currentFrame].map(path => PIXI.Texture.from(path)));

        /*
        * An AnimatedSprite inherits all the properties of a PIXI sprite
        * so you can change its position, its anchor, mask it, etc
        */
        playerIdle.x = 100;
        playerIdle.y = 150;
        playerIdle['vx'] = 1;
        playerIdle.anchor.set(0, 1);
        // playerIdle.anchor.set(0.5);
        playerIdle.animationSpeed = 0.3;
        playerIdle.play();

        this.app.stage.addChild(playerIdle);
    }

}
