// --- VARIABLES GLOBALES DE DISEÑO ---
let paperColor, gridColor, inkColor;
let colorAlto, colorBajo;

// --- VARIABLES DE AUDIO y FILTROS ---
let mic, fft;
let filteredLevel = 0;

// --- VARIABLES DE LA FIGURA ---
let Base = 500;
let alturaY = 200;
let strokeActual; 

// --- VARIABLES PARA EL APLAUSO Y EL DEGRADÉ ---
let modoDegradeActivo = false; 
let tiempoUltimoAplauso = 0;   
let avanceColor = 0; // Controla el movimiento continuo del degradé

// --- UMBRALES DE CONTROL ---
let umbralVolumen = 25;    
let umbralFrecuencia = 600; 
let umbralAplauso = 60; 

function setup() {
  createCanvas(1000, 800);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  paperColor = color(245, 242, 225); 
  gridColor = color(180, 190, 210, 100); 
  inkColor = color(40, 35, 30, 180); 

  colorAlto = color(200, 50, 50, 180);  // Rojo
  colorBajo = color(99, 108, 147, 180); // Azul
  strokeActual = inkColor; 
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function draw() {
  background(paperColor);
  
  drawGrid(); 

  let level = mic.getLevel();
  let remappedLevel = map(level, 0, 0.5, 10, 300); 
  filteredLevel = filteredLevel * 0.8 + remappedLevel * 0.2;
  
  fft.analyze();
  let pitch = fft.getCentroid(); 

  // Detector de aplauso (Activa/Desactiva el chorreo de color)
  if (remappedLevel > umbralAplauso && millis() - tiempoUltimoAplauso > 350) {
    modoDegradeActivo = !modoDegradeActivo; 
    tiempoUltimoAplauso = millis();        
  }

  // Si está activo, el color avanza sin frenar
  if (modoDegradeActivo) {
    avanceColor += 0.07; // Cambiá este valor si querés que los colores caigan más rápido o más lento
  }

  // Modificación de tamaño por voz (Sigue funcionando siempre)
  if (filteredLevel > 15) { 
    if (pitch >= umbralFrecuencia && filteredLevel >= umbralVolumen) {
      Base = lerp(Base, 150, 0.1); 
      alturaY = lerp(alturaY, 450, 0.1);
      if (!modoDegradeActivo) strokeActual = colorAlto;
    } else if (pitch >= umbralFrecuencia && filteredLevel < umbralVolumen) {
      Base = lerp(Base, 200, 0.1);
      alturaY = lerp(alturaY, 100, 0.1);
      if (!modoDegradeActivo) strokeActual = colorBajo;
    } else if (pitch < umbralFrecuencia && filteredLevel >= umbralVolumen) {
      Base = lerp(Base, 750, 0.1);
      alturaY = lerp(alturaY, 300, 0.1);
      if (!modoDegradeActivo) strokeActual = inkColor;
    } else if (pitch < umbralFrecuencia && filteredLevel < umbralVolumen) {
      Base = lerp(Base, 600, 0.1);
      alturaY = lerp(alturaY, 80, 0.1);
      if (!modoDegradeActivo) strokeActual = inkColor;
    }
  } else {
    Base = lerp(Base, 500, 0.05);
    alturaY = lerp(alturaY, 200, 0.05);
    if (!modoDegradeActivo) strokeActual = inkColor;
  }

  push();
  let flotante = sin(frameCount * 0.03) * 8;
  translate(width / 2, height / 2 + flotante); 
  
  strokeWeight(0.5); 

  let densidad = 70;      
  let ladosPoligono = 4;  

  dibujar(Base, -alturaY, densidad, ladosPoligono);
  dibujar(Base, alturaY, densidad, ladosPoligono);
  pop();
}

function dibujar(r, h, d, lados) {
  let f_mic = (filteredLevel * 0.01 + 0.5);
  let rEsc = r * f_mic;

  strokeWeight(0.4);
  noFill();

  let holeX = 0;
  let holeY = h * 0.18;

  if (h < 0) {
    // ==========================================
    // FIGURA SUPERIOR
    // ==========================================
    let izqX  = -rEsc * 1.4;
    let izqY  = h * 1.05;       
    let derX  =  rEsc * 1.4;
    let derY  = h * 1.05;       
    let fondoX = 0;
    let fondoY = h * 0.85; 

    strokeWeight(0.9);
    if (modoDegradeActivo) {
      let tColor = (sin(avanceColor) + 1) / 2;
      stroke(lerpColor(colorBajo, colorAlto, tColor));
    } else {
      stroke(strokeActual);
    }
    line(izqX, izqY, fondoX, fondoY);
    line(derX, derY, fondoX, fondoY);
    strokeWeight(0.4);

    let dens = d * 1.8;

    for (let j = 0; j <= dens; j++) {
      let t = j / dens;
      let xE = lerp(izqX, fondoX, t);
      let yE = lerp(izqY, fondoY, t);
      let destY = lerp(holeY, holeY + (h * -0.5), t); 
      
      if (modoDegradeActivo) {
        // Al sumar 't * 5' con 'avanceColor' creamos el efecto de ola que baja por la figura
        let deph = (t * 5) - avanceColor;
        let factorDegrade = (sin(deph) + 1) / 2; 
        stroke(lerpColor(colorBajo, colorAlto, factorDegrade));
      } else {
        stroke(strokeActual);
      }
      line(xE, yE, holeX, destY);
    }

    for (let j = 0; j <= dens; j++) {
      let t = j / dens;
      let xE = lerp(derX, fondoX, t);
      let yE = lerp(derY, fondoY, t);
      let destY = lerp(holeY, holeY + (h * -0.5), t);
      
      if (modoDegradeActivo) {
        let deph = (t * 5) - avanceColor;
        let factorDegrade = (sin(deph) + 1) / 2;
        stroke(lerpColor(colorBajo, colorAlto, factorDegrade));
      } else {
        stroke(strokeActual);
      }
      line(xE, yE, holeX, destY);
    }

  } else {
    // ==========================================
    // FIGURA INFERIOR
    // ==========================================
    let abaX =  0;
    let abaY =  h * 1.5;          
    let izqX = -rEsc * 1.35;
    let izqY =  h * 0.75;         
    let derX =  rEsc * 1.35;
    let derY =  h * 0.75;         

    strokeWeight(0.8);
    if (modoDegradeActivo) {
      let tColor = (sin(avanceColor) + 1) / 2;
      stroke(lerpColor(colorBajo, colorAlto, tColor));
    } else {
      stroke(strokeActual);
    }
    line(izqX, izqY, abaX, abaY);
    line(derX, derY, abaX, abaY);
    strokeWeight(0.3); 

    let dens = d * 1.8; 

    for (let j = 0; j <= dens; j++) {
      let t = j / dens;
      let origenY = lerp(h * -0.18, h * 0.3, t); 
      let destIzqX = lerp(izqX, abaX, t);
      let destIzqY = lerp(izqY, abaY, t);
      
      if (modoDegradeActivo) {
        // Continuamos la misma dirección de la ola hacia abajo
        let deph = (t * 5) - avanceColor;
        let factorDegrade = (sin(deph) + 1) / 2;
        stroke(lerpColor(colorBajo, colorAlto, factorDegrade));
      } else {
        stroke(strokeActual);
      }
      line(holeX, origenY, destIzqX, destIzqY);

      let destDerX = lerp(derX, abaX, t);
      let destDerY = lerp(derY, abaY, t);
      
      if (modoDegradeActivo) {
        let deph = (t * 5) - avanceColor;
        let factorDegrade = (sin(deph) + 1) / 2;
        stroke(lerpColor(colorBajo, colorAlto, factorDegrade));
      } else {
        stroke(strokeActual);
      }
      line(holeX, origenY, destDerX, destDerY);
    }
  }
}
