import * as PIXI from 'pixi.js';
import { AbstractCounter } from './AbstactCounter';

export class BestScoreCounter extends AbstractCounter {

    setCounterText(): void {
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
        this.counterText = new PIXI.Text('Best Score:');
        this.counterText.style = textStyle;

        this.counterValueText = new PIXI.Text('-');
        this.counterValueText.style = textStyle;

        this.counterValueText.y = this.counterText.height;
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;

        this.addChild(this.counterText);
        this.addChild(this.counterValueText);
    }

    public setCounterValue(value: number): void {
        this.counterValue = value;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }


}