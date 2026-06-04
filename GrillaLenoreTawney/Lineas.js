function dibujar(r, h, d, lados) {
  // Primero, definimos los vértices del polígono base (aplanado en 3D para la perspectiva)
  let verticesBase = [];
  for (let i = 0; i < lados; i++) {
    let angle = TWO_PI/lados * i + PI ; // +PI/8 para rotar y que sea simétrico. Agregandole una viariable creciente (mas) permite su rotacion, esta multiplicado por 0.1 para su velocidad
   
    let vx = cos(angle) * r;
    let vy = h + sin(angle) * (r * 0.3 ); // Multiplicado por 0.3 para aplanar la perspectiva
    verticesBase.push({x:vx, y: vy});
  }

  // Ahora, para cada lado del polígono base, generamos miles de líneas hacia el centro
  // Este es el núcleo del efecto de repetición.
  for (let i = 0; i < lados; i++) {
    let p1 = verticesBase[i];
     let p2 = verticesBase[(i + 3) % lados];

    for (let j = 0; j < d; j++) {
      // Generar puntos uniformemente espaciados a lo largo del segmento de perímetro base
      let inter = j / d;
      let xEdge = lerp(p1.x, p2.x, inter);
      let yEdge = lerp(p1.y, p2.y, inter);

      // Dibujar la línea recta desde el punto de borde hacia el origen central (vértice del cono)
      // La superposición masiva de miles de líneas en el centro crea automáticamente
      // la zona central muy oscura y densa (efecto de vórtice).
      line(xEdge, yEdge, 0, 0);
    
      
      
    }
  }
}
