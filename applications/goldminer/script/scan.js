function scan(direction) {
  let tile = grid[currYPos][currXPos];
  while (tile.movement[direction] !== null) {
    if (
      tile.movement[direction].type === 2 ||
      tile.movement[direction].type === 1 ||
      tile.movement[direction].type === 0
    )
      break;
    tile = tile.movement[direction];
    tile.scanning = true;
  }
  if (tile.movement[direction] !== null)
    switch (tile.movement[direction].type) {
      case 0:
        return "g";
      case 1:
        return "p";
      case 2:
        return "b";
    }
  return null;
}

function initiateSpecSearch() {
  idle = false;
  let scannedTiles = [null, null, null, null];
  let direction;

  if (onPit() || onGoal()) {
    idle = true;
    draw();
  } else {
    for (let i = 2; i < 6; i++) {
      setTimeout(function () {
        descan();
        rotateCnt++;
        rotateAgent(i % 4);
        scannedTiles[i % 4] = scan(i % 4);
        console.log(scannedTiles);

        clear();
        draw();
      }, (i - 1) * 400);
    }
    setTimeout(function () {
      descan();
      addMove("Scanned board");
      let validMoves = [];
      //LEFT
      if (grid[currYPos][currXPos].movement[0] !== null) validMoves.push(0);
      //UP
      if (grid[currYPos][currXPos].movement[1] !== null) validMoves.push(1);
      //RIGHT
      if (grid[currYPos][currXPos].movement[2] !== null) validMoves.push(2);
      //DOWN
      if (grid[currYPos][currXPos].movement[3] !== null) validMoves.push(3);

      //GOAL FIRST
      if (scannedTiles.includes("g")) {
        direction = scannedTiles.indexOf("g");
      } else if (scannedTiles.includes("b")) {
        direction = scannedTiles.indexOf("g");
      } else {
        if (
          scannedTiles.includes(null) &&
          validMoves.includes(scannedTiles.indexOf(null))
        ) {
          direction = validMoves.indexOf(null);
        } else {
          direction = scannedTiles.indexOf("p");
        }
      }
      rotateAgent(direction);
      grid[currYPos][currXPos].prev = direction;
    }, 1700);

    setTimeout(function () {
      moveSmart(direction);
      if (onBeacon()) {
        specialItem = false;
      }
      if (onGoal() || onPit()) {
        idle = true;
      }

      if (idle === true) {
        console.log("terminated");
      }
      clear();
      draw();
    }, 1900);
  }

  if (idle === false) {
    var specSearch = setInterval(function () {
      for (let i = 2; i < 6; i++) {
        setTimeout(function () {
          descan();
          rotateCnt++;
          rotateAgent(i % 4);
          scannedTiles[i % 4] = scan(i % 4);
          console.log(scannedTiles);

          clear();
          draw();
        }, (i - 1) * 400);
      }
      setTimeout(function () {
        descan();

        let validMoves = [];
        //LEFT
        if (grid[currYPos][currXPos].movement[0] !== null) validMoves.push(0);
        //UP
        if (grid[currYPos][currXPos].movement[1] !== null) validMoves.push(1);
        //RIGHT
        if (grid[currYPos][currXPos].movement[2] !== null) validMoves.push(2);
        //DOWN
        if (grid[currYPos][currXPos].movement[3] !== null) validMoves.push(3);

        //GOAL FIRST
        if (scannedTiles.includes("g")) {
          direction = scannedTiles.indexOf("g");
        } else if (scannedTiles.includes("b")) {
          direction = scannedTiles.indexOf("g");
        } else {
          if (
            scannedTiles.includes(null) &&
            validMoves.contains(scannedTiles.indexOf(null))
          ) {
            direction = scannedTiles.indexOf(null);
          } else {
            direction = scannedTiles.indexOf("p");
          }
        }
        rotateAgent(direction);
        grid[currYPos][currXPos].prev = direction;
      }, 1700);

      setTimeout(function () {
        moveSmart(direction);
        if (onBeacon()) {
          specialItem = false;
        }
        if (onGoal() || onPit()) {
          idle = true;
        }

        if (idle === true) {
          console.log("terminated");
          clearInterval(specSearch);
        }
        clear();
        draw();
      }, 1900);
    }, 2000);
  }
}
