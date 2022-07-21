import {GameApp, Shape} from "./app/app";

const myGame = new GameApp(document.body,  window.innerWidth, window.innerHeight);


requestAnimationFrame(Update);

function Update(){
    myGame.update(1);
    requestAnimationFrame(Update);
}