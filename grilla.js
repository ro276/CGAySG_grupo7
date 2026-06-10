function drawGrid() {
  stroke(gridColor);
  // Usa el umbral de volumen que definimos en el gestor
  strokeWeight(1); 
  let step = 10; 
  
  for (let x = 0; x < width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += step) {
    line(0, y, width, y);
  }
}
