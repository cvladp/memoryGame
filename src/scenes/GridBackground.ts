import { Container, Sprite } from "pixi.js";
import * as PIXI from 'pixi.js';
import { Figure } from "./Figure";
import { Counter } from "./Counter";
import { EndPopup } from "./EndPopup";
import { AssetsName } from "../system/AssetsName";


export class GridBackground extends Container{

    private _background: PIXI.Graphics;
    private _figure: Figure[];
    private _firstPick: Figure|null = null;
    private _secondPick: Figure|null = null;
    private _counter: Counter;
    private _endPopup:EndPopup;
    private static numberOfSimbols = 12;
    private loader :PIXI.Loader;
    private gridContainer: PIXI.Container;

    private _windowDiagonal:number;


    constructor(loader:PIXI.Loader){
        super();

        this._windowDiagonal = Math.sqrt(window.outerWidth*window.outerWidth + window.outerHeight*window.outerHeight); 
        this._background = new PIXI.Graphics;
        this._background.lineStyle(10, 0xFFBD01, 1);
        this._background.beginFill(0xC34288);
        this._background.drawRect(0,0,window.innerWidth,window.innerHeight);
        this._background.endFill();
        this._figure = [];
        this._counter = new Counter();
        this._endPopup = new EndPopup();
        this._endPopup.clickOnReset = this.resetBtnClickHandler.bind(this);
        this.loader = loader

        this.onAddedToStage();

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();
    }


    private onAddedToStage(){
        this.populateGridWithFigures();
        this.addChild(this._background);
        this.addCounter();
        this.addChild(this._endPopup);

    }

    private addCounter(){
        this._counter.x = this._background.x + 20;
        this._counter.y = window.innerHeight/2 - this._counter.height;
        this._counter.scale = new PIXI.Point((this._windowDiagonal/1300)/2, (this._windowDiagonal/1300)/2);
        this.addChild(this._counter);
    }

    private onResize():void{

        var w = window.outerWidth;
        var h = window.outerHeight;
        this._windowDiagonal =  Math.sqrt(w*w + h*h);  // window diagonal length
        console.log(this._windowDiagonal);
   

      
        this._background.width = window.innerWidth;// + window.innerWidth/ window.innerHeight;
        this._background.height = window.innerHeight;

        //this.gridContainer.scale = new PIXI.Point((this._windowDiagonal/1300)/1.5, (this._windowDiagonal/1300)/1.5);
        // this.gridContainer.x = this._background.width/2 - this.gridContainer.width/2 ;//- (gridContainer.width/2 + this._figure[0].width);
        // this.gridContainer.y = this._background.height/2 - this.gridContainer.height;      //
        

        this._counter.x = this._background.x + 20;
        this._counter.y = window.innerHeight/2 - this._counter.height;
       
        this._counter.scale = new PIXI.Point((this._windowDiagonal/1300)/2, (this._windowDiagonal/1300)/2);

        this._endPopup.width = window.innerWidth;
        this._endPopup.height = window.innerHeight;

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
        this.gridContainer = new PIXI.Container();
        let yPos = 0;
        let xPos = 0;
        let texture: PIXI.Texture;

        for(let i = 0, y = 0,figureID = 0; i < GridBackground.numberOfSimbols; i++,y++,figureID++){
            texture = this.loader.resources['HP'+(figureID+1).toString()].texture;
            this._figure[i] = new Figure(figureID,texture);

            this._figure[i].clickOnFigure = (figure:Figure)=>{  // RECIVE CLICK EVENT INFO FROM CHILD CLASS
                this.figureClickedEvent(figure);
            }
            this.gridContainer.addChild(this._figure[i]);
            if(i%4==0){
                y = 0;
                yPos += this._figure[0].height;
            }
            if(i%2 ==0){
                figureID--;
            }
            this._figure[i].x = xPos + y * 200;
            this._figure[i].y = yPos;
        }
        this.shuffleArray(this._figure);
        this.gridContainer.scale = new PIXI.Point((this._windowDiagonal/1300)/1.5, (this._windowDiagonal/1300)/1.5);
        this.gridContainer.x = this._background.width/2 - this.gridContainer.width/2 ;//- (gridContainer.width/2 + this._figure[0].width);
        this.gridContainer.y = this._background.height/2 - this.gridContainer.height;      // 50 - initial yPos

        this._background.addChild( this.gridContainer);
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
