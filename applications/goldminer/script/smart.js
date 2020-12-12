var points = 0;
var unvisitedExists = [0, 0, 0, 0];
var scannedDistances = [0, 0, 0, 0];
var xMoves = [];
var yMoves = [];

function scanFront(direction) {
  let tile = grid[currYPos][currXPos];
  points = 0;
  let scannedDistance = 0;
  while (tile.movement[direction] !== null) {
    if (
      tile.movement[direction].type === 2 ||
      tile.movement[direction].type === 1 ||
      tile.movement[direction].type === 0
    )
      break;
    scannedDistance++;
    tile = tile.movement[direction];
    tile.scanning = true;
    if (tile.visited === false) {
      points += 900;
      unvisitedExists[direction] = 1;
    } else points -= 900;
  }
  scannedDistances[direction] = scannedDistance + 1;
  if (tile.movement[direction] !== null)
    switch (tile.movement[direction].type) {
      case 0:
        points += 1000000;
        return "g";
      case 1:
        points += 10000;
        return "b";
      case 2:
        points += -5000;
        return "p";
    }
  if (scannedDistance === 0 && tile.movement[direction] === null) {
    points -= 1000000;
    return null;
  }
  if (
    scannedDistance === 0 &&
    tile.movement[direction] !== null &&
    tile.movement[direction] !== 2
  ) {
    points -= 900000;
    return "p";
  }
  points -= 2500;
  return null;
}

/*
  GOAL = 1000000 
  BEACON  = 10000
  NORMAL PATH = 100
  VISITED = -900
  PIT = -10000
*/

function descan() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].scanning = false;
    }
  }
}
function backtrack() {
  let previous = 0;
  console.log("BACKTRACKING");
  //USED FOR BACKTRACKING

  grid[currYPos][currXPos].visited = true;
  grid[currYPos][currXPos].player = false;

  //console.log(previous);
  currXPos = xMoves.pop();
  currYPos = yMoves.pop();

  switch (grid[currYPos][currXPos].prev) {
    case 0: //left (from right)
      previous = 2;
      break;
    case 1: //up (from down)
      previous = 3;
      break;
    case 2: //right(from left)
      previous = 0;
      break;
    case 3: // down (from up)
      previous = 1;
      break;
    default:
      previous = -1;
  }
  moveCnt++;
  rotateAgent(previous);
  console.log(
    "[BACKTRACKING] currYPos = " + currYPos + " || currXPos = " + currXPos
  );
  if (currXPos < 0 || currXPos >= n || currYPos < 0 || currYPos >= n) return -1;
  else grid[currYPos][currXPos].player = true;
}

function moveSmart(direction) {
  let xMovement = [-1, 0, 1, 0];
  let yMovement = [0, -1, 0, 1];

  grid[currYPos][currXPos].visited = true;

  xMoves.push(currXPos);
  yMoves.push(currYPos);
  grid[currYPos][currXPos].player = false;

  currXPos += xMovement[direction];
  currYPos += yMovement[direction];
  //      console.info(currXPos, currYPos);

  moveCnt++;

  rotateAgent(direction);
  console.info("PREVIOUS", grid[currYPos][currXPos].prev);
  grid[currYPos][currXPos].player = true;
}
function initiateSmartSearch() {
  idle = false;
  let movesWorth = [0, 0, 0, 0];
  let scannedTiles = [0, 0, 0, 0];
  scannedDistances = [0, 0, 0, 0];
  unvisitedExists = [0, 0, 0, 0];
  let specialItem = false;
  let direction;
  let ogPrevious = -1;
  let delayer = 0;
  randBtn.attribute("disabled", "");
  smartBtn.attribute("disabled", "");
  specBtn.attribute("disabled", "");

  if (onPit() || onGoal()) {
    idle = true;
    draw();
  } else {
    addMove(`Scanning at (${currXPos + 1}, ${currYPos + 1})`);
    for (let i = 2; i < 6; i++) {
      ogPrevious = grid[currYPos][currXPos].prev;
      setTimeout(function () {
        descan();
        rotateCnt++;
        rotateAgent(i % 4);
        scannedTiles[i % 4] = scanFront(i % 4);
        console.log(scannedTiles);
        movesWorth[i % 4] = points;
        clear();
        draw();
      }, (i - 1) * 300);
      //1600 1.6s
    }
    //SCAN PROCESSING
    setTimeout(function () {
      descan();

      direction = movesWorth.indexOf(Math.max(...movesWorth));
      let compute = unvisitedExists.reduce((a, b) => a + b, 0);
      if (compute === 1)
        direction = unvisitedExists.indexOf(Math.max(...unvisitedExists));
      else if (compute >= 2 && compute <= 3) {
        unvisitedExists.map((item, index) => {
          if (item === 1) movesWorth[index] += 10000;
          else movesWorth[index] -= 100000;
        });
        direction = movesWorth.indexOf(Math.max(...movesWorth));

        //if encounters beacon
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

      rotateAgent(direction);
      grid[currYPos][currXPos].prev = ogPrevious;
    }, 1300);

    setTimeout(function () {
      if (unvisitedExists.reduce((a, b) => a + b, 0) === 0) {
        //backtrack
        //   idle = true;
        console.log("currYPos = " + currYPos + " || currXPos = " + currXPos);
        if (currYPos === 0 && currXPos === 0) {
          addMove(`No Solution`);
          idle = true;
        } else {
          if (backtrack() === -1) {
            addMove(`No Solution`);
            idle = true;
          }
        }
      } else {
        //normalmove
        moveSmart(direction);
        addMove(`Moved at (${currXPos + 1}, ${currYPos + 1})`);
      }

      if (onBeacon()) {
        specialItem = false;
      }
      if (onGoal() || onPit()) {
        idle = true;
      }

      if (idle === true) {
        console.log("terminated");
        clearInterval(smartSearch);
      }
      clear();
      draw();
    }, 1500 - delayer);

    draw();

    var smartSearch = setInterval(function () {
      movesWorth = [0, 0, 0, 0];
      scannedTiles = [0, 0, 0, 0];
      scannedDistances = [0, 0, 0, 0];
      unvisitedExists = [0, 0, 0, 0];
      delayer = 0;

      if (specialItem === true) {
        delayer = 1200;
        unvisitedExists[direction] = 1;
      } else {
        addMove(`Scanning at (${currXPos + 1}, ${currYPos + 1})`);

        for (let i = 2; i < 6; i++) {
          ogPrevious = grid[currYPos][currXPos].prev;
          setTimeout(function () {
            descan();
            rotateCnt++;
            rotateAgent(i % 4);
            scannedTiles[i % 4] = scanFront(i % 4);
            console.log(scannedTiles);
            movesWorth[i % 4] = points;
            clear();
            draw();
          }, (i - 1) * 300);
          //1600 1.6s
          //1200
        }
        //SCAN PROCESSING
        setTimeout(function () {
          descan();

          direction = movesWorth.indexOf(Math.max(...movesWorth));
          let compute = unvisitedExists.reduce((a, b) => a + b, 0);
          if (compute === 1)
            direction = unvisitedExists.indexOf(Math.max(...unvisitedExists));
          else if (compute >= 2 && compute <= 3) {
            unvisitedExists.map((item, index) => {
              if (item === 1) movesWorth[index] += 10000;
              else movesWorth[index] -= 100000;
            });
            direction = movesWorth.indexOf(Math.max(...movesWorth));

            //if encounters beacon
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

          rotateAgent(direction);
          grid[currYPos][currXPos].prev = ogPrevious;
        }, 1300);
      }

      //REGULAR MOVE
      setTimeout(function () {
        if (unvisitedExists.reduce((a, b) => a + b, 0) === 0) {
          //backtrack
          //   idle = true;
          console.log("currYPos = " + currYPos + " || currXPos = " + currXPos);
          if (currYPos === 0 && currXPos === 0) {
            addMove(`No Solution`);

            idle = true;
          } else {
            if (backtrack() === -1) {
              addMove(`No Solution`);
              idle = true;
            }
          }
        } else {
          //normalmove
          moveSmart(direction);
          addMove(`Moved at (${currXPos + 1}, ${currYPos + 1})`);
        }

        if (onBeacon()) {
          specialItem = false;
        }
        if (onGoal() || onPit()) {
          idle = true;
        }

        if (idle === true) {
          console.log("terminated");
          clearInterval(smartSearch);
        }
        clear();
        draw();
      }, 1400 - delayer);
    }, 1500 - delayer);
  }
}
