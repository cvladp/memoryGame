import * as PIXI from 'pixi.js';
import { LoaderPage } from './scenes/LoaderPage';
import { MainGame } from './scenes/MainGame';
import gsap from "gsap";
import { AssetsName } from './system/AssetsName';

class EntryPoint{
    private app: PIXI.Application;
    private loaderPage: LoaderPage;

    constructor(){
        this.app = new PIXI.Application({
            backgroundColor: 0x2980b9,
        });
   
        document.body.style.margin = '0';
        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';

        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (e) => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });

        document.body.appendChild(this.app.view);
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
        this.loaderPage.x = window.innerWidth/2 - this.loaderPage.width/2;
        this.loaderPage.y = window.innerHeight/2 - this.loaderPage.height/2;
        this.app.stage.addChild(this.loaderPage);
    }

    private onAssetsLoaded():void{
        gsap.delayedCall(3, ()=>{
            const mainStage = new MainGame(this.app);
            this.loaderPage.destroy;
            this.app.stage.removeChild(this.loaderPage);
            this.app.stage.addChild(mainStage);
        })
    }
}

const game = new EntryPoint();
game.startAppLoader();