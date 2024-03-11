import Phaser from "phaser";
import splashSceneImage from "../../assets/splashSceneImage.png";

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("init");
  }

  preload() {
    console.log("Splash scene");
    this.load.image("splashSceneBackground", splashSceneImage);
  }

  create(data) {
    console.log("create");
    this.splashSceneBackgroundImage = this.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "splashSceneBackground"
    );

    // Calculate the desired width
    const desiredWidth = 500; // Change this to your desired width

    // Scale the sprite to fit the desired width
    const scaleFactor = desiredWidth / this.splashSceneBackgroundImage.width;
    this.splashSceneBackgroundImage.setScale(scaleFactor);
  }

  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene");
    }
  }
}

export default SplashScene;
