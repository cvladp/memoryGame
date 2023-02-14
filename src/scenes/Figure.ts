import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import gsap from "gsap";
import { EventEmitter } from "./EventEmitter";
import { NotificationNames } from "../system/NotificationNames";
import { Howl } from 'howler';

export class Figure extends Container {

    private _squareMask: PIXI.Graphics;
    public _wasClicked: boolean;
    public _wasGuessed: boolean;
    private _figureID: number;
    private _texture: PIXI.Texture;
    private _sprite: PIXI.Sprite;
    private _clickSound: Howl;

    constructor(id: number, texture: PIXI.Texture) {
        super();

        this._squareMask = new PIXI.Graphics();
        this._wasClicked = false;
        this._wasGuessed = false;
        this._figureID = id;
        this._texture = texture;
        this._clickSound =  new Howl({src: ['assets/flip.mp3']});
        this.setupSprite();
        this.setupFigure();

    }


    private setupFigure() {
        const text = new PIXI.Text('?', {
            fontFamily: 'Arial',
            bold: true,
            fontSize: 100,
            fill: 0x0c8004,
            align: 'center',
            fontWeight:'bolder'
        });

        this._squareMask.lineStyle(5, 0xFFBD01, 1);
        this._squareMask.beginFill(0xc7adff);
        this._squareMask.drawRect(0, 0, 200, 200);
        this._squareMask.endFill();

        text.x = this._squareMask.width / 2 - text.width / 2;
        text.y = this._squareMask.height / 2 - text.height / 2;
        this._squareMask.addChild(text);

        this._squareMask.interactive = true;
        this._squareMask.cursor = 'pointer';
        this._squareMask.on('pointerdown', this.onFigureClicked.bind(this));

        this.addChild(this._squareMask);

        this._sprite.x = this._squareMask.width / 2 - this._sprite.width / 2;
        this._sprite.y = this._squareMask.height / 2 - this._sprite.height / 2;

        this.addChild(this._sprite);
    }

    private setupSprite(): void {
        this._sprite = new PIXI.Sprite(this._texture);
        this._sprite.scale.set(1);
        this._sprite.alpha = 0;
    }

    private onFigureClicked(): void {
        this._clickSound.play();
        this._squareMask.interactive = false;
        gsap.to(this._squareMask, {
            alpha: 0, duration: 0.25, onComplete: () => {
                this._wasClicked = true;
                gsap.to(this._sprite, { alpha: 1, duration: 0.25 })
            }
        });
        EventEmitter.getInstance().emit(NotificationNames.FIGURE_CLICKED_NOTIFICATION, this);
    }

    public fullResetFigure() {      // used for reset after game ends
        this._wasClicked = false;
        this._wasGuessed = false;
        this._squareMask.alpha = 1;
        this._squareMask.interactive = true;
        this._sprite.alpha = 0;
    }

    public resetFigure(): void {      // used for reset after comparing 2 non matching figures
        gsap.delayedCall(1, () => {
            this._wasClicked = false;
            this._squareMask.alpha = 1;
            this._squareMask.interactive = true;
            this._sprite.alpha = 0;
        });
    }

    public getFigureId(): number {
        return this._figureID;
    }

    public setMaskInteractivity(interactivity: boolean): void {
        this._squareMask.interactive = interactivity;
    }
}