import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import gsap from "gsap";

export class Figure extends Container{

    private _squareFigure: PIXI.Graphics;
    private _squareMask: PIXI.Graphics;
    private _trueColor: number;

    constructor(color:number){
        super();
        this._squareFigure = new PIXI.Graphics();
        this._squareMask = new PIXI.Graphics();
        this._trueColor = color;

        
        this.setupFigure();

    }


    private setupFigure(){
        this._squareFigure.beginFill(this._trueColor);
        this._squareFigure.drawRect(0,0,100,100);
        this._squareFigure.endFill();

        const text = new PIXI.Text('?', {
            fontFamily: 'Arial',
            bold: true,
            fontSize: 100,
            fill: 0x0c8004,
            align: 'center',
        });

        this._squareMask.beginFill(0xc7adff);
        this._squareMask.drawRect(0,0,100,100);
        this._squareMask.endFill();

        text.x = this._squareMask.width/2 - text.width/2;
        text.y = this._squareMask.height/2 - text.height/2; 
        this._squareMask.addChild(text);
        
        this._squareMask.interactive = true;
        this._squareMask.cursor = 'pointer';
        this._squareMask.on('pointerdown',this.onFigureClicked.bind(this));

        this._squareFigure.alpha = 0;
        this.addChild(this._squareFigure);
        this.addChild(this._squareMask);
    }

    private onFigureClicked():void{
       // this._squareMask.visible = false;
        gsap.to(this._squareMask,{alpha: 0,duration: 0.25, onComplete: ()=>{
            this._squareMask.interactive = false;
            gsap.to(this._squareFigure,{alpha: 1, duration: 0.25})
        }});
    }

    public resetFigure():void{
        this._squareMask.alpha = 1;
        this._squareMask.interactive = true;
    }
}