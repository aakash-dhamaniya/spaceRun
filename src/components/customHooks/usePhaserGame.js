import { useEffect, useRef } from "react";
import Phaser from "phaser";

function usePhaserGame(config) {
  const PhaserContainerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!PhaserContainerRef.current) return;

    // Create the Phaser game instance
    gameRef.current = new Phaser.Game({
      ...config,
      parent: PhaserContainerRef.current,
    });

    // Log the Phaser game instance (should be available asynchronously)
    console.log("Game created:", gameRef.current);

    return () => {
      // Ensure proper spelling: destroy
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [config]);

  // Log the Phaser game instance (might be null during the initial render)
  console.log("Game ref:", gameRef.current);

  return gameRef.current;
}

export default usePhaserGame;
