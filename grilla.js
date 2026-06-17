let tamañoGrilla = 100;    

function drawGrid() {
  stroke(gridColor);
  // Usa el umbral de volumen que definimos en el gestor
  strokeWeight(3); 
  let step = 10; 

  
  for (let x = 0; x < width; x += tamañoGrilla) {
    line(x, 0, x, height);
   
  }
  for (let y = 0; y < height; y += tamañoGrilla) {
    line(0, y, width, y);
   
  }

  strokeWeight(1);
  for (let ychico =0; ychico<height; ychico +=step)
      line(0,ychico,width,ychico);
     for(let xchico = 0; xchico <width; xchico += step)
      line(xchico,0,xchico,height);
}
