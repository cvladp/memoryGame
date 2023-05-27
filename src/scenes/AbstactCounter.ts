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

    protected setCounterText(): void { }

    protected updateCounterPosition(): void {
        this.counterValueText.x = this.counterText.width / 2 - this.counterValueText.width / 2;
    }

    protected updateCounterValueText() {
        this.counterValueText.text = this.counterValue.toString();
    }

    public getCounterValue(): number {
        return this.counterValue;
    }
}