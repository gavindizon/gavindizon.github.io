Number.prototype.between = function (a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};

function initSideMenu() {
  fill("#101010");
  strokeWeight(4);
  stroke(255);
  rect(810, 2, 230, 796);

  strokeWeight(4);
  stroke(255);

  strokeWeight(4);
  stroke(255);
  line(810, 85, 1040, 85);
  line(810, 115, 1040, 115);
  line(810, 213.5, 1040, 213.5);
  line(810, 442, 1040, 442); //above moves
  line(810, 512, 1040, 512); //below rotation
  line(810, 549, 1040, 549);

  strokeWeight(2);
  stroke(20);
  textFont("Georgia");
  textSize(24);
  fill("#FFF");
  text("- LEGEND - ", 857, 242);
  text("MOVE LOG", 860, 540);
  image(acquaint, 825, 257, 35, 35);
  image(primo, 825, 302, 35, 35);
  image(boss, 825, 347, 35, 35);
  stroke(255);
  fill("#101010");
  rect(825, 392, 35, 35);

  textSize(22);
  strokeWeight(1);
  fill("#FFF");
  tileHeading = createElement("h4", "Tile Placer:");
  tileHeading.position(820, 70);
  text(" -   Goal Tile", 870, 279);
  text(" -   Beacon Tile", 870, 324);
  text(" -   Pit Tile", 870, 369);
  text(" -   Regular Tile", 870, 414);

  strokeWeight(2);
  stroke(255);
  stroke(0);
  textSize(12);
  displayMoveset();
}

function initUserInput() {
  //text properties

  textFont("Arial");
  resetBtn = createButton("RESET");
  resetBtn.position(985, 5);
  resetBtn.mousePressed(reset);
  resetBtn.addClass("btn-1");

  //Smart
  smartBtn = createButton("SMART");
  smartBtn.position(815, 5);
  smartBtn.mousePressed(initiateSmartSearch);
  smartBtn.addClass("btn-1");
  smartBtn.attribute("disabled", "");

  specBtn = createButton("STOCH");
  specBtn.position(867.5, 5);
  specBtn.mousePressed(initiateSpecSearch);
  specBtn.addClass("btn-1");
  specBtn.attribute("disabled", "");

  //Random Button
  randBtn = createButton("RANDOM");
  randBtn.position(920, 5);
  randBtn.mousePressed(initiateRandomSearch);
  randBtn.addClass("btn-1");
  randBtn.attribute("disabled", "");

  //Move Count Heading
  moveCountHeading = createElement("h5", "Moves:");
  moveCountHeading.position(820, 432);
  //Rotate Count Heading
  rotateCountHeading = createElement("h5", "Rotations:");
  rotateCountHeading.position(820, 462);

  textSize(24);
  //  text(moveCnt.toString(), moveCountHeading.x, moveCountHeading.y + 36);

  //Input Heading
  inputHeading = createElement("h5", "Box per row/ col:");
  inputHeading.position(815, 35);

  // Input
  newSize = createInput(8);
  newSize.position(937.5, 52.5);
  newSize.size(20, 20);

  // Change Button
  button = createButton("Change");
  button.position(newSize.x + newSize.width + 2.5, newSize.y);
  button.mousePressed(changeRow);

  radio = createRadio();
  radio.option("Goal Tile");
  radio.option("Pit Tile");
  radio.option("Beacon");
  radio.option("Reg. Tile");
  console.log(radio);
  radio.style("width", "86px");
  radio.position(815, button.y + button.width / 2 + 32.5);
}

function changeRow() {
  clear();
  n = parseInt(newSize.value());
  goalX = n - 1;
  goalY = n - 1;

  initBoard();
  draw();
}

function reset() {
  grid[currYPos][currXPos].visited = false;
  currYPos = 0;
  currXPos = 0;
  grid[currYPos][currXPos].player = true;
  grid[currYPos][currXPos].prev = 2;
  idle = true;
  goalX = n - 1;
  goalY = n - 1;
  moveCnt = 0;
  rotateCnt = 0;
  if (findGoal()[2] === 1) {
    console.log("REMOVEEE");
    randBtn.removeAttribute("disabled");
    smartBtn.removeAttribute("disabled");
    specBtn.removeAttribute("disabled");
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].visited = false;
      if (i !== 0 && j !== 0) grid[i][j].player = false;
    }
  }
  clear();
  draw();
}

function findBeacon() {
  for (var i = 0; i < n; i++)
    for (var j = 0; j < n; j++) if (grid[i][j].type == 1) return 1;

  return 0;
}

function findGoal() {
  //return an array with the x, y values of the
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j].type == 0) {
        return [i, j, 1];
      }
    }
  }
  return [undefined, undefined, 0];
}

function place(i, j, type) {
  var goalCoords;
  stroke(255);
  strokeWeight(1);
  switch (type) {
    case "Goal Tile":
      goalCoords = findGoal();
      if (
        goalCoords[0] != undefined &&
        goalCoords[1] != undefined &&
        goalCoords[2] == 1
      ) {
        grid[goalCoords[0]][goalCoords[1]].setType(3);
      } else {
        console.log("Goal set!");
        randBtn.removeAttribute("disabled");
        smartBtn.removeAttribute("disabled");
        specBtn.removeAttribute("disabled");
      }
      grid[i][j].setType(0);
      break;
    case "Beacon":
      grid[i][j].setType(1);
      if (findGoal()[2] === 0) {
        randBtn.attribute("disabled", "");
        smartBtn.attribute("disabled", "");
        specBtn.attribute("disabled", "");
      }
      break;
    case "Pit Tile":
      grid[i][j].setType(2);

      if (findGoal()[2] === 0) {
        randBtn.attribute("disabled", "");
        smartBtn.attribute("disabled", "");
        specBtn.attribute("disabled", "");
      }
      break;
    case "Reg. Tile":
      if (grid[i][j].type === 0) {
        goalCoords = findGoal();
        if (findBeacon() === 1 && goalCoords[2] === 1)
          console.log("Cannot remove goal while beacon is connected!");
        else {
          randBtn.attribute("disabled", "");
          smartBtn.attribute("disabled", "");
          specBtn.attribute("disabled", "");
          grid[i][j].setType(3);
        }
      } else grid[i][j].setType(3);
      break;
    default:
      break;
  }
}

function mouseClicked() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].tileClicked(mouseX, mouseY, i, j, String(radio.value()));
    }
  }
}
