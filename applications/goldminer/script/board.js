function initBoard() {
  size = floor(800 / n);
  grid = Create2DArray(n);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((i === 0) & (j === 0)) grid[i][j] = new Tile(j, i, size, true, 3);
      else grid[i][j] = new Tile(j, i, size, false, 3);
    }
  }
  initializeRelation();
  //tempGrid = [...grid];
  console.log(grid);
}

function initializeRelation() {
  // LEFT UP RIGHT DOWN
  let xMovement = [-1, 0, 1, 0];
  let yMovement = [0, -1, 0, 1];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      //console.log(`[${i}], [${j}]`);
      for (k = 0; k < 4; k++) {
        let currX = j + xMovement[k];
        let currY = i + yMovement[k];

        if (currX >= 0 && currX < n && currY >= 0 && currY < n) {
          grid[i][j].movement[k] = grid[currY][currX];
        }
      }
    }
  }
}
