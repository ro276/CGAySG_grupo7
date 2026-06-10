# Skill: Revisión y corrección de monitoreo de audio

## Propósito
Este skill documenta y guía el flujo de trabajo para revisar y corregir `monitoreo.js` en el proyecto. Su foco es garantizar que el programa registre:
- pitch (frecuencia detectada)
- amplitud de entrada de micrófono
- duración de eventos sonoros
- ausencia de sonido / silencio

## Cuándo usarlo
Usar este skill cuando se necesita:
- detectar y registrar propiedades de audio en tiempo real
- corregir lógica de inicialización y actualización de micrófono
- hacer que la aplicación reconozca eventos de sonido breves y silencios
- añadir logging y estados claros para depuración

## Proceso paso a paso
1. Leer `monitoreo.js` completo y ubicar las variables principales.
   - `mic`, `audioIniciado`
   - `amp`, `intensidad`, `pisoAmp`, `techoAmp`
   - `frec`, `notaMidi`, `hayPitch`
   - `haySonido`, `durSonido`, `durSilencio`, `empezoElSonido`, `terminoElSonido`

2. Verificar que el archivo se cargue en `index.html`.
   - Asegurarse de que exista un `<script src="monitoreo.js"></script>` después de `GrillaLenoreTawney.js` y antes de `p5.sound.min.js` / ml5.

3. Corregir la inicialización de audio.
   - Añadir `iniciarMonitoreo()` que cree `new p5.AudioIn()` y arranque el micrófono.
   - Llamar `startPitch()` sólo después de que el audio esté listo.

4. Añadir la lógica de actualización continua.
   - Definir `actualizarMonitoreo()` que lea `mic.getLevel()` y calcule `amp`, `intensidad`, `pisoAmp`, `techoAmp`.
   - Determinar si `haySonido` con un umbral de ruido (`umbralRuido`).
   - Registrar el inicio y fin de cada evento sonoro usando `millis()`.
   - Calcular `durSonido` y `durSilencio`.

5. Asegurar la detección de pitch.
   - Mantener `startPitch()`, `modelLoaded()` y `getPitch()`.
   - Añadir manejo de ausencia de pitch: si no llega frecuencia en más de `timeoutSinPitch`, considerar `hayPitch = false`.
   - Registrar en consola cada pitch detectado y cada ausencia.

6. Añadir logging útil.
   - Mostrar mensajes claros para: audio iniciado, pitch cargado, pitch detectado, pitch ausente, inicio de sonido, fin de sonido.
   - Usar objetos en los logs para inspección directa.

7. Verificación manual final.
   - Correr el proyecto en el navegador.
   - Llamar `iniciarMonitoreo()` desde el sketch o desde la consola si no hay llamada explícita.
   - Ejecutar `actualizarMonitoreo()` en `draw()` o en un bucle de actualización.
   - Confirmar que aparezcan logs de pitch y sonido.
   - Comprobar que `haySonido`, `durSonido`, `durSilencio` y `hayPitch` cambien según entrada.

## Criterios de calidad
- `monitoreo.js` no debe lanzar errores al cargar.
- `iniciarMonitoreo()` debe iniciar el micrófono sin bloquear el resto del sketch.
- `actualizarMonitoreo()` debe poder llamarse cada frame sin cuellos de botella.
- El modelo CREPE debe iniciarse sólo una vez y mantenerse en ciclo de detección.
- El código debe ser explicable para programadores de nivel medio, con comentarios claros.

## Ejemplos de prompts para usar este skill
- "Revisa `monitoreo.js` y corrige la lógica de detección de silencio y pitch."
- "Haz que `actualizarMonitoreo()` registre la duración del sonido y del silencio en `durSonido` y `durSilencio`."
- "Añade un log en consola cuando el pitch se pierde por más de 300 ms."

## Extensiones posibles
- Crear un indicador visual en pantalla que cambie cuando hay sonido.
- Añadir un histograma de amplitud en tiempo real.
- Integrar eventos de sonido con la variable de interacción principal en `GrillaLenoreTawney.js`.
