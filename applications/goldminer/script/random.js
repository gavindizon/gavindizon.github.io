function initiateRandomSearch() {
  idle = false;
  draw();
  //console.log(grid);
  var randomSearch = setInterval(function () {
    //remove player from the current spot

    if (onPit() || onGoal()) {
      idle = true;
    }
    if (idle == false) {
      grid[currYPos][currXPos].player = false;
      //Left Up Right Down
      let xMovement = [-1, 0, 1, 0];
      let yMovement = [0, -1, 0, 1];

      let validMoves = [];
      //LEFT
      if (grid[currYPos][currXPos].movement[0] !== null) validMoves.push(0);
      //UP
      if (grid[currYPos][currXPos].movement[1] !== null) validMoves.push(1);
      //RIGHT
      if (grid[currYPos][currXPos].movement[2] !== null) validMoves.push(2);
      //DOWN
      if (grid[currYPos][currXPos].movement[3] !== null) validMoves.push(3);
      //console.info(validMoves);
      let randomizer = Math.floor(Math.random() * validMoves.length);
      let randMovement = validMoves[randomizer];
      console.log(moveCnt);
      moveCnt++;
      grid[currYPos][currXPos].visited = true;

      rotateAgent(randMovement);

      //  console.info(currXPos, currYPos);

      currXPos += xMovement[randMovement];
      currYPos += yMovement[randMovement];
      grid[currYPos][currXPos].player = true;

      rotateAgent(randMovement);
      addMove(`Moved at (${currXPos + 1}, ${currYPos + 1})`);
    }

    if (onGoal() || onPit()) idle = true;
    if (idle === true) {
      console.log("terminated");
      clearInterval(randomSearch);
    }

    clear();

    draw();
  }, 900);
}
