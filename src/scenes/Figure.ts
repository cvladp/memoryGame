import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import gsap from "gsap";

export class Figure extends Container{

    private _squareFigure: PIXI.Graphics;
    private _squareMask: PIXI.Graphics;
    private _trueColor: number;
    public _wasClicked: boolean;
    public _wasGuessed: boolean;
    private _figureID: number;

    public clickOnFigure: Function;  // function added in onclick handler so it can be accesed in parrent class  

    constructor(id:number){
        super();
        this._squareFigure = new PIXI.Graphics();
        this._squareMask = new PIXI.Graphics();
        this._trueColor = id * 0x123456;
        this._wasClicked = false;
        this._wasGuessed = false;
        this._figureID = id;
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
        this._squareMask.interactive = false;
        this.clickOnFigure(this);        // sends click info to parent class
        
        gsap.to(this._squareMask,{alpha: 0,duration: 0.25, onComplete: ()=>{
            this._wasClicked = true;
            gsap.to(this._squareFigure,{alpha: 1, duration: 0.25})
        }});
    }

    public fullResetFigure(){      // used for reset after game ends
        this._wasClicked = false;
        this._wasGuessed = false;
        this._squareMask.alpha = 1;
        this._squareMask.interactive = true;
    }
 
    public resetFigure():void{      // used for reset after comparing 2 non matching figures
        gsap.delayedCall(1,()=>{
            this._wasClicked = false;
            this._squareMask.alpha = 1;
            this._squareMask.interactive = true;
        }) ;
    }

    public getFigureId():number{
        return this._figureID;
    }

    public setMaskInteractivity(interactivity:boolean):void{
        this._squareMask.interactive = interactivity;
    }
}