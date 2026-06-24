let paperColor;
let gridColor;
let inkColor;
let annotationsColor;

function setup() {
  
  createCanvas(1000, 800);

  paperColor = color(245, 242, 225); // Marfil envejecido
  gridColor = color(180, 190, 210, 100); // Azul pálido tenue (o naranja, según la variante)
  inkColor = color(40, 35, 30, 180); // Sepia oscuro con algo de transparencia para el efecto de tinta
  annotationsColor = color(50, 50, 50, 200);
}
let mas = 0;
function draw() {
  mas +=0.5;
  background(paperColor);
drawGrid();

  // 2. Configuración de estilo de tinta ultrafina
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
  let alturaY = 230 ;      // Distancia vertical desde el centro. Agregando mouseY modifica la figura
  let densidad = 100;     // Cantidad masiva de líneas para el efecto de repetición
  let ladosPoligono = 4 ;  // Octógono para la estructura multifacetada

//if (mas>15){ //mas>15 hace que la figura gire
// mas=0;
// }
  // Bucle para el Cono Superior e Inferior (Efecto de Repetición Algorítmica)
  // Dibujamos dos conos opuestos cuyos vértices se encuentran en (0,0,0)
  // La repetición se logra mediante el bucle masivo que genera líneas
  // desde el perímetro hacia el centro.
  dibujar(Base + tono, -alturaY , densidad+ volumen, ladosPoligono);
  dibujar(Base , alturaY , densidad, ladosPoligono );

  // 4. Anotaciones Marginales
  translate(centerX, centerY); // Restaurar el origen de coordenadas para el posicionamiento marginal
  drawAnnotations();
  dibujar(Base, -alturaY , densidad, ladosPoligono);
  dibujar(Base, alturaY, densidad, ladosPoligono );
}

function dibujar(r, h, d, lados) {
  // Primero, definimos los vértices del polígono base (aplanado en 3D para la perspectiva)
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI/lados * i + PI ; // +PI/8 para rotar y que sea simétrico. Agregandole "mas * 0.1* permite su rotacion, esta multiplicado por 0.1 para su velocidad
   
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
      line(xEdge, yEdge - 10, 0, 100);
      
      
    }
  }
 
}
 
