import * as PIXI from 'pixi.js';
export class Counter extends PIXI.Container{

    private counterText: PIXI.Text;
    private counterValueText: PIXI.Text;
    private counterValue: number;
    constructor(){
        super();
        this.counterValue = 0;
        this.setCounterText();
    }

    private setCounterText():void{
        let textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
                "#015c5c"
            ],
            fillGradientType: 1,
            fontFamily: "sans-serif",
            fontSize: 90,
            padding: 1,
            stroke: "#fff014",
            strokeThickness: 2
        });
        this.counterText = new PIXI.Text('Incercari:');
        this.counterText.style = textStyle;

        this.counterValueText = new PIXI.Text(this.counterValue.toString());
        this.counterValueText.style = textStyle;

        this.counterValueText.y = this.counterText.height;
        this.counterValueText.x = this.counterText.width/2 - this.counterValueText.width/2;

        this.addChild(this.counterText);
        this.addChild(this.counterValueText);
    }

    private updateCounterPosition():void{
        this.counterValueText.x = this.counterText.width/2 - this.counterValueText.width/2;
    }

    private updateCounterValueText(){
        this.counterValueText.text = this.counterValue.toString();
    }

    public incrementCounter():void{
        this.counterValue++;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }

    public resetCounter():void{
        this.counterValue = 0;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }

    public getCounterValues():number{
        return this.counterValue;
    }
}