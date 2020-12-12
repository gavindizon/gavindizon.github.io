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
        return "b";
      case 2:
        return "p";
    }
  return null;
}

function initiateSpecSearch() {
  randBtn.attribute("disabled", "");
  smartBtn.attribute("disabled", "");
  specBtn.attribute("disabled", "");

  idle = false;
  let scannedTiles = [null, null, null, null];
  let direction;
  let delayer = 0;
  let specialItem = false;
  addMove(`Scanning at (${currXPos + 1}, ${currYPos + 1})`);
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

    console.info("valid", validMoves);

    let evaluate = [0, 0, 0, 0];

    for (let i = 0; i < validMoves.length; i++) {
      evaluate[validMoves[i]] = 1;
      switch (scannedTiles[validMoves[i]]) {
        case "p": // pit
          evaluate[validMoves[i]] *= 2;
          break;
        case "b": // beacon
          evaluate[validMoves[i]] *= 4;
          break;
        case "g": // null
          evaluate[validMoves[i]] *= 5;
          break;
        default:
          evaluate[validMoves[i]] *= 3;
      }
    }

    let max = Math.max(...evaluate);
    let finalMoves = [];
    evaluate.forEach((item, index) =>
      item === max ? finalMoves.push(index) : null
    );

    if (finalMoves.length === 1) {
      direction = finalMoves[0];
    } else {
      //randomizer
      direction = finalMoves[Math.floor(Math.random() * finalMoves.length)];
    }
    //    console.info("evaluate:", evaluate);
    if (scannedTiles.includes("b")) {
      console.log("BEACON");
      direction = scannedTiles.indexOf("b");
      specialItem = true;
    }

    // or goal
    if (scannedTiles.includes("g")) {
      direction = scannedTiles.indexOf("g");
      specialItem = true;
    }

    rotateAgent(direction);
    grid[currYPos][currXPos].prev = direction;
  }, 1700);

  setTimeout(function () {
    moveSmart(direction);
    addMove(`Moved at (${currXPos + 1}, ${currYPos + 1})`);

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

  if (idle === false) {
    var specSearch = setInterval(function () {
      if (specialItem === true) {
        delayer = 1700;
      } else {
        delayer = 0;
        addMove(`Scanning at (${currXPos + 1}, ${currYPos + 1})`);
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

          console.info("valid", validMoves);

          let evaluate = [0, 0, 0, 0];

          for (let i = 0; i < validMoves.length; i++) {
            evaluate[validMoves[i]] = 1;
            switch (scannedTiles[validMoves[i]]) {
              case "p": // pit
                evaluate[validMoves[i]] *= 2;
                break;
              case "b": // beacon
                evaluate[validMoves[i]] *= 4;
                break;
              case "g": // null
                evaluate[validMoves[i]] *= 5;
                break;
              default:
                evaluate[validMoves[i]] *= 3;
            }
          }

          let max = Math.max(...evaluate);
          let finalMoves = [];
          evaluate.forEach((item, index) =>
            item === max ? finalMoves.push(index) : null
          );

          if (finalMoves.length === 1) {
            direction = finalMoves[0];
          } else {
            //randomizer
            direction =
              finalMoves[Math.floor(Math.random() * finalMoves.length)];
          }

          if (scannedTiles.includes("b")) {
            console.log("BEACON");
            direction = scannedTiles.indexOf("b");
            specialItem = true;
          }

          // or goal
          if (scannedTiles.includes("g")) {
            direction = scannedTiles.indexOf("g");
            specialItem = true;
          }

          console.info("evaluate:", evaluate);
          rotateAgent(direction);
          grid[currYPos][currXPos].prev = direction;
        }, 1700);
      }
      setTimeout(function () {
        moveSmart(direction);
        addMove(`Moved at (${currXPos + 1}, ${currYPos + 1})`);

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
      }, 1900 - delayer);
    }, 2000 - delayer);
  }
}
