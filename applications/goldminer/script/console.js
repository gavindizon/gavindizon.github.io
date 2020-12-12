var moveset = ["", "", "", "", "", "", "", "", ""];

function addMove(newText) {
  moveset[0] = moveset[1];
  moveset[1] = moveset[2];
  moveset[2] = moveset[3];
  moveset[3] = moveset[4];
  moveset[4] = moveset[5];
  moveset[5] = moveset[6];
  moveset[6] = moveset[7];
  moveset[7] = newText;
}

function displayMoveset() {
  textFont("Arial");
  text(moveset[0], 825, 570);
  text(moveset[1], 825, 600);
  text(moveset[2], 825, 630);
  text(moveset[3], 825, 660);
  text(moveset[4], 825, 690);
  text(moveset[5], 825, 720);
  text(moveset[6], 825, 750);
  text(moveset[7], 825, 780);
}
