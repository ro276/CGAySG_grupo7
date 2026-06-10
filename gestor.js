let paperColor;
let gridColor;
let inkColor;
let annotationsColor;

let mic;
let fft;
let pitch = 0;

// Nuevas variables para las interacciones sonoras
let nivelAnterior = 0;      // Guarda el nivel del frame anterior para detectar chasquidos
let rotando = false;        // Estado del interruptor de rotación (true/false)
let anguloRotacion = 0;     // Acumulador constante para que la figura gire

// Variables de suavizado (easing) para evitar saltos visuales bruscos
let baseSuavizada = 500;
let alturaSuavizada = 250;
let escalaSuavizada = 1;

function setup() {
  createCanvas(1000, 800);

  // Inicialización de Audio
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  // Colores
  paperColor = color(245, 242, 225);
  gridColor = color(180, 190, 210, 100);
  inkColor = color(40, 35, 30, 180);
  annotationsColor = color(50, 50, 50, 200);
}

function draw() {
  background(paperColor);
  drawGrid(); // Esta función sigue viviendo intacta en Grilla.js

 
  let level = mic.getLevel();
  pitch = fft.getCentroid(); // Centro de gravedad de las frecuencias (Timbre)
filteredLevel = filteredLevel * 0.8 + remappedLevel * 0.2;
  
  // La ausencia de sonido hace que la figura se contraiga.
  // La intensidad hace que se expanda o contraiga en ambos ejes.
  let escalaObjetivo = map(level, 0, 0.5, 0.5, 3); 

  // graves y a gudos
  let targetBase = 100;
  let targetAltura = 100;

  // Evaluamos el timbre solo si hay un mínimo de sonido
  if (level > 0.02) {
    if (pitch < 1500) {
      // Altura grave: ensancha la figura en el eje X.
      targetBase = map(pitch, 1500, 0, 150, 400);
    } else if (pitch > 2500) {
      // Altura aguda: ensancha la figura en el eje Y.
      targetAltura = map(pitch, 2500, 8000, 150, 400);
    }
  }

  // chaquidp
  // Medimos el "ataque": la diferencia brusca de volumen entre el frame anterior y el actual
  let deltaNivel = level - nivelAnterior;
  
  if (deltaNivel > 250) { // Si hay un salto repentino y fuerte (aplauso)
    rotando = !rotando;    // Invertimos el estado (si estaba en false pasa a true, y viceversa)
  }
  nivelAnterior = level;   // Guardamos el nivel para el cálculo del próximo frame

  // Si el interruptor de rotación está activado, la figura gira constantemente
  if (rotando) {
    anguloRotacion += 0.02; // Velocidad de giro
  }

  // 5. SUAVIZADO DE VARIABLES
  // Aplicamos interpolación (lerp) para que las deformaciones sean fluidas y orgánicas
  baseSuavizada = lerp(baseSuavizada, targetBase, 5);
  alturaSuavizada = lerp(alturaSuavizada, targetAltura, 5);
  escalaSuavizada = lerp(escalaSuavizada, escalaObjetivo, 5);

  // 6. DIBUJO
  stroke(inkColor);
  strokeWeight(0.5);
  translate(width/2, height/2);

  // Calculamos las medidas finales aplicando la escala general
  let radioFinal = baseSuavizada * escalaSuavizada;
  let alturaFinal = alturaSuavizada * escalaSuavizada;
  let densidad = 100;
  let ladosPoligono = 4;

  // Pasamos el ángulo de rotación a la función dibujar
  dibujar(radioFinal, -alturaFinal, densidad, ladosPoligono, anguloRotacion);
  dibujar(radioFinal, alturaFinal, densidad, ladosPoligono, anguloRotacion);
}

// 7. FUNCIÓN DIBUJAR ACTUALIZADA
// Se eliminaron las referencias globales (como 'mas') para encapsular correctamente la geometría.
function dibujar(r, h, d, lados, rotacion) {
  let verticesBase = [];
  
  for (let i = 0; i < lados; i++) {
    // Aquí aplicamos el acumulador de rotación
    let angle = (TWO_PI / lados) * i + PI + rotacion;
    let vx = cos(angle) * r;
    let vy = h + sin(angle) * (r * 0.2); 
    verticesBase.push({x: vx, y: vy});
  }

  for (let i = 0; i < lados; i++) {
    let p1 = verticesBase[i];
    let p2 = verticesBase[(i + 3) % lados];

    for (let j = 0; j < d; j++) {
      let inter = j / d;
      let xEdge = lerp(p1.x, p2.x, inter);
      let yEdge = lerp(p1.y, p2.y, inter);
      
      line(xEdge, yEdge, 0, 0);
    }
  }
}
