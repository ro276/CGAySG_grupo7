// --- VARIABLES GLOBALES DE DISEÑO ---
let paperColor, gridColor, inkColor;
let colorAlto, colorBajo;

// --- VARIABLES DE AUDIO y FILTROS ---
let mic, fft, osc;
let amp, pitch;
let filteredLevel = 0;
let framesSinceHighLevel = 0;

// --- VARIABLES DE LA FIGURA ---
let Base = 500;
let alturaY = 200;
let mas = 0; 
let strokeActual; 

// --- VARIABLES NUEVAS PARA EL APLAUSO ---
let girandoPorAplauso = false; 
let tiempoUltimoAplauso = 0;   

// --- UMBRALES DE CONTROL ---
let umbralVolumen = 25;    
let umbralFrecuencia = 600; 
let umbralAplauso = 120;     

function setup() {
  createCanvas(1000, 800);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  osc = new p5.Oscillator(); 
  osc.amp(0); 

  paperColor = color(245, 242, 225); 
  gridColor = color(180, 190, 210, 100); 
  inkColor = color(40, 35, 30, 180); 

  colorAlto = color(200, 50, 50, 180);  
  colorBajo = color(99, 108, 147, 180); 
  strokeActual = inkColor; 
}

function draw() {
  background(paperColor);
  
  // 1. OBTENCIÓN Y FILTRADO DE AUDIO
  let level = mic.getLevel();
  let remappedLevel = map(level, 0, 0.5, 10, 300); 
  filteredLevel = filteredLevel * 0.8 + remappedLevel * 0.2;
  
  fft.analyze();
  pitch = fft.getCentroid(); 

  if (filteredLevel > umbralVolumen) {
    framesSinceHighLevel++;
  } else {
    framesSinceHighLevel = max(0, framesSinceHighLevel - 1);
  }

  // 2. DETECTOR DE APLAUSO (Mecánica de Switch)
  if (remappedLevel > umbralAplauso && millis() - tiempoUltimoAplauso > 300) {
    girandoPorAplauso = !girandoPorAplauso; 
    tiempoUltimoAplauso = millis();        
  }

  // 3. APLICAR ROTACIÓN CONTINUA SI ACTIVÓ EL APLAUSO
  if (girandoPorAplauso) {
    mas += 0.02; 
  }

  // 4. MATRIZ DE INTERACCIÓN (Modifica tamaño y color según la voz)
  if (filteredLevel > 15) { 
    if (pitch >= umbralFrecuencia && filteredLevel >= umbralVolumen) {
      // Estado 1: AGUDO Y ALTO
      Base = lerp(Base, 150, 0.1); 
      alturaY = lerp(alturaY, 450, 0.1);
      if (!girandoPorAplauso) mas += 0.15; 
      strokeActual = colorAlto;
    } else if (pitch >= umbralFrecuencia && filteredLevel < umbralVolumen) {
      // Estado 2: AGUDO Y BAJO
      Base = lerp(Base, 200, 0.1);
      alturaY = lerp(alturaY, 100, 0.1);
      if (!girandoPorAplauso) mas += 0.02;
      strokeActual = colorBajo;
    } else if (pitch < umbralFrecuencia && filteredLevel >= umbralVolumen) {
      // Estado 3: GRAVE Y ALTO
      Base = lerp(Base, 750, 0.1);
      alturaY = lerp(alturaY, 300, 0.1);
      if (!girandoPorAplauso) mas += 0.04; 
      strokeActual = inkColor;
    } else if (pitch < umbralFrecuencia && filteredLevel < umbralVolumen) {
      // Estado 4: GRAVE Y BAJO
      Base = lerp(Base, 600, 0.1);
      alturaY = lerp(alturaY, 80, 0.1);
      if (!girandoPorAplauso) mas += 0.005;
      strokeActual = inkColor;
    }
  } else {
    // REPOSO (Silencio)
    Base = lerp(Base, 500, 0.05);
    alturaY = lerp(alturaY, 200, 0.05);
    strokeActual = inkColor;
  }

  // 5. DIBUJO GENERAL DE LA OBRA
  drawGrid(); 
  
  push();
   let flotante = sin(frameCount * 0.03) * 8;
  translate(width / 2, height / 2 + flotante); 
  stroke(strokeActual);
  strokeWeight(0.5); 

  let densidad = 70;      
  let ladosPoligono = 4;  

  dibujar(Base, -alturaY, densidad, ladosPoligono);
  dibujar(Base, alturaY, densidad, ladosPoligono);
  dibujar(-Base, -alturaY, densidad, ladosPoligono);
  pop();
}

function dibujar(r, h, d, lados) {
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI / lados * i + PI + mas; 
    let vx = cos(angle) * r * (filteredLevel * 0.01 + 0.5); 
    let vy = h + sin(angle) * (r * 0.2) * (filteredLevel * 0.01 + 0.5); 
    verticesBase.push({ x: vx, y: vy });
  }

  for (let i = 0; i < lados; i++) {
    let p1 = verticesBase[i];
    let p2 = verticesBase[(i + 3) % lados];
    for (let j = 0; j < d; j++) {
      let inter = j / d;
      let xEdge = lerp(p1.x, p2.x, inter);
      let yEdge = lerp(p1.y, p2.y, inter);
      line(xEdge, yEdge, 0, 0);
      line(xEdge, yEdge, 0, 20);
      if (filteredLevel > 150) {
        line(xEdge, yEdge, 0, 40);
      }
    }
  }
}
