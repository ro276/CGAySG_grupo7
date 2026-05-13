let paperColor, gridColor;
let colorIndex = 0;
let currentPalette = 2;
let palettes;

function setup() {
  createCanvas(1000, 800);
  noLoop();
  paperColor = color(245, 242, 225);
  gridColor = color(180, 190, 210, 100);
  palettes = [
    [color(200, 30, 30, 220), color(220, 100, 200, 220)],
    [color(30, 60, 200, 220), color(30, 200, 220, 220)],
    [color(40, 35, 30, 180), color(40, 35, 30, 180)]
  ];
}

function draw() {
  background(paperColor);
  drawGrid();

  let centerX = width / 2;
  let centerY = height / 2;
  let tono = mouseX / width;
  let Base = lerp(700, 150, tono);
  let volumen = 1.0 - (mouseY / height);
  let alturaY = lerp(60, 320, volumen);

  translate(centerX, centerY);
  dibujarEstructuraConica(Base, -alturaY, 100, 4);
  dibujarEstructuraConica(Base, alturaY, 100, 4);
  translate(-centerX, -centerY);
}

function mouseMoved() {
  redraw();
}

function mouseClicked() {
  colorIndex = (colorIndex + 1) % 3;
  currentPalette = colorIndex;
  redraw();
}

function dibujarEstructuraConica(r, h, d, lados) {
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI / lados * i + HALF_PI / 2;
    verticesBase.push({ x: cos(angle) * r, y: h });
  }
  let p1 = verticesBase[0];
  let p2 = verticesBase[2];
  let pal = palettes[currentPalette];

  for (let j = 0; j <= d; j++) {
    let inter = j / d;
    let xEdge = lerp(p1.x, p2.x, inter);
    let c = lerpColor(pal[0], pal[1], inter);
    stroke(c);
    strokeWeight(1.5);
    line(xEdge, h, 0, 0);
  }
}

function drawGrid() {
  stroke(gridColor);
  strokeWeight(0.5);
  let step = 10;
  for (let x = 0; x < width; x += step) line(x, 0, x, height);
  for (let y = 0; y < height; y += step) line(0, y, width, y);
}
