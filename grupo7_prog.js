function drawAnnotations() {
  fill(annotationsColor);
  noStroke();
  
  // Texto técnico sans-serif limpio lateral izquierdo (rotado)
  push();
  translate(30, height / 2);
  rotate(-HALF_PI);
  textSize(10);
  textAlign(CENTER);
  text("TECHNICAL DRAWING PAPER — SECTION 1mm", 0, 0);
  pop();

  // Texto manuscrito en cursiva inferior izquierdo (recreando las anotaciones)
  textAlign(LEFT);
  textSize(14);
  textFont('Georgia'); // Fuente cursiva elegante
  textStyle(ITALIC);
  text("Wings of the Wind.", 60, height - 50);
  
  textSize(10);
  textStyle(NORMAL);
  text("8/10/64", 60, height - 35);
  
  // Monograma técnico inferior derecho (monograma LT, fecha y fracción)
  textAlign(RIGHT);
  text("L T", width - 60, height - 50);
  text("1/2", width - 60, height - 35);
}
