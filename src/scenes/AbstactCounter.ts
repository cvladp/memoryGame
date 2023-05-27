import * as PIXI from 'pixi.js';

export abstract class AbstractCounter extends PIXI.Container {
    protected counterText: PIXI.Text;
    protected counterValueText: PIXI.Text;
    protected counterValue: number;

    constructor(counterValue: number) {
        super();
        this.counterValue = counterValue;
        this.setCounterText();
    }

    protected setCounterText(): void {
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
            strokeThickness: 2,
            lineHeight: 28
        });
        this.counterText = new PIXI.Text('Default value');
        this.counterText.style = textStyle;

        this.counterValueText = new PIXI.Text('Default value');
        this.counterValueText.style = textStyle;

        this.counterValueText.y = this.counterText.height;
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;

        this.addChild(this.counterText);
        this.addChild(this.counterValueText);
    }

    protected updateCounterPosition(): void {
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;
    }

    protected updateCounterValueText() {
        this.counterValueText.text = this.counterValue.toString();
    }

    public getCounterValue(): number {
        return this.counterValue;
    }

    public setCounterValue(value: number): void {
        this.counterValue = value;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }
}