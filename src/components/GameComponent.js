import React, { useEffect } from "react";
import Phaser from "phaser";
import SplashScene from "./scene/splashScene";
import TitleScene from "./scene/TitleScene";
import MenuScene from "./scene/MenuScene";
import GameScene from "./scene/GameScene";

const GameComponent = () => {
  useEffect(() => {
    const splashScene = new SplashScene();
    const titleScene = new TitleScene();
    const menueScene = new MenuScene();
    const gameScene = new GameScene();
    const config = {
      type: Phaser.AUTO,
      parent: "game-container",
      width: 1920,
      height: 1080,
      backgroundColor: 0xffffff,
      scale: {
        mode: Phaser.Scale.FIT,
        // we place it in the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };
    const game = new Phaser.Game(config);
    // load scenes
    game.scene.add("splashScene", splashScene);
    // start title
    game.scene.start("splashScene");
    // for titlleScene
    game.scene.add("tileScene", titleScene);
    //menueScene
    game.scene.add("menuScene", menueScene);
    //GameScene
    game.scene.add("gameScene", gameScene);
    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="game-container" />;
};
export default GameComponent;
