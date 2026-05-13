# TUTORIAL: Entender y Modificar el Código p5.js

## Introducción

Este tutorial te guiará a través de cada sección del código p5.js, explicando:
- Qué hace cada parte
- Por qué está estructurada de esa manera
- Cómo modificarla para obtener diferentes efectos

---

## SECCIÓN 1: Declaración de Variables Globales

```javascript
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
```

**Explicación**: Define el tamaño del canvas en píxeles.

**Qué significa**:
- `CANVAS_WIDTH = 1000`: El ancho será 1000 píxeles
- `CANVAS_HEIGHT = 800`: El alto será 800 píxeles

**Si quieres modificar**:
- Para un canvas más pequeño: `CANVAS_WIDTH = 800; CANVAS_HEIGHT = 600;`
- Para un canvas más grande: `CANVAS_WIDTH = 1200; CANVAS_HEIGHT = 900;`

---

```javascript
const PAPER_COLOR = { r: 245, g: 242, b: 225 };
const GRID_COLOR = { r: 180, g: 190, b: 210, a: 100 };
const INK_COLOR = { r: 40, g: 35, b: 30, a: 180 };
```

**Explicación**: Define los colores usando formato RGB (Red, Green, Blue).

**Qué significa**:
- `r`: Componente Rojo (0-255)
- `g`: Componente Verde (0-255)
- `b`: Componente Azul (0-255)
- `a`: Transparencia/Opacidad (0-255, donde 0 = transparente, 255 = opaco)

**Ejemplos de colores**:
```javascript
// Papel blanco
{ r: 255, g: 255, b: 255 }

// Papel gris
{ r: 200, g: 200, b: 200 }

// Papel beige (actual)
{ r: 245, g: 242, b: 225 }

// Tinta roja
{ r: 255, g: 0, b: 0, a: 180 }

// Tinta azul
{ r: 0, g: 0, b: 255, a: 180 }

// Grid rojo débil
{ r: 255, g: 0, b: 0, a: 50 }
```

---

```javascript
const RADIO_BASE = 250;
const ALTURA_Y = 200;
const DENSIDAD = 180;
```

**Explicación**: Parámetros que controlan la forma del vórtice.

**Qué significa cada uno**:

1. **RADIO_BASE = 250**
   - Distancia horizontal desde el centro hasta los extremos de las V
   - Más grande = forma más ancha
   - Más pequeño = forma más estrecha
   
   ```
   radioBase = 100        radioBase = 250        radioBase = 350
        *                        *                      *
       / \                      / \                    / \
      /   \                    /   \                  /   \
     /     \                  /     \                /     \
    ^       ^                ^       ^              ^       ^
   100px   100px            250px   250px          350px   350px
   ```

2. **ALTURA_Y = 200**
   - Altura vertical desde el centro hasta los extremos de las V
   - Más grande = chevrones más abiertos
   - Más pequeño = chevrones más cerrados
   
   ```
   alturaY = 100   alturaY = 200   alturaY = 300
       *               *               *
       |               |               |
       |               |               |
      / \             / \             / \
    100px 200px     300px 400px     500px 600px
   ```

3. **DENSIDAD = 180**
   - Cantidad de puntos a generar en cada lado
   - Más grande = más líneas = vórtice más oscuro
   - Más pequeño = menos líneas = vórtice más tenue
   
   ```
   densidad = 50       densidad = 180      densidad = 500
   ·                   ◉ vórtice          ■ vórtice
    ·         →        definido     →     casi negro
     ·                                    
   ```

---

## SECCIÓN 2: Función setup()

```javascript
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  noLoop();
  generarPuntosAncla();
  conectarLineasCruzadas();
}
```

**Explicación**: Se ejecuta UNA SOLA VEZ al inicio del programa.

**Paso a paso**:

1. **`createCanvas(1000, 800)`**
   - Crea un canvas de 1000 × 800 píxeles
   - Este es el área donde se dibujará todo

2. **`noLoop()`**
   - Detiene el dibujo repetitivo
   - Sin esta línea, `draw()` se ejecutaría 60 veces por segundo
   - La queremos ejecutar solo una vez

3. **`generarPuntosAncla()`**
   - Calcula todos los puntos donde empezarán/terminarán las líneas
   - Llena los 4 arrays: puntosIzquierdaUpper, puntosDerechaUpper, etc.

4. **`conectarLineasCruzadas()`**
   - Conecta los puntos para crear las líneas del vórtice
   - Usa los arrays generados en el paso anterior

**Modificación útil**: Si quieres que se redibuje cada segundo:
```javascript
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // Elimina noLoop() o cambia a:
  frameRate(1);  // Redibuja cada segundo
  generarPuntosAncla();
  conectarLineasCruzadas();
}
```

---

## SECCIÓN 3: Función generarPuntosAncla()

Esta es la función MÁS IMPORTANTE. Aquí es donde se crea la geometría.

```javascript
function generarPuntosAncla() {
  // V SUPERIOR - LADO IZQUIERDO
  for (let i = 0; i <= DENSIDAD; i++) {
    let t = i / DENSIDAD;  // t va de 0 a 1
    
    let x = lerp(-RADIO_BASE, 0, t);
    let y = lerp(-ALTURA_Y, -ALTURA_Y * 1.5, t);
    
    puntosIzquierdaUpper.push({ x: x, y: y });
  }
}
```

**Explicación línea por línea**:

```javascript
for (let i = 0; i <= DENSIDAD; i++) {
```
- Itera DENSIDAD veces (en nuestro caso 180)
- i toma valores: 0, 1, 2, 3, ..., 180

```javascript
let t = i / DENSIDAD;
```
- Convierte i a un valor entre 0 y 1
- Cuando i = 0:   t = 0/180 = 0.00
- Cuando i = 90:  t = 90/180 = 0.50
- Cuando i = 180: t = 180/180 = 1.00

```javascript
let x = lerp(-RADIO_BASE, 0, t);
```
- Interpola linealmente entre dos valores
- Cuando t = 0:   x = -250 (punto inicial)
- Cuando t = 0.5: x = -125 (punto medio)
- Cuando t = 1:   x = 0 (punto final)

La función `lerp(a, b, t)` calcula:
```
result = a + (b - a) × t
```

**Visualización del proceso**:

```
Iteración 1 (i=0, t=0):     Iteración 91 (i=90, t=0.5):    Iteración 181 (i=180, t=1):
  x = -250                      x = -125                       x = 0
  y = -200                      y = -350                       y = -300
  *                             *                              *

(-250, -200)               (-125, -350)                    (0, -300)
```

---

## SECCIÓN 4: Función conectarLineasCruzadas()

```javascript
function conectarLineasCruzadas() {
  for (let i = 0; i <= DENSIDAD; i++) {
    let pUpper_der = puntosDerechaUpper[i];
    let pLower_izq = puntosIzquierdaLower[i];
    
    // Conexión 1: Derecha Superior → Izquierda Inferior
    lineasVortice.push({
      x1: pUpper_der.x,
      y1: pUpper_der.y,
      x2: pLower_izq.x,
      y2: pLower_izq.y
    });
  }
}
```

**Explicación**: Aquí es donde ocurre "la magia".

**Qué hace**:

1. Para CADA punto en la V superior derecha
2. Conecta con su punto CORRESPONDIENTE en la V inferior izquierda
3. Crea una línea recta entre ambos
4. Guarda esta línea en el array `lineasVortice`

**Visualización**:

```
Línea de i=0:       Línea de i=90:      Línea de i=180:
(250, -200)         (125, -350)         (0, -300)
     \                  \                  \
      \                  \                  \
       \                  \                  \
        \                  \                  \
         \                  \                  \
         /                   /                   /
        /                    /                    /
       /                     /                     /
      /                      /                      /
(-250, 200)         (-125, 350)         (0, 300)
```

**La clave matemática**: Ambas líneas pasan por (0, 0) en el centro.

Verificación matemática para la línea desde (250, -200) a (-250, 200):
```
Ecuación paramétrica: P(s) = (1-s) × P1 + s × P2

Cuando s = 0.5:
x = 0.5 × 250 + 0.5 × (-250) = 125 - 125 = 0 ✓
y = 0.5 × (-200) + 0.5 × 200 = -100 + 100 = 0 ✓

Punto intermedio = (0, 0) ✓
```

---

## SECCIÓN 5: Función draw()

```javascript
function draw() {
  background(PAPER_COLOR.r, PAPER_COLOR.g, PAPER_COLOR.b);
  dibujarCuadricula();
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  dibujarVortice();
  translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);
  dibujarAnotaciones();
}
```

**Explicación del flujo**:

1. **`background(...)`**: Limpia la pantalla y pinta el fondo beige
2. **`dibujarCuadricula()`**: Dibuja el grid de fondo
3. **`translate(500, 400)`**: Mueve el origen al centro del canvas
4. **`dibujarVortice()`**: Dibuja todas las líneas del vórtice
5. **`translate(-500, -400)`**: Vuelve el origen a la esquina
6. **`dibujarAnotaciones()`**: Dibuja el texto

**Por qué necesitamos translate dos veces**:

```
Antes de translate(500, 400):
┌────────────────────────┐
│(0,0)                   │
│  │                     │
│  ├─ X                  │
│  │                     │
│  Y                     │
└────────────────────────┘

Después de translate(500, 400):
┌────────────────────────┐
│                        │
│          (0,0)         │ ← Centro del canvas
│           │            │
│           ├─ X         │
│           │            │
│           Y            │
└────────────────────────┘

Después de translate(-500, -400):
┌────────────────────────┐
│(0,0)                   │ ← Vuelve a la esquina
│  │                     │
│  ├─ X                  │
│  │                     │
│  Y                     │
└────────────────────────┘
```

---

## SECCIÓN 6: Función dibujarVortice()

```javascript
function dibujarVortice() {
  stroke(INK_COLOR.r, INK_COLOR.g, INK_COLOR.b, INK_COLOR.a);
  strokeWeight(LINE_STROKE_WEIGHT);
  
  for (let linea of lineasVortice) {
    line(linea.x1, linea.y1, linea.x2, linea.y2);
  }
}
```

**Explicación**:

1. **`stroke(...)`**: Define el color de la línea (sepia oscuro con transparencia)
2. **`strokeWeight(0.5)`**: Define el grosor de la línea en píxeles
3. **Loop**: Para CADA línea en el array, dibújala

**Resultado visual después de dibujar todas las líneas**:

```
Primera línea:
 ╲
  ╲

Primeras 10 líneas:
 ╲  ╲  ╲
  ╲  ╲  ╲

Todas las 360 líneas:
 ╲╲╲╱╱╱
  ╲█╱
   █
  ╱█╲
 ╱╱╱╲╲╲
```

---

## SECCIÓN 7: Cómo Modificar Colores

### Ejemplo: Cambiar a tinta roja

**Código original**:
```javascript
const INK_COLOR = { r: 40, g: 35, b: 30, a: 180 };
```

**Cambio a rojo**:
```javascript
const INK_COLOR = { r: 255, g: 0, b: 0, a: 180 };
```

### Ejemplo: Cambiar el fondo a blanco

**Código original**:
```javascript
const PAPER_COLOR = { r: 245, g: 242, b: 225 };
```

**Cambio a blanco**:
```javascript
const PAPER_COLOR = { r: 255, g: 255, b: 255 };
```

### Ejemplo: Hacer la cuadrícula más oscura

**Código original**:
```javascript
const GRID_COLOR = { r: 180, g: 190, b: 210, a: 100 };
```

**Cambio a más oscuro**:
```javascript
const GRID_COLOR = { r: 100, g: 110, b: 130, a: 150 };
```

---

## SECCIÓN 8: Cómo Modificar Parámetros de Forma

### Hacer un vórtice más compacto

```javascript
const RADIO_BASE = 150;  // Cambio de 250 a 150
const ALTURA_Y = 100;    // Cambio de 200 a 100
const DENSIDAD = 180;    // Mantener igual
```

Resultado:
```
Antes:               Después:
  *                    *
 / \                  /|\
/   \        →       / | \
       \             /  |  \
```

### Hacer un vórtice más oscuro

```javascript
const RADIO_BASE = 250;
const ALTURA_Y = 200;
const DENSIDAD = 500;    // Cambio de 180 a 500
```

Resultado: El centro se vuelve casi completamente negro porque hay 1000 líneas superpuestas.

### Hacer chevrones más agudos

```javascript
const RADIO_BASE = 250;
const ALTURA_Y = 400;    // Cambio de 200 a 400
const DENSIDAD = 180;
```

Resultado: Las V se abren más, generando un ángulo más abierto.

---

## SECCIÓN 9: Ejercicios Prácticos

### Ejercicio 1: Cambiar color de papel y tinta

Modifica estos valores para obtener un efecto "papel oscuro con tinta clara":

```javascript
const PAPER_COLOR = { r: 50, g: 50, b: 60 };      // Azul oscuro
const INK_COLOR = { r: 200, g: 200, b: 200, a: 180 };  // Gris claro
```

### Ejercicio 2: Crear un vórtice invertido

Modifica `generarPuntosAncla()` para cambiar qué lado es "arriba":

```javascript
let y = lerp(-ALTURA_Y, -ALTURA_Y * 1.5, t);  // Original

// Cambiar a:
let y = lerp(-ALTURA_Y * 1.5, -ALTURA_Y, t);  // Invertido
```

### Ejercicio 3: Crear múltiples vórtices

En `draw()`, después de dibujar el primer vórtice, dibuja otro:

```javascript
dibujarVortice();
translate(300, 0);  // Mover a la derecha
dibujarVortice();   // Dibujar otro vórtice
```

### Ejercicio 4: Hacer líneas más gruesas o más finas

Modifica:

```javascript
const LINE_STROKE_WEIGHT = 0.5;  // Cambiar a 1.0, 2.0, etc.
```

Valores recomendados:
- 0.3: muy fino, difícil de ver
- 0.5: ultrafino (actual, como pluma técnica)
- 1.0: fino normal
- 2.0: grueso
- 5.0: muy grueso

---

## SECCIÓN 10: Debugging y Solución de Problemas

### Problema: No veo el vórtice

**Causas posibles**:
1. El color de la tinta es igual al fondo
   - Solución: Cambiar `INK_COLOR` a un color más diferente

2. El canvas no se está dibujando
   - Solución: Asegurarse de que `noLoop()` esté presente

3. `DENSIDAD` es 0 o muy pequeño
   - Solución: Cambiar `DENSIDAD` a un valor mayor (ej: 180)

### Problema: El vórtice se ve diferente cada vez

**Causas posibles**:
1. Accidentalmente se eliminó `noLoop()`
   - Solución: Restaurar `noLoop()` en `setup()`

2. Se está regenerando en cada frame
   - Solución: Verificar que `generarPuntosAncla()` solo se llama en `setup()`

### Problema: El vórtice es completamente negro

**Causas posibles**:
1. `DENSIDAD` es demasiado alta (>500)
   - Solución: Reducir a 180-300

2. Opacidad está al máximo (255)
   - Solución: Cambiar `INK_COLOR.a` a 180

---

## Referencia Rápida de Funciones p5.js Usadas

```javascript
createCanvas(w, h)           // Crear canvas
background(r, g, b)          // Llenar fondo
stroke(r, g, b, a)           // Definir color de línea
strokeWeight(w)              // Definir grosor de línea
line(x1, y1, x2, y2)        // Dibujar línea
translate(x, y)              // Mover origen de coordenadas
noLoop()                     // Detener dibujo repetitivo
lerp(a, b, t)               // Interpolación lineal
for (let i = ...) { }       // Bucle
push() / pop()               // Guardar/restaurar contexto
textSize(s)                  // Tamaño del texto
text(str, x, y)             // Dibujar texto
```

---

## Conclusión

Ahora entiendes:
1. **Cómo funciona la geometría**: Puntos de anclaje + conexiones cruzadas
2. **Cómo funciona el color**: Sistema RGB con opacidad
3. **Cómo funciona el algoritmo**: El vórtice emerge de líneas rectas
4. **Cómo modificarlo**: Cambiar parámetros y colores
5. **Cómo debuggear**: Identificar y solucionar problemas

¡Ahora estás listo para experimentar y crear tus propias variaciones!
