import Phaser from "phaser";
import startButon from "../../assets/start.png";
import menuSceneBackgroundImage from "../../assets/aliens_screen_image2.jpg";
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });
    this.MenuSceneBackgroundImage = null;
    this.StartButon = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    this.load.image("menueSceneBackground", menuSceneBackgroundImage);
    this.load.image("startButton", startButon);
  }

  create(data) {
    this.MenuSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "menueSceneBackground"
    ).setScale(2.0).setOrigin(0,0)
    this.StartButon = this.add.sprite(
      1920 / 2,
      1080 / 2 ,
      "startButton"
    );
    this.StartButon.setInteractive({ useHandCursor: true });
    this.StartButon.on("pointerdown", () => this.clickButton());
  }

  update(time, delta) {}
  clickButton() {
    this.scene.start("gameScene");
  }
}

export default MenuScene;
