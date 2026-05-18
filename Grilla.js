function drawGrid() {
  // Dibuja la cuadrícula fina de líneas azul pálido tenue (o naranja, según la variante)
  stroke(gridColor);
  strokeWeight(0.9);
  let step = 10; // Tamaño de cuadro de 1mm aproximado
  
  for (let x = 0; x < width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += step) {
    line(0, y, width, y);
  }
  
    

}
