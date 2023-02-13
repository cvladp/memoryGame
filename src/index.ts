import * as PIXI from 'pixi.js';
import { LoaderPage } from './scenes/LoaderPage';
import { MainGame } from './scenes/MainGame';
import gsap from "gsap";
import { AssetsName } from './system/AssetsName';

class EntryPoint{
    private app: PIXI.Application;
    private loaderPage: LoaderPage;

    private appWidth:number = 1920;
    private appHeight:number = 1080;
    private aspectRatio = this.appWidth / this.appHeight;

    constructor(){
        this.app = new PIXI.Application({width: this.appWidth, height: this.appHeight,
            backgroundColor: 0x2980b9,
        });
   
        document.body.style.margin = '0';
        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';

        window.addEventListener('resize', this.onResize.bind(this));

        document.body.appendChild(this.app.view);
        this.onResize();

    }

    private onResize():void{
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = this.app.renderer.width / this.appWidth;
        this.app.stage.scale.y = this.app.renderer.height / this.appHeight;

        if(this.app.renderer.width / this.app.renderer.height <= this.aspectRatio){
            this.app.stage.scale.y = this.app.stage.scale.x;
        }else{
            this.app.stage.scale.x = this.app.stage.scale.y;
        }

        this.app.stage.x = window.innerWidth / 2 - this.app.stage.width/2;
        this.app.stage.y = window.innerHeight / 2 - this.app.stage.height/2;
    }

    public startAppLoader():void{
        for(let i = 1; i < 7; i++){
            this.app.loader.add(AssetsName.SYMBOL_NAME+i.toString(),'assets/HP'+i+'.png');
        }
        this.app.loader.onStart.add(this.onLoadingStarted.bind(this));
        this.app.loader.onComplete.add(this.onAssetsLoaded.bind(this));
        this.app.loader.load();
    }

    private onLoadingStarted():void{
        this.loaderPage = new LoaderPage();
        this.app.stage.addChild(this.loaderPage);
        this.loaderPage.x = this.app.stage.width /2 - this.loaderPage.width /2;
        this.loaderPage.y = this.app.stage.height/2 - this.loaderPage.height /2;
    }

    private onAssetsLoaded():void{
        gsap.delayedCall(0, ()=>{
            const mainStage = new MainGame(this.app);
            this.loaderPage.destroy;
            this.app.stage.removeChild(this.loaderPage);
            this.app.stage.addChild(mainStage);
            this.onResize();
        });
    }


}

const game = new EntryPoint();
game.startAppLoader();