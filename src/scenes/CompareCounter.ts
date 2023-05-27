import { AbstractCounter } from './AbstactCounter';
export class CompareCounter extends AbstractCounter {

    setCounterText(): void {
        super.setCounterText();
        this.counterText.text = 'Comparisons';
        this.counterValueText.text = this.counterValue.toString();
        this.updateCounterPosition();
    }

    public incrementCounter(): void {
        this.counterValue++;
        this.updateCounterValueText();
        this.updateCounterPosition();
    }
}