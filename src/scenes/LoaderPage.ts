import * as PIXI from 'pixi.js';
import gsap from "gsap";

export class LoaderPage extends PIXI.Container{
    private loadingText: PIXI.Text;
    private textStyle: PIXI.TextStyle;

    /** 
     * Constructor method for preloader class
     * Initializes the text and text style
     */
    constructor(){
        super();


        this.loadingText = new PIXI.Text('Loading...');
        this.textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
                "#5c5c5c"
            ],
            fillGradientType: 1,
            fontFamily: "Comic Sans MS",
            fontSize: 200,
            padding: 1,
            stroke: "#4ff014",
            strokeThickness: 2
        });

        this.loadingText.style = this.textStyle;
        this.alpha = 0;
        this.addChild(this.loadingText);
        this.animateText();
    }

    /** 
     * Method used for text animation during the preloader
     */
    private animateText(){
        gsap.to(this, {alpha: 1, yoyo:true, repeat: 10, duration: 0.5});
    }
}