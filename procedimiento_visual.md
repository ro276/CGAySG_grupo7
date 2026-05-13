# RESUMEN VISUAL: Procedimiento Paso a Paso del Vórtice de Lenore Tawney

## Flujo General del Algoritmo

```
┌─────────────────────────────────────────────────────────────────────┐
│                    INICIALIZACIÓN (setup)                          │
│                                                                     │
│  1. Crear canvas 1000x800                                          │
│  2. Inicializar arrays para puntos de anclaje                      │
│  3. Inicializar array para líneas del vórtice                      │
│  4. Llamar a generarPuntosAncla()                                  │
│  5. Llamar a conectarLineasCruzadas()                              │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    DIBUJO PRINCIPAL (draw)                          │
│                                                                     │
│  1. Pintar fondo beige                                             │
│  2. Dibujar cuadrícula de fondo (grid)                            │
│  3. Trasladar origen al centro                                     │
│  4. Dibujar todas las líneas del vórtice                          │
│  5. Restaurar origen                                               │
│  6. Dibujar anotaciones marginales                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## VISUALIZACIÓN PASO A PASO DEL DIBUJO

### PASO 1: Canvas Inicial y Fondo

```
Dimensiones: 1000 × 800 píxeles
Color fondo: RGB(245, 242, 225) - Marfil envejecido

┌──────────────────────────────────────────────────────┐
│                                                      │
│                  (lienzo vacío beige)               │
│                                                      │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### PASO 2: Agregar Cuadrícula Técnica

```
Líneas cada 10 píxeles
Color: RGB(180, 190, 210, 100) - Azul pálido translúcido
Grosor: 0.5 píxeles

┌──────────────────────────────────────────────────────┐
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
│ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
└──────────────────────────────────────────────────────┘
```

### PASO 3: Establecer Origen de Coordenadas

```
Antes:  (0,0) está en esquina superior izquierda
        Coordenadas: (0,0) a (1000,800)

Después de translate(500, 400):
        (0,0) está en el CENTRO
        Coordenadas: (-500,-400) a (500,400)

                     (-500, -400)
                           ↗
        ┌─────────────────X─────────────────┐
        │                                   │
        │                                   │
        │              (0,0) ← CENTRO      │
        │                                   │
        │                                   │
        └───────────────────────────────────┘
                           ↙
                       (500, 400)
```

### PASO 4: Generar Puntos de Anclaje

```
Parámetros utilizados:
  radioBase = 250
  alturaY = 200
  densidad = 180

Se generan 4 conjuntos de puntos (180 puntos cada uno):

              V SUPERIOR
         
         (-0, -300) ← vértice superior
              *
             / \
            /   \
           /     \
    (-250,-200)   (250,-200) ← extremos
         *             *
         
    ─────────────────────────  ← eje x (y=0)
         
         *             *
    (-250, 200)    (250, 200) ← extremos
           \     /
            \   /
             \ /
              *
         (0, 300) ← vértice inferior
         
              V INFERIOR
```

### PASO 5: Conectar Líneas en Patrón Cruzado

```
Este es el paso CRÍTICO donde emerge la forma.

Conexión 1: Derecha Superior → Izquierda Inferior
Conexión 2: Izquierda Superior → Derecha Inferior

Visualización de 4 líneas de ejemplo:

    (-250,-200) ·─────────────────→ (+250,+200)
       ·       · ·               · ·
      · ·     ·   ·           ·   · ·
     ·   ·   ·     ·       ·     ·   ·
    ·     · ·       ·   ·       ·     ·
   ·       ·         · ·         ·       ·
   ·       ·         · ·         ·       ·
    ·     · ·       ·   ·       ·     ·
     ·   ·   ·     ·       ·     ·   ·
      · ·     ·   ·           ·   · ·
       ·       · ·               · ·
    (+250,-200) ·─────────────────→ (-250,+200)

    ↓ Intersección: AMBAS pasan por (0,0)
    
    Se repite este patrón 180 veces con diferentes puntos
    → Se generan 360 líneas totales
```

### PASO 6: Aplicar Propiedades de Tinta

```
Configuración de Trazo:
  Color: RGB(40, 35, 30) - Sepia oscuro
  Alpha (opacidad): 180 de 255
  Grosor: 0.5 píxeles

Efecto de Superposición:
  
  Primera línea:    opacidad = 180
  Segunda línea:    opacidad = 180 + (180 × 0.706) ≈ 307
  Tercera línea:    opacidad = 307 + (180 × 0.5) ≈ 397
  ...
  Línea 100:        opacidad ≈ 18000+ (prácticamente negro)

Resultado:
  ┌──────────────────────────────────────────────────────┐
  │ ┼ ┼ \              ·           ·          / ┼ ┼ ┼ │
  │ ┼ ┼ ┼ \            ·         ·          / ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ \          ·       ·          / ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ \        ·     ·          / ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ \      · ▓▓▓ ·        / ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ ┼ \    ·▓███▓·      / ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ \ · ▓███ · / ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ▓ ████ ▓ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ / · ▓███ · \ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ ┼ /    ·▓███▓·    \ ┼ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ ┼ /      · ▓▓▓ ·      \ ┼ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ ┼ /        ·     ·        \ ┼ ┼ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ ┼ /          ·       ·          \ ┼ ┼ ┼ ┼ │
  │ ┼ ┼ ┼ /            ·         ·          \ ┼ ┼ ┼ │
  │ ┼ ┼ /              ·           ·          \ ┼ ┼ │
  │ ┼ /                                        \ ┼ │
  └──────────────────────────────────────────────────────┘

        ↑↑↑ Centro oscuro (zona de alta densidad)
```

### PASO 7: Añadir Anotaciones

```
Estructura final con anotaciones marginales:

┌──────────────────────────────────────────────────────┐
│TECHNICAL  \              ·           ·          /   │
│DRAWING     \            ·         ·          /      │
│PAPER       \          ·       ·          /         │
│─────────   \        ·     ·          /             │
│SECTION  1mm \      · ▓▓▓ ·        /              │
│            \    ·▓███▓·      /    Wings of       │
│             \ · ▓███ · /       the Wind.        │
│              ▓ ████ ▓            8/10/64    LT   │
│             / · ▓███ · \                     1/2  │
│            /    ·▓███▓·      \                    │
│           /      · ▓▓▓ ·        \                  │
│          /        ·     ·          \               │
│         /          ·       ·          \            │
│        /            ·         ·          \         │
│       /              ·           ·          \      │
│ (rotado 90°)                                       │
└──────────────────────────────────────────────────────┘

Final: Obra completa lista para guardar o exportar
```

---

## Tabla de Transformación de Valores

### Impacto de Densidad

```
┌─────────────┬──────────────┬──────────────────────┐
│  Densidad   │  Líneas Tot. │  Efecto Visual       │
├─────────────┼──────────────┼──────────────────────┤
│  20         │  40          │  Centro tenue        │
│  50         │  100         │  Líneas espaciadas   │
│  150        │  300         │  Vórtice definido    │
│  180        │  360         │  Óptimo (recomendado)│
│  300        │  600         │  Centro muy oscuro   │
│  500        │  1000        │  Casi completamente  │
│             │              │  negro               │
└─────────────┴──────────────┴──────────────────────┘
```

### Impacto de Radio Base

```
┌─────────────┬─────────────────────────────────────┐
│ Radio Base  │  Efecto Visual                      │
├─────────────┼─────────────────────────────────────┤
│  150        │  Forma compacta, cercana al centro  │
│  250        │  Tamaño estándar (recomendado)     │
│  350        │  Forma expansiva, alejada          │
│  400        │  Muy abierta, casi toca bordes     │
└─────────────┴─────────────────────────────────────┘
```

### Impacto de Altura Y

```
┌─────────────┬─────────────────────────────────────┐
│  Altura Y   │  Efecto Visual                      │
├─────────────┼─────────────────────────────────────┤
│  100        │  Chevrones muy agudos, punta fina  │
│  200        │  Forma estándar (recomendado)     │
│  300        │  Chevrones abiertos, más espaciado │
│  400        │  Muy abierto, casi horizontal      │
└─────────────┴─────────────────────────────────────┘
```

### Impacto de Opacidad

```
Fórmula: Opacidad Real = alpha / 255

┌─────────────┬──────────────────┬────────────────────┐
│  Alpha      │  Opacidad Real   │  Efecto            │
├─────────────┼──────────────────┼────────────────────┤
│  50         │  19.6%           │  Muy translúcido   │
│  100        │  39.2%           │  Translúcido       │
│  180        │  70.6%           │  Estándar (rec.)  │
│  200        │  78.4%           │  Más opaco         │
│  255        │  100%            │  Completamente opaco│
└─────────────┴──────────────────┴────────────────────┘
```

---

## Pseudocódigo Ejecutable

```javascript
// INICIALIZACIÓN
function setup() {
  canvas ← crear(1000, 800)
  puntosIzquierdaUpper ← []
  puntosDerechaUpper ← []
  puntosIzquierdaLower ← []
  puntosDerechaLower ← []
  lineasVortice ← []
  
  generarPuntosAncla()
  conectarLineasCruzadas()
}

// FUNCIÓN: Generar Puntos de Anclaje
function generarPuntosAncla() {
  PARA i = 0 HASTA densidad:
    t ← i / densidad
    
    // V Superior - Lado Izquierdo
    p ← {x: lerp(-radioBase, 0, t), 
         y: lerp(-alturaY, -alturaY*1.5, t)}
    puntosIzquierdaUpper.agregar(p)
    
    // V Superior - Lado Derecho
    p ← {x: lerp(0, radioBase, t), 
         y: lerp(-alturaY*1.5, -alturaY, t)}
    puntosDerechaUpper.agregar(p)
    
    // V Inferior - Lado Izquierdo
    p ← {x: lerp(-radioBase, 0, t), 
         y: lerp(alturaY, alturaY*1.5, t)}
    puntosIzquierdaLower.agregar(p)
    
    // V Inferior - Lado Derecho
    p ← {x: lerp(0, radioBase, t), 
         y: lerp(alturaY*1.5, alturaY, t)}
    puntosDerechaLower.agregar(p)
}

// FUNCIÓN: Conectar Líneas (¡LA MAGIA!)
function conectarLineasCruzadas() {
  PARA i = 0 HASTA densidad:
    // Conexión 1: Derecha Superior → Izquierda Inferior
    linea ← {
      x1: puntosDerechaUpper[i].x,
      y1: puntosDerechaUpper[i].y,
      x2: puntosIzquierdaLower[i].x,
      y2: puntosIzquierdaLower[i].y
    }
    lineasVortice.agregar(linea)
    
    // Conexión 2: Izquierda Superior → Derecha Inferior
    linea ← {
      x1: puntosIzquierdaUpper[i].x,
      y1: puntosIzquierdaUpper[i].y,
      x2: puntosDerechaLower[i].x,
      y2: puntosDerechaLower[i].y
    }
    lineasVortice.agregar(linea)
}

// DIBUJO PRINCIPAL
function draw() {
  // Paso 1: Fondo
  fillBackground(RGB(245, 242, 225))
  
  // Paso 2: Cuadrícula
  drawGrid(step=10, color=RGB(180,190,210,100))
  
  // Paso 3: Traducir al centro
  translate(500, 400)
  
  // Paso 4: Dibujar vórtice
  setStroke(RGB(40,35,30,opacidad), weight=0.5)
  PARA linea EN lineasVortice:
    drawLine(linea.x1, linea.y1, linea.x2, linea.y2)
  
  // Paso 5: Volver al origen
  translate(-500, -400)
  
  // Paso 6: Anotaciones
  drawAnnotations()
}
```

---

## Checklist de Implementación

```
✓ Canvas creado (1000 × 800)
✓ Fondo pintado (marfil)
✓ Cuadrícula dibujada
✓ Origen trasladado al centro
✓ Puntos de anclaje generados (4 arrays)
✓ Líneas conectadas en patrón cruzado
✓ Propiedades de tinta aplicadas
✓ Vórtice dibujado
✓ Origen restaurado
✓ Anotaciones añadidas
✓ Imagen completa lista
```

---

## Cómo Ejecutar el Código

### Opción 1: Editor Online (Recomendado)
1. Ir a https://editor.p5js.org/
2. Copiar contenido de `lenore_tawney_p5js.js`
3. Pegar en el editor
4. Presionar "Play"

### Opción 2: HTML Local (Interactivo)
1. Descargar `lenore_tawney_interactive.html`
2. Abrir con navegador web
3. Usar controles deslizantes para experimentar

### Opción 3: En tu proyecto local
1. Incluir librería p5.js
2. Importar el código JavaScript
3. Ejecutar en servidor local

---

Este procedimiento visual garantiza que entiendas cada etapa del proceso algorítmico y cómo la forma "emerge" de la lógica procedimental.
