import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import { Figure } from "./Figure";

export class GridBackground extends Container{

    private _background: PIXI.Graphics;
    private _figure: Figure[];
    private _allowedColors = [0xfc0303,0xfcf803,0x1cfc03,0x03f4fc,0x030ffc,0xf803fc, 0xfc0303,0xfcf803,0x1cfc03,0x03f4fc,0x030ffc,0xf803fc];

    constructor(){
        super();
        this._background = new PIXI.Graphics;
        this._background.lineStyle(10, 0xFFBD01, 1);
        this._background.beginFill(0xC34288);
        this._background.drawRect(0,0,window.innerWidth-100,window.innerHeight-100);
        this._background.endFill();

        this._figure = [];
        // this._background.addChild(this._figure);

        this.onAddedToStage();

        window.addEventListener('resize', this.onResize.bind(this));
    }


    private onAddedToStage(){
        this.populateGridWithFigures();
        this.addChild(this._background);

    }

    private onResize():void{
        this._background.width = window.innerWidth - 100;
        this._background.height = window.innerHeight - 100;
    }

    private populateGridWithFigures():void{
        let gridContainer = new PIXI.Container();
        let yPos = 50;
        let xPos = 100;
        let yDeviation = 200;
        this.shuffleArray(this._allowedColors);

        for(let i = 0, y = 0; i < 12; i++,y++){
            this._figure[i] = new Figure(this._allowedColors[i]);
            gridContainer.addChild(this._figure[i]);
            if(i%4==0){
                y = 0;
                yPos += yDeviation;
            }
            this._figure[i].x = xPos + y * 200;
            this._figure[i].y = yPos; 
        }

        gridContainer.x = this._background.width/2 - (gridContainer.width/2 + this._figure[0].width);
        gridContainer.y = this._background.height/2 - (gridContainer.height/2 + 50 + yDeviation);      // 50 - initial yPos

        this._background.addChild(gridContainer);
    }

    private shuffleArray(array:number[]){
        let currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
}