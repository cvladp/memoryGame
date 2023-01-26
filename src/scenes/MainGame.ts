import { Application, Container, Sprite } from 'pixi.js';
import { GridBackground } from './GridBackground';

export class MainGame extends Container {
    private _app: Application;
    private _gridBackground: GridBackground;

    constructor(app: Application) {
        super();
        this._app = app;
       // this.state = { velocity: { x: 1, y: 1 } };

        // this.sprite = new Sprite(
        //     app.loader.resources['assets/hello-world.png'].texture
        // );
      
     //   this.addChild(this.sprite);
        this._app.renderer.backgroundColor = 0xbAAAAA;
        this._gridBackground = new GridBackground();
        this.onAddedToStage();

        // Handle window resizing
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private onResize():void{
        this._gridBackground.x = window.innerWidth/2 - this._gridBackground.width/2;
        this._gridBackground.y = window.innerHeight/2 - this._gridBackground.height/2
    }

    private onAddedToStage(){
      this.addgridbackground();
    }

    private addgridbackground():void{
        this._gridBackground.x = window.innerWidth/2 - this._gridBackground.width/2;
        this._gridBackground.y = window.innerHeight/2 - this._gridBackground.height/2
        this.addChild(this._gridBackground);
    }

}