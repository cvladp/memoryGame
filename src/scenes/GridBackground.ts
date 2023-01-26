import { Container } from "pixi.js";
import * as PIXI from 'pixi.js';
import { Figure } from "./Figure";
import { Counter } from "./Counter";
import { EndPopup } from "./EndPopup";


export class GridBackground extends Container{

    private _background: PIXI.Graphics;
    private _figure: Figure[];
    private _firstPick: Figure|null = null;
    private _secondPick: Figure|null = null;
    private _counter: Counter;
    private _endPopup:EndPopup;
    private static numberOfSimbols = 12;


    constructor(){
        super();
        this._background = new PIXI.Graphics;
        this._background.lineStyle(10, 0xFFBD01, 1);
        this._background.beginFill(0xC34288);
        this._background.drawRect(0,0,window.innerWidth-100,window.innerHeight-100);
        this._background.endFill();
        this._figure = [];
        this._counter = new Counter();
        this._endPopup = new EndPopup();
        this._endPopup.clickOnReset = this.resetBtnClickHandler.bind(this);

        this.onAddedToStage();

        window.addEventListener('resize', this.onResize.bind(this));
    }


    private onAddedToStage(){
        this.populateGridWithFigures();
        this.addChild(this._background);
        this.addCounter();
        this.addChild(this._endPopup);
    }

    private addCounter(){
        this._counter.x = 20;
        this._counter.y = window.innerHeight/2 - this._counter.height;
        this.addChild(this._counter);
    }



    private onResize():void{
        this._background.width = window.innerWidth - 100;
        this._background.height = window.innerHeight - 100;
    }

    private resetBtnClickHandler():void{
        console.log('RESET');
        this.resetCounter();
        this.resetGrid();
    }

    private resetCounter(){
        this._counter.resetCounter();
    }

    private resetGrid(){
        this._firstPick = this._secondPick = null;

        this._figure.forEach(element => {
            element.fullResetFigure();
        });
        this.shuffleArray(this._figure);
    }

    private populateGridWithFigures():void{
        let gridContainer = new PIXI.Container();
        let yPos = 50;
        let xPos = 100;
        let yDeviation = 200;

        for(let i = 0, y = 0,figureID = 0; i < GridBackground.numberOfSimbols; i++,y++,figureID++){
            this._figure[i] = new Figure(figureID);

            this._figure[i].clickOnFigure = (figure:Figure)=>{  // RECIVE CLICK EVENT INFO FROM CHILD CLASS
                this.figureClickedEvent(figure);
            }
            gridContainer.addChild(this._figure[i]);
            if(i%4==0){
                y = 0;
                yPos += yDeviation;
            }
            if(i%2 ==0){
                figureID--;
            }
            this._figure[i].x = xPos + y * 200;
            this._figure[i].y = yPos;
        }
        this.shuffleArray(this._figure);

        gridContainer.x = this._background.width/3 ;//- (gridContainer.width/2 + this._figure[0].width);
        gridContainer.y = this._background.height/2 - (gridContainer.height/2 + 50 + yDeviation);      // 50 - initial yPos

        this._background.addChild(gridContainer);
    }

    private shuffleArray(array:Figure[]){
        let currentIndex = array.length;
        let randomIndex;
        let xval;
        let yval;

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          xval = array[currentIndex].x;
          yval = array[currentIndex].y;
          array[currentIndex].x = array[randomIndex].x;
          array[currentIndex].y = array[randomIndex].y;
          array[randomIndex].x = xval;
          array[randomIndex].y = yval;  
        }
    }

    private figureClickedEvent(figure:Figure){
        
        if(this._firstPick == null) {
            this._firstPick = figure;
        }else{
            this._secondPick = figure; // second pick always valid only if first one was selected

            for(let i =0 ; i < this._figure.length; i++){       //disables all children interactivity to block more than 2 figures clicked at a time
                this._figure[i].setMaskInteractivity(false);
            }
        }

        if(this._secondPick != null){
            this._counter.incrementCounter();
            this.checkMatch();
        }
    }

    private checkMatch():void{
        if(this._firstPick!=null && this._secondPick != null && this._firstPick.getFigureId() == this._secondPick.getFigureId() ){
            this.handleWinCase();
        }else{
        }
        this._secondPick = this._firstPick = null;


        this.resetValues();
    }

    private resetValues():void{
       this._figure.forEach(element => {
            if(!element._wasGuessed){
                element.resetFigure();
            }
       });
    }

    private handleWinCase():void{
        if(this._firstPick)
        this._firstPick._wasGuessed = true;
        if(this._secondPick){
            this._secondPick._wasGuessed = true;
        }

        this.checkForEndGame();
    }

    private checkForEndGame():void{
        let guessedElementsCounter: number = 0;

        this._figure.forEach(element =>{
            if(element._wasGuessed){
                guessedElementsCounter++; //no win
            }
        });
        if(guessedElementsCounter == this._figure.length){
            this.handleEndGame(); // end game
        }
        console.log(guessedElementsCounter);
        console.log(this._figure.length);
    }

    private handleEndGame():void{
        this._endPopup.playEndAnimation(this._counter.getCounterValues());
    }

}
