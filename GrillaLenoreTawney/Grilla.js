function drawGrid() {
  // Dibuja la cuadrícula fina de líneas azul pálido tenue (o naranja, según la variante)
  stroke(gridColor);
  strokeWeight(filteredLevel > 110 ? 1 : 0.5); // Líneas más gruesas si el nivel es alto, más finas si es bajo
  let step = 10; // Tamaño de cuadro de 1mm aproximado
  
  for (let x = 0; x < width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += step) {
    line(0, y, width, y);
  }
  
  //  for (let x = 0; x < filteredLevel; x += step) {
   // line(x, 0, x, height);
 // }
 // for (let y = 0; y < filteredLevel; y += step) {
 //   line(0, y, width, y);
 // }
   

}
