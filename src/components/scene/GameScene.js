import Phaser from "phaser";
import backgroundStar from "../../assets/starBackground.png";
import ship from "../../assets/ship.png";
import missile from "../../assets/missile.png";
import laserSound from "../../assets/laser1.wav";
import enimyShip from "../../assets/ufo.png";
import alienExplode from "../../assets/barrelExploding.wav";
import bomb from "../../assets/bomb.wav";

class GameScene extends Phaser.Scene {
  // create an alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1; // this will get a number between 1 and 1920
    let alienXVelocity = Math.floor(Math.random() * 50) + 1; // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, "alien");
    // anAlien.body.setImmovable(true)

    anAlien.body.velocity.y = 200;
    anAlien.body.velocity.x = alienXVelocity;
    this.alienGroup.add(anAlien);
  }
  constructor() {
    super({ key: "gameScene" });
    this.background = null;
    this.ship = null;
    this.fireMissile = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    };
    this.gameOverText = null;
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    };
  }
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }
  preload() {
    console.log("Game Scene");
    // images
    this.load.image("starBackground", backgroundStar);
    this.load.image("ship", ship);
    this.load.image("missile", missile);
    this.load.image("alien", enimyShip);
    // sound
    this.load.audio("laser", laserSound);
    this.load.audio("explosion", alienExplode);
    this.load.audio("bomb", bomb);
  }
  create(data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0);
    this.background.setOrigin(0, 0);
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship");
    this.scoreText = this.add.text(
      10,
      10,
      "Score:" + this.score.toString(),
      this.scoreTextStyle
    );
    // create a group for the missiles
    this.missileGroup = this.physics.add.group();
    // create a group for the aliens
    this.alienGroup = this.add.group();
    this.createAlien();
    //for game enimy and missile
    this.physics.add.overlap(
      this.missileGroup,
      this.alienGroup,
      function (missile, alien) {
        this.sound.play("explosion");
        alien.destroy();
        missile.destroy();
        this.score += 1;
        this.scoreText.setText("Score: " + this.score.toString());
        this.createAlien();
        this.createAlien();
      }.bind(this)
    );
    //for ship and enimy
    this.physics.add.collider(
      this.ship,
      this.alienGroup,
      function (shipCollide, allienCollide) {
        this.sound.play("bomb");
        shipCollide.destroy();
        allienCollide.destroy();
        this.physics.pause();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );
  }

  update(time, delta) {
    // called 60 times a second, hopefully!
    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }
    if (keyRightObj.isDown === true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add.sprite(
          this.ship.x,
          this.ship.y,
          "missile"
        );
        this.missileGroup.add(aNewMissile);
        this.sound.play("laser");
      }
    }
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false;
    }
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}
export default GameScene;
