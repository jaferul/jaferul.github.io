// Fixed game resolution shared by all pages; the canvas is scaled to the window with CSS
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

function collision({ object1, object2 }) {
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y <= object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  }
  
  function platformCollision({ object1, object2 }) {

    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y + object1.height <=
        object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    )
  }