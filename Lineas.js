function dibujar(r, h, d, lados) {
  let f_mic = (filteredLevel * 0.01 + 0.5);
  let rEsc = r * f_mic;

  strokeWeight(0.4);
  noFill();

  // El punto de inflexión del centro
  let holeX = 0;
  let holeY = h * 0.18;

  if (h < 0) {
    // ==========================================
    // FIGURA SUPERIOR: Embudo hiperbólico limpio
    // ==========================================

    let izqX  = -rEsc * 1.4;
    let izqY  = h * 1.05;       
    let derX  =  rEsc * 1.4;
    let derY  = h * 1.05;       
    
    let fondoX = 0;
    let fondoY = h * 0.85; 

    strokeWeight(0.9);
    line(izqX, izqY, fondoX, fondoY);
    line(derX, derY, fondoX, fondoY);
    strokeWeight(0.4);

    let dens = d * 1.8;

    // Lado izquierdo hacia el eje central
    for (let j = 0; j <= dens; j++) {
      let t = j / dens;
      let xE = lerp(izqX, fondoX, t);
      let yE = lerp(izqY, fondoY, t);
      
      let destY = lerp(holeY, holeY + (h * -0.5), t); 
      line(xE, yE, holeX, destY);
    }

    // Lado derecho hacia el eje central
    for (let j = 0; j <= dens; j++) {
      let t = j / dens;
      let xE = lerp(derX, fondoX, t);
      let yE = lerp(derY, fondoY, t);
      
      let destY = lerp(holeY, holeY + (h * -0.5), t);
      line(xE, yE, holeX, destY);
    }

  } else {
    // ==========================================
    // FIGURA INFERIOR: Hilorama cruzado (Efecto cuello hiperbólico)
    // ==========================================

    let abaX =  0;
    let abaY =  h * 1.5;          
    let izqX = -rEsc * 1.35;
    let izqY =  h * 0.75;         
    let derX =  rEsc * 1.35;
    let derY =  h * 0.75;         

    // Líneas de contorno exterior inferiores
    strokeWeight(0.8);
    line(izqX, izqY, abaX, abaY);
    line(derX, derY, abaX, abaY);
    strokeWeight(0.3); 

    let dens = d * 1.8; 

    // ESTRUCTURA CORREGIDA: Cruce de hilos real para calcar la obra física
    for (let j = 0; j <= dens; j++) {
      let t = j / dens;

      // Un conjunto de líneas nace en el eje central superior (el agujero negro)
      // y se despliega hacia el lateral opuesto bajando hasta la punta inferior
      let origenY = lerp(h * -0.18, h * 0.3, t); 

      // Hilos que van desde el centro abriéndose hacia el lado izquierdo inferior
      let destIzqX = lerp(izqX, abaX, t);
      let destIzqY = lerp(izqY, abaY, t);
      line(holeX, origenY, destIzqX, destIzqY);

      // Hilos que van desde el centro abriéndose hacia el lado derecho inferior
      let destDerX = lerp(derX, abaX, t);
      let destDerY = lerp(derY, abaY, t);
      line(holeX, origenY, destDerX, destDerY);
    }
  }
}
