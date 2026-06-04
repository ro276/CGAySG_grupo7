let paperColor;
let gridColor;
let inkColor;
let annotationsColor;

let mic;
let filteredLevel = 0;
let framesSinceHighLevel = 0;

let fft;
let colorAlto;
let colorBajo;


function setup() {
  
  createCanvas(1000, 800);
 mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  osc =new p5.Oscillator(); //intento de registro de sonidos agudos y graves
  osc.amp(0); //esta a 0 para que no cause ruido, si van a añadirle un numero, que sea decimal o le rompera los oidos posta
 // osc.disconnect(); // Desconectar el oscilador para que no suene hasta que se le indique

  //env =new p5.envelope();

  //osc.connect(env);

  paperColor = color(245, 242, 225); // Marfil envejecido
  gridColor = color(180, 190, 210, 100); // Azul pálido tenue (o naranja, según la variante)
  inkColor = color(40, 35, 30, 180); // Sepia oscuro con algo de transparencia para el efecto de tinta
  annotationsColor = color(50, 50, 50, 200);

  colorAlto = color(200, 50, 50, 180); // Rojo intenso para niveles altos
  colorBajo = color(99, 108, 147); // Azul suave para niveles bajos
 

}
let mas = 0;
function draw() {
  //mide el nivel de frecuencia
  let level = mic.getLevel();
  osc.start();
  
  //mapea el nivel de frecuencia
  let remappedLevel = map(level, 0, 1, 10, width*30);// el numero por el que se multiplique determina que tanto de deformara la figura segun la amplitud. Menor sea el numero, menos deformaciones - mayor, más grande la deformación
  
  console.log(fft.analyze());
  osc.start();

  //filtro que suaviza el nivel de frecuencia para evitar cambios bruscos
  filteredLevel = filteredLevel*0.8 + remappedLevel*0.2;
  fft.analyze();
  for (let i = 0; i < fft.bins; i++) {
    let freqLevel = fft.getEnergy(remappedLevel);
  }
  osc.freq(filteredLevel * 2); // Multiplicado por 2 para aumentar la frecuencia del oscil
  //cuenta los frames desde que el nivel de frecuencia ha estado por encima de un valor numerico

  if( filteredLevel > 110 ) {
    framesSinceHighLevel++;
  }else {
    framesSinceHighLevel--;
  
}

  mas +=0.5; //variable que permite su rotacion, mientras mas alto el numero, mas rapido gira la figura. 
  background(paperColor);
drawGrid();


 
  stroke(inkColor);
 
  strokeWeight(0.5); // Línea ultrafina uniforme (técnica)

  let centro1 = 490;
  let centro2 = 510;
  let centerX = width/2;
  let centerY = height/ 2;
  translate (centerX, centerY); // Establecer el origen de coordenadas (0,0) en el centro exacto de la página
 let tono = mouseX *2 / centerX;
  let volumen = mouseY / centerY;
   // sobre polígonos base aplanar en 3D para la perspectiva.

  let Base = 500  ;     // Radio de los polígonos base. Agredando mouseX modifica la figura
  let alturaY = 200 ;      // Distancia vertical desde el centro. Agregando mouseY modifica la figura
  let densidad = 100;     // Cantidad masiva de líneas para el efecto de repetición
  let ladosPoligono = 4 ;  // Octógono para la estructura multifacetada

//if (mas>15){ //mas>15 hace que la figura gire
// mas=0;
// }
  //añadiendo filteredLevel a los primeros dos parametros, agranda y achica la figura
  dibujar(Base + filteredLevel , -alturaY  + filteredLevel, densidad + volumen, ladosPoligono);
  dibujar(Base - filteredLevel , alturaY  - filteredLevel, densidad, ladosPoligono );


  // 4. Anotaciones Marginales

}

function dibujar(r, h, d, lados) {
  // Primero, definimos los vértices del polígono base (aplanado en 3D para la perspectiva)
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI/lados * i + PI + mas*0.1 ; // +PI/8 para rotar y que sea simétrico. Agregandole "mas * 0.1* permite su rotacion, esta multiplicado por 0.1 para su velocidad
  
    let vx = cos(angle) * r;
    let vy = h + sin(angle) * (r * 0.3 ); // Multiplicado por 0.3 para aplanar la perspectiva
    verticesBase.push({x:vx, y: vy});
  }
  

  // Ahora, para cada lado del polígono base, generamos miles de líneas hacia el centro
  // Este es el núcleo del efecto de repetición.
  for (let i = 0; i < lados; i++) {
    let p1 = verticesBase[i];
     let p2 = verticesBase[(i + 3) % lados];

    for (let j = 0; j < d ; j++) {
      // Generar puntos uniformemente espaciados a lo largo del segmento de perímetro base
      let inter = j / d;
      let xEdge = lerp(p1.x, p2.x, inter);
      let yEdge = lerp(p1.y, p2.y, inter);

      // Dibujar la línea recta desde el punto de borde hacia el origen central (vértice del cono)
      // La superposición masiva de miles de líneas en el centro crea automáticamente
      // la zona central muy oscura y densa (efecto de vórtice).
      line(xEdge, yEdge, 0, 0);
      line(xEdge, yEdge - 10, 0, 10);
      
      
    }
  }
 
}
 
