import * as PIXI from 'pixi.js';
import gsap from "gsap";
export class EndPopup extends PIXI.Container {

    private _background: PIXI.Graphics;
    private message: PIXI.Text;
    private resetBTN: PIXI.Graphics;

    public clickOnReset: Function;

    constructor(width: number, height: number) {
        super();
        this.initiateBackground(width, height);
        this.initiateText();
        this.initiateResetBtn();
    }


    private initiateBackground(width: number, height: number) {
        this._background = new PIXI.Graphics;
        this._background.lineStyle(10, 0xFFBD01, 1);
        this._background.beginFill(0xFFA500);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();
        this._background.alpha = 0;
        this.addChild(this._background);
    }

    private initiateResetBtn(): void {
        this.resetBTN = new PIXI.Graphics();
        this.resetBTN.lineStyle(2, 0xFFFFFF, 1);
        this.resetBTN.beginFill(0xC34288, 1);
        this.resetBTN.drawEllipse(0, 0, 110, 50);
        this.resetBTN.endFill();

        let btnTexte = new PIXI.Text('RESTART');
        let textStyle = new PIXI.TextStyle({
            dropShadowColor: "#ed0202",
            fill: [
                "black",
            ],
            fillGradientType: 1,
            fontFamily: "Comic Sans MS",
            fontSize: 35,
            stroke: "#4ff014",
            strokeThickness: 2,
            align: 'center',
        });
        btnTexte.style = textStyle;
        btnTexte.x = this.resetBTN.width / 2 - btnTexte.width - 25;
        btnTexte.y = this.resetBTN.height / 2 - btnTexte.height - 25;

        this.resetBTN.addChild(btnTexte);
    }

    private initiateText() {
        this.message = new PIXI.Text('-');
        let textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
            ],
            fillGradientType: 1,
            fontFamily: "sans-serif",
            fontSize: 60,
            padding: 1,
            stroke: "#4ff014",
            strokeThickness: 2,
            align: 'center',
        });
        this.message.style = textStyle;
        this._background.addChild(this.message);
    }

    public playEndAnimation(guesses: number): void {
        this.message.text = 'Congratulations !\nYou solved the game in ' + guesses.toString() + ' comparisons.';
        this.positionText();
        this._background.y = -500;
        gsap.to(this._background, { alpha: 1, duration: 1, y: 0, onComplete: this.showResetButton.bind(this) });
    }

    private positionText(): void {
        this.message.x = this._background.width / 2 - this.message.width / 2;
        this.message.y = this._background.height / 2 - this.message.height;
    }

    private showResetButton(): void {
        this.resetBTN.x = this._background.width / 2;
        this.resetBTN.y = this.message.y + this.message.height + this.resetBTN.height;
        this.resetBTN.interactive = true;
        this.resetBTN.buttonMode = true;
        this.resetBTN.on('pointerdown', this.onResetClick.bind(this));

        this._background.addChild(this.resetBTN);
    }

    private onResetClick(): void {

        gsap.to(this.resetBTN, {
            alpha: 0.75, duration: 0.1, y: this.resetBTN.y + 5, onComplete: () => {
                gsap.to(this.resetBTN, {
                    alpha: 1, duration: 0.1, y: this.resetBTN.y - 5, onComplete: () => {
                        this.clickOnReset(this);
                        this._background.alpha = 0;
                        this.resetBTN.interactive = false;
                        this.resetBTN.buttonMode = false;
                    }
                })
            }
        });
    }
}