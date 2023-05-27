
import { AbstractCounter } from './AbstactCounter';

export class BestScoreCounter extends AbstractCounter {

    setCounterText(): void {
        super.setCounterText();
        this.counterText.text = 'Best Score';
        this.counterValueText.text = '-';
        this.updateCounterPosition();
    }
}