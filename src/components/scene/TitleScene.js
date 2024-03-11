import Phaser from "phaser";
import titleSceneBackgroundImage from "../../assets/aliens_screen_image.jpg";
import MenuScene from "./MenuScene";
class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });
    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
    this.titleSceneTextStyle = {
      font: "200px Times",
      fill: "#fde4b9",
      align: "center",
    };
  }
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("init");
  }
  preload() {
    console.log("Title scene");
    this.load.image("titleSceneBackground", titleSceneBackgroundImage);
  }
  create(data) {
    console.log("create");
    this.titleSceneBackgroundImage = this.add
      .sprite(
        window.innerWidth / 2,
        window.innerHeight / 2,
        "titleSceneBackground"
      )
      .setScale(2.75);
    this.titleSceneText = this.add
      .text(
        window.innerWidth / 2,
        window.innerHeight / 2 + 200,
        "Space Aliens",
        this.titleSceneTextStyle
      )
      .setOrigin(0.5);
  }
  update(time, delta) {
    if(time>6){
      this.scene.switch('menuScene')
    }
  }
}
export default TitleScene;
