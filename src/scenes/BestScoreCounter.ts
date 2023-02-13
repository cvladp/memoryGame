import * as PIXI from 'pixi.js';

export class BestScoreCounter extends PIXI.Container {
    private counterText: PIXI.Text;
    private counterValueText: PIXI.Text;
    private counterValue: number;
    constructor() {
        super();
        this.counterValue = 99;
        this.setCounterText();
    }

    private setCounterText(): void {
        let textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
            ],
            fillGradientType: 1,
            fontFamily: "sans-serif",
            fontSize: 70,
            padding: 1,
            stroke: "#fff014",
            strokeThickness: 2
        });
        this.counterText = new PIXI.Text('Best Score:');
        this.counterText.style = textStyle;

        this.counterValueText = new PIXI.Text('-');
        this.counterValueText.style = textStyle;

        this.counterValueText.y = this.counterText.height;
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;

        this.addChild(this.counterText);
        this.addChild(this.counterValueText);
    }

    private updateCounterPosition(): void {
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;
    }

    private updateCounterValueText() {
        this.counterValueText.text = this.counterValue.toString();
    }

    public setCounterValue(value:number): void {
        this.counterValue = value;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }

    public getCounterValue(): number {
        return this.counterValue;
    }
}