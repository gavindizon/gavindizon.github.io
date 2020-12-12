/*
  types           number        
  regular path    3             
  beacon          1             
  pit             2            
  gold            0             
*/

class Tile {
  constructor(x, y, size, player, type) {
    this.type = type;
    this.player = player;
    this.x = x * size;
    this.y = y * size;
    this.size = size;
    this.scanning = false;
    this.visited = false;
    this.prev = 2;
    this.movement = [null, null, null, null];
  }

  setType(value) {
    this.type = value;
    stroke(255);
    switch (this.type) {
      case 0:
        console.log ("Placing a goal tile...");
        fill(color("green"));
        image(acquaint, this.x, this.y, this.size, this.size);
        break;
      case 1:
        console.log ("Placing a beacon tile...");
        fill(color("#36FF00"));
        image(boss, this.x, this.y, this.size, this.size);
        break;
      case 2:
        console.log ("Placing a pit tile...");
        fill(color("#FF0000"));
        image(primo, this.x, this.y, this.size, this.size);
        break;
      default:
        console.log ("Placing a regular tile...");
        fill(color("#161616"));
        this.type = 3;
    }
    rect(this.x, this.y, this.size, this.size);
    switch (this.type) {
      case 0:
        image(acquaint, this.x, this.y, this.size, this.size);
        break;
      case 1:
        image(primo, this.x, this.y, this.size, this.size);
        break;
      case 2:
        image(boss, this.x, this.y, this.size, this.size);
        break;
      default:
        break;
    }

    if (this.visited === true) {
      fill(color("rgba(105, 105, 105, 0.7)"));
      rect(this.x, this.y, this.size, this.size);
    }

    if (this.player === true) {
      fill(color("#ADD8E6"));
      //LEFT
      switch (this.prev) {
        case 0:
          triangle(
            this.x + 1,
            this.y + size / 2,
            this.x + size - 1,
            this.y + 1,
            this.x + size - 1,
            this.y + size - 1
          );
          break;
        case 1:
          triangle(
            this.x + size / 2,
            this.y + 1,
            this.x + size - 1,
            this.y + size - 1,
            this.x + 1,
            this.y + size - 1
          );
          break;
        case 2:
          triangle(
            this.x + 1,
            this.y + 1,
            this.x + size - 1,
            this.y + size / 2,
            this.x + 1,
            this.y + size - 1
          );
          break;
        case 3:
          triangle(
            this.x + 1,
            this.y + 1,
            this.x + size - 1,
            this.y + 1,
            this.x + size / 2,
            this.y + size - 1
          );
          break;
      }
    }
  }

  update() {
    stroke(255);
    strokeWeight (1);
    switch (this.type) {
      case 0:
        fill(color("green"));
        break;
      case 1:
        fill(color("#36FF00"));
        break;
      case 2:
        fill(color("#FF0000"));
        break;
      default:
        fill(color("#161616"));
        this.type = 3;
    }
    rect(this.x, this.y, this.size, this.size);
    noStroke();

    switch (this.type) {
      case 0:
        image(acquaint, this.x, this.y, this.size, this.size);
        break;
      case 1:
        image(primo, this.x, this.y, this.size, this.size);
        break;
      case 2:
        image(boss, this.x, this.y, this.size, this.size);
        break;
      default:
        break;
    }

    if (this.visited === true) {
      fill(color("rgba(105, 105, 105, 0.7)"));
      rect(this.x, this.y, this.size, this.size);
    }
    if (this.scanning === true) {
      fill(color("rgba(0, 0, 255, 0.8)"));
      ellipse(
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        this.size / 2
      );
    }

    if (this.player === true) {
      fill(color("#ADD8E6"));
      //LEFT
      switch (this.prev) {
        case 0:
          triangle(
            this.x + 1,
            this.y + size / 2,
            this.x + size - 1,
            this.y + 1,
            this.x + size - 1,
            this.y + size - 1
          );
          break;
        case 1:
          triangle(
            this.x + size / 2,
            this.y + 1,
            this.x + size - 1,
            this.y + size - 1,
            this.x + 1,
            this.y + size - 1
          );
          break;
        case 2:
          triangle(
            this.x + 1,
            this.y + 1,
            this.x + size - 1,
            this.y + size / 2,
            this.x + 1,
            this.y + size - 1
          );
          break;
        case 3:
          triangle(
            this.x + 1,
            this.y + 1,
            this.x + size - 1,
            this.y + 1,
            this.x + size / 2,
            this.y + size - 1
          );
          break;
      }
    }
  }

  tileClicked(px, py, i, j, type) {
    var d = dist(mouseX, mouseY, this.x + size / 2, this.y + size / 2);

    if (d < size / 2) {
      place(i, j, type);
      console.info("Test", grid);
    }
  }
}
