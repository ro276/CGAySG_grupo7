# LENORE TAWNEY - GENERADOR PROCEDURAL

## ¿Qué es esto?

Un generador algorítmico que crea **arte geométrico único** cada vez que haces click en el canvas, inspirado en las obras de Lenore Tawney.

Cada generación es única debido a:
- **Parámetros aleatorios**: densidad, radio base, altura Y varían en cada click
- **Variación orgánica**: pequeños desplazamientos en los puntos de anclaje
- **Chevrones internos opcionales**: 70% de probabilidad de incluirse
- **Múltiples capas**: líneas principales + líneas secundarias semi-transparentes


## ⌨️ CONTROLES

| Acción | Resultado |
|--------|-----------|
| **CLICK en canvas** | Genera nueva composición |
| **SPACE** | Mostrar/ocultar información (ρ, r, h) |
| **S** | Descargar imagen como PNG |
| **Refrescar página** | Reiniciar el generador |

---

## 🎯 CARACTERÍSTICAS PRINCIPALES

### 1. Generación Procedural
```
Cada click:
  ↓
Genera parámetros aleatorios
  ↓
Crea puntos de anclaje únicos
  ↓
Conecta en patrón cruzado
  ↓
Dibuja líneas principales
  ↓
Agrega chevrones internos
  ↓
Renderiza con cuadrícula y anotaciones
```

### 2. Parámetros Generativos

| Parámetro | Rango | Efecto |
|-----------|-------|--------|
| **Densidad (ρ)** | 120-280 | Cantidad de líneas por vórtice |
| **Radio (r)** | 250-350 | Expansión desde el centro |
| **Altura (h)** | 180-260 | Apertura vertical de chevrones |
| **Chevrones** | 70% ON, 30% OFF | Complejidad visual |

### 3. Efecto Visual

La forma **NO se dibuja explícitamente**, sino que **emerge** de:
- Líneas rectas que se cruzan en el centro
- Superposición masiva en la zona central
- Opacidad acumulada (200/255 para líneas principales)
- Opacidad reducida (120/255 para líneas secundarias)

---

## 📊 ALGORITMO EN RESUMEN

### Fase 1: Inicialización
```javascript
- Canvas: 1200 × 900 píxeles
- Colores: Marfil envejecido, azul tenue, sepia oscuro
- Grid: Espaciado de 15 píxeles
```

### Fase 2: Generación de Geometría
```javascript
// Para cada click:
densidad = random(120, 280)
radioBase = random(250, 350)
alturaY = random(180, 260)

// Generar 4 conjuntos de puntos:
- V Superior Izquierda
- V Superior Derecha
- V Inferior Izquierda (espejo)
- V Inferior Derecha (espejo)

// Variación orgánica:
x += random(-5, 5)  // Pequeño desplazamiento
```

### Fase 3: Conexión Cruzada
```javascript
// Conexión 1: Derecha Superior → Izquierda Inferior
// Conexión 2: Izquierda Superior → Derecha Inferior

// Resultado:
- Ambas líneas pasan por (0, 0)
- Crean vórtice automático
- Total: 360-560 líneas por generación
```

### Fase 4: Chevrones Internos (opcional)
```javascript
if (chevronInterno) {
  // Generar geometría secundaria
  escala = 0.6  // 60% del tamaño original
  densidadInterna = densidad * 0.5
  
  // Dibujar con menor opacidad
  strokeWeight = 0.4  // vs 0.6 principal
  opacity = 120       // vs 200 principal
}
```

### Fase 5: Renderización
```javascript
- Cuadrícula de fondo (grid)
- Líneas principales (sepia, opacidad 200)
- Líneas secundarias (sepia, opacidad 120)
- Anotaciones marginales
- Información generativa
```

---

## 🎨 VARIACIONES VISUALES

Cada generación puede variar en:

1. **Densidad Central**
   - Densidad baja (120) → vórtice tenue
   - Densidad media (200) → vórtice bien definido
   - Densidad alta (280) → vórtice muy oscuro

2. **Expansión**
   - Radio bajo (250) → forma compacta
   - Radio alto (350) → forma expansiva

3. **Proporción**
   - Altura baja (180) → chevrones agudos
   - Altura alta (260) → chevrones abiertos

4. **Complejidad**
   - Sin chevrones internos → forma limpia
   - Con chevrones internos → forma compleja

---

## 📈 EJEMPLO DE GENERACIÓN

```
Generación #1:
  ρ=145  r=278  h=195  [Chevrones ON]
  Result: Vórtice tenue, expansión media, complejidad alta

Generación #2:
  ρ=267  r=312  h=220  [Chevrones OFF]
  Result: Vórtice oscuro, expansión alta, forma limpia

Generación #3:
  ρ=189  r=265  h=185  [Chevrones ON]
  Result: Vórtice definido, expansión media, chevrones agudos
```

---

## 💾 DESCARGAR IMÁGENES

1. Genera una composición que te guste
2. Presiona **S** en el teclado
3. Se descargará como: `lenore-tawney-[número].png`

El archivo PNG incluye:
- Canvas completo (1200 × 900)
- Cuadrícula de fondo
- Vórtice geométrico
- Todas las anotaciones
- Parámetros de generación

---

## 🔧 CÓMO MODIFICAR

### Cambiar rangos de generación

En `generarNuevaImagen()`:

```javascript
// Actual:
params.densidad = random(120, 280);

// Cambiar a:
params.densidad = random(100, 400);  // Mayor rango
```

### Cambiar colores

En las constantes globales:

```javascript
// Papel
const PAPER_COLOR = { r: 248, g: 245, b: 235 };  // Cambiar RGB

// Tinta
const INK_COLOR = { r: 35, g: 30, b: 25, a: 200 };  // Cambiar a rojo: r: 255, g: 0, b: 0
```

### Cambiar probabilidad de chevrones

En `generarNuevaImagen()`:

```javascript
// Actual: 70% ON, 30% OFF
params.chevronInterno = random() > 0.3;

// Cambiar a 90% ON:
params.chevronInterno = random() > 0.1;

// Cambiar a 50% ON:
params.chevronInterno = random() > 0.5;
```

### Aumentar complejidad

En `generarGeometriaSecundaria()`:

```javascript
// Actual:
let escala = 0.6;
let densidadInterna = params.densidad * 0.5;

// Hacer más denso:
let escala = 0.75;
let densidadInterna = params.densidad * 0.75;
```

---

## 📋 CHECKLIST DE FUNCIONALIDAD

✅ Canvas generativo 1200×900  
✅ Generación procedural con parámetros aleatorios  
✅ Interactividad al hacer click  
✅ Chevrones internos opcionales  
✅ Variación orgánica en puntos de anclaje  
✅ Cuadrícula de fondo técnica  
✅ Anotaciones marginales  
✅ Información de parámetros  
✅ Descarga PNG con tecla S  
✅ Toggle de información con SPACE  
✅ Contador de generaciones  

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El canvas está vacío
- Verifica que p5.js esté cargado correctamente
- Comprueba la consola del navegador (F12)
- Intenta refrescar la página

### Las líneas no aparecen al hacer click
- Asegúrate de hacer click **dentro** del canvas
- Verifica que los parámetros no sean 0

### Las imágenes se ven diferentes cada vez
- ¡Eso es lo correcto! Es un generador procedural
- Cada click crea una composición única

### No puedo descargar PNG
- Presiona **S** (mayúscula o minúscula)
- Verifica que p5.js tenga permisos de descarga
- Usa otro navegador si el primero no funciona

---

## 📚 ARCHIVOS INCLUIDOS

| Archivo | Descripción |
|---------|-------------|
| `generador.html` | Versión HTML interactiva completa (USAR ESTA) |
| `lenore_tawney_generativo.js` | Código p5.js puro (para copiar/pegar) |
| `tp1_LenoreTawneyAnalisis.md` | Análisis detallado del algoritmo |
| `procedimiento_visual.md` | Diagramas ASCII paso a paso |
| `tutorial_codigo.md` | Tutorial línea por línea |

---

## 🎓 APRENDER MÁS

Consulta estos archivos para entender profundamente:

1. **tp1_LenoreTawneyAnalisis.md** → Explicación matemática completa
2. **procedimiento_visual.md** → Visualización del proceso
3. **tutorial_codigo.md** → Tutorial interactivo del código

---

## 📞 NOTAS FINALES

Este generador es totalmente **procedural y matemático**:
- No usa imágenes pre-generadas
- No usa redes neuronales
- Todo se calcula en tiempo real basado en:
  - Interpolación lineal
  - Geometría euclidiana
  - Algoritmos de conexión cruzada

La belleza emerge de la **simplicidad del algoritmo** y la **complejidad de la superposición**.

---

**¡A generar!** Cada click es una nueva obra de arte. 🎨
