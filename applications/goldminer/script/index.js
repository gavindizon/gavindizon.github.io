var button, coordButton, blindSearchBtn, randomSearchBtn, resetBtn;
var inputHeading,
  goalHeading,
  randomSearchHeading,
  blindSearchHeading,
  moveCountHeading,
  rotateCountHeading,
  tileHeading;
var moveCntText;
var newSize, newXGoal, newYGoal;
var moveBtn, randBtn, smartBtn, specBtn;
var grid, tempGrid, newGrid;
var idle = true;
var isBlindSearching = false;
var isRandomSearching = false;

var moveCnt = 0;
var rotateCnt = 0;
var currXPos = 0;
var currYPos = 0;

// DEFAULT NUMBER OF BOXES
var n = 8;
var goalX = 7;
var goalY = 7;
var placeX;
var placeY;

function preload() {
  boss = loadImage("https://i.imgur.com/1hykmft.png");
  primo = loadImage("https://i.imgur.com/OKnJZ2R.png");
  acquaint = loadImage("https://i.imgur.com/HBwgBXt.png");
}

function setup() {
  var cnv = createCanvas(1050, 1050);
  initBoard();
  initUserInput();
}

function draw() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      grid[i][j].update();
      //grid[i][j].label();
    }
  }

  noLoop();

  initSideMenu();
  noStroke();
  textFont("Arial");
  displayMoveset();
  text(moveCnt.toString(), moveCountHeading.x + 60, moveCountHeading.y + 33);
  text(
    rotateCnt.toString(),
    rotateCountHeading.x + 75,
    rotateCountHeading.y + 33
  );
}

function rotateAgent(direction) {
  /*
    left = 0
    up = 1
    right = 2
    down = 3
  */
  console.log(`direction [${currXPos}, ${currYPos}]`);
  grid[currYPos][currXPos].prev = direction;
}

// setInterval(function () {
//   console.log(grid);
// }, 5000);

function onGoal() {
  if (grid[currYPos][currXPos].type === 0) {
    addMove(`Goal found!`);
    return true;
  }
  return false;
}

function onPit() {
  if (grid[currYPos][currXPos].type === 2) {
    addMove(`Pit encountered at(${currXPos + 1}, ${currYPos + 1})`);
    return true;
  }
  return false;
}

function onBeacon() {
  if (grid[currYPos][currXPos].type === 1) {
    addMove(`Beacon found!`);
    return true;
  }
  return false;
}
