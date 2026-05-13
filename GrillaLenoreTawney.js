let paperColor, gridColor, inkColor, annotationsColor;
function setup() {
  createCanvas(1000, 800);
  noLoop();
  paperColor = color(245, 242, 225);
  gridColor = color(180, 190, 210, 100);
  inkColor = color(40, 35, 30, 180);
  annotationsColor = color(50, 50, 50, 200);
}
function draw() {
  background(paperColor);
  drawGrid();
  stroke(inkColor);
  strokeWeight(1.5);
  let centerX = width / 2;
  let centerY = height / 2;
  let tono = mouseX / width;
  let Base = lerp(700, 150, tono);
  let volumen = 1.0 - (mouseY / height);
  let alturaY = lerp(60, 320, volumen);
  translate(centerX, centerY);
  let densidad = 100;
  let ladosPoligono = 4;
  dibujarEstructuraConica(Base, -alturaY, densidad, ladosPoligono);
  dibujarEstructuraConica(Base, alturaY, densidad, ladosPoligono);
  translate(-centerX, -centerY);
}
function mouseMoved() {
  redraw();
}
function dibujarEstructuraConica(r, h, d, lados) {
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI / lados * i + HALF_PI / 2;
    let vx = cos(angle) * r;
    let vy = h;
    verticesBase.push({x: vx, y: vy});
  }

  // Solo conectar el lado superior e inferior (no los laterales)
  let p1 = verticesBase[0]; // extremo derecho
  let p2 = verticesBase[2]; // extremo izquierdo

  for (let j = 0; j <= d; j++) {
    let inter = j / d;
    let xEdge = lerp(p1.x, p2.x, inter);
    let yEdge = h;
    line(xEdge, yEdge, 0, 0);
  }
}
function drawGrid() {
  stroke(gridColor);
  strokeWeight(0.5);
  let step = 10;
  for (let x = 0; x < width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += step) {
    line(0, y, width, y);
  }
}
