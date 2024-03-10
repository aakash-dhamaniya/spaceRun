import Phaser from "phaser";
import barrier from "../../assets/barrier.png";
import ship from "../../assets/ship.png";
import background from "../../assets/background.png"
let gameOptions = {
  shipHorizontalSpeed: 400, // ship horizontal speed, can be modified to change gameplay
  barrierSpeed: 100, // barrier vertical speed, can be modified to change gameplay
  barrierGap: 150, // gap between two barriers, in pixels
  safeZones: 5, // amount of possible safe zone. It affects safe zone width
};
class GameScene extends Phaser.Scene {
  //functions
  moveShip(p) {
    console.log(p.x);
    let speedMultipler = p.x < this.game.config.width / 2 ? -1 : 1;
    this.ship.body.velocity.x =
      gameOptions.shipHorizontalSpeed * speedMultipler;
  }
  stopShip() {
    this.ship.body.velocity.x = 0;
  }
  addBarries() {
    this.horizontalBarrierGroup = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      this.horizontalBarrierPool = [
        this.horizontalBarrierGroup.create(0, 0, "barrier").setScale(0.6,0.5),
        this.horizontalBarrierGroup.create(0, 0, "barrier").setScale(0.6,0.5),
      ];
      this.placeHorizontalBarriers();
    }
    // console.log(this.horizontalBarrierPool);
    this.horizontalBarrierGroup.setVelocityY(gameOptions.barrierSpeed);
  }
  getTopmostBarrier() {
    let topmostBarrier = this.game.config.height;
    this.horizontalBarrierGroup.getChildren().forEach(function (barrier) {
      topmostBarrier = Math.min(topmostBarrier, barrier.y);
    });

    return topmostBarrier;
  }
  placeHorizontalBarriers() {
    let topmost = this.getTopmostBarrier();
    let holePosition = Phaser.Math.Between(0, gameOptions.safeZones - 1);
    
    this.horizontalBarrierPool[0].x =
      (holePosition * this.game.config.width) / gameOptions.safeZones;
    this.horizontalBarrierPool[0].y = topmost - gameOptions.barrierGap;
    this.horizontalBarrierPool[0].setOrigin(1, 0);
    
    this.horizontalBarrierPool[1].x =
      ((holePosition + 1) * this.game.config.width) / gameOptions.safeZones;
    this.horizontalBarrierPool[1].y = topmost - gameOptions.barrierGap;
    this.horizontalBarrierPool[1].setOrigin(0, 0);
    this.horizontalBarrierPool = [];
  }
  constructor() {
    super({ key: "gamePlayScene" });
    this.background=null
  }
  //   init(data) {
  //     this.cameras.main.setBackgroundColor("#ffffff");
  //   }z
  preload() {
    this.load.image("ship", ship);
    this.load.image("barrier", barrier);
    this.load.image("background",background)
  }
  create(data) {
    this.background=this.add.image(0,0,"background")
    console.log(this.game.config);
    this.ship = this.physics.add.sprite(
      this.game.config.width / 2,
      (this.game.config.height / 5) * 4,
      "ship"
    );
    this.ship.setScale(0.6,0.6)
   
  
    this.input.on("pointerdown", this.moveShip, this);
    this.input.on("pointerup", this.stopShip, this);
    this.addBarries();
  }

  update(time, delta) {
    this.ship.x = Phaser.Math.Wrap(this.ship.x, 0, this.game.config.width);
    this.physics.world.collide(this.ship,this.horizontalBarrierGroup,function(){
      console.log("touch hua");
      this.scene.start("gamePlayScene")
    },null,this)
    this.horizontalBarrierGroup.getChildren().forEach(function (barrier) {
      if (barrier.y > this.game.config.height) {
        this.horizontalBarrierPool.push(barrier);
        if (this.horizontalBarrierPool.length === 2) {
          this.placeHorizontalBarriers();
        }
      }
    }, this);
  }
}
export default GameScene;