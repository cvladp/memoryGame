import * as PIXI from 'pixi.js';
import gsap from "gsap";
export class EndPopup extends PIXI.Container{

    private _background: PIXI.Graphics;
    private message: PIXI.Text;

    constructor(){
        super();
        this.initiateBackground();
        this.initiateText();
    }


    private initiateBackground(){
        this._background = new PIXI.Graphics;
        this._background.lineStyle(10, 0xFFBD01, 1);
        this._background.beginFill(0xFFA500);
        this._background.drawRect(0,0,window.innerWidth-50,window.innerHeight-50);
        this._background.endFill();
        this._background.alpha = 0;
        this.addChild(this._background);
    }

    private initiateText(){
        this.message = new PIXI.Text('-');
        let textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
                "#5c5c5c"
            ],
            fillGradientType: 1,
            fontFamily: "Comic Sans MS",
            fontSize: 60,
            padding: 1,
            stroke: "#4ff014",
            strokeThickness: 2,
            align: 'center',
        });
        this.message.style = textStyle;
        this._background.addChild(this.message);
    }

    public playEndAnimation(guesses: number):void{
        this.message.text = 'Felicitari !\nAi rezolvat jocu in ' + guesses.toString() + ' incercari.';
        this.positionText();
        this._background.y = -500;
        gsap.to(this._background, {alpha:1, duration: 2, y: 0});
    }

    private positionText():void{
        this.message.x = this._background.width/2 - this.message.width/2;
        this.message.y = this._background.height/2 - this.message.height/2;
    }
}