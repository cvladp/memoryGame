import { Application, Container, Sprite } from 'pixi.js';
import { GridBackground } from './GridBackground';

export class MainGame extends Container {
    private _app: Application;
    private _gridBackground: GridBackground;

    constructor(app: Application) {
        super();
        this._app = app;
        this._app.renderer.backgroundColor = 0x000000;
        this._gridBackground = new GridBackground();
        this.onAddedToStage();
    }

    private onAddedToStage() {
        this.addgridbackground();
    }

    private addgridbackground(): void {
        this.addChild(this._gridBackground);
    }

}