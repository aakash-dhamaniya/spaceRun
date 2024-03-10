import React, { useEffect } from "react";
import Phaser from "phaser";

import GamePlayScene from "./scenes/GamePlayScene";

function Game() {
  useEffect(() => {
    // Set up Phaser configuration
    let config = {
      type: Phaser.AUTO,
      backgroundColor: 0x222222,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "mainScreen",
        width: 320,
        height: 480,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 0,
          },
        },
      },
    };

    // Create Phaser game instance
    const game = new Phaser.Game(config);

    // Add and start game scene
    game.scene.add("gamePlayScene", GamePlayScene);
    game.scene.start("gamePlayScene");

    // Clean up function
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="mainScreen" style={{ width: "320px", height: "480px" }} />;
}

export default Game;