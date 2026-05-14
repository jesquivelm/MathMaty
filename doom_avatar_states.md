# Tabla de Estados de Doom Guy - MathMaty

## 14 Estados según Nivel de Vida (HP)

| # | Estado | Rango de HP | Emoji/ASCII | Descripción | Color Borde |
|---|--------|-------------|-------------|-------------|-------------|
| 1 | PERFECTO | 100% | [•‿•] | Estado óptimo, sin daño | #39ff14 (neon green) |
| 2 | EXCELENTE | 90-99% | [•◡•] | Leve desgaste, casi perfecto | #39ff14 (neon green) |
| 3 | MUY BUENO | 80-89% | [•_•] | Buen estado, pequeño daño | #39ff14 (neon green) |
| 4 | BUENO | 70-79% | [◠_◠] | Estado estable, daño menor | #ffd700 (gold) |
| 5 | REGULAR | 60-69% | [◔_◔] | Daño moderado, atención | #ffd700 (gold) |
| 6 | PRECAUCIÓN | 50-59% | [◕_◕] | Mitad de vida, cuidado | #ffd700 (gold) |
| 7 | ALERTA | 40-49% | [◉_◉] | Daño significativo | #ff6a00 (orange) |
| 8 | PELIGRO | 30-39% | [◎_◎] | Estado peligroso | #ff6a00 (orange) |
| 9 | CRÍTICO | 20-29% | [º▰º] | Muy dañado, riesgo alto | #ff3131 (damage red) |
| 10 | GRAVE | 15-19% | [•▰•] | Estado grave, casi crítico | #ff3131 (damage red) |
| 11 | MUY GRAVE | 10-14% | [✖▰✖] | Muy cerca del final | #ff3131 (damage red) |
| 12 | MORIBUNDO | 5-9% | [X▰X] | Al borde de la muerte | #ff3131 (damage red) |
| 13 | AGÓNICO | 1-4% | [☠▰☠] | Últimos momentos | #ff3131 (damage red) |
| 14 | MUERTO | 0% | [☠] | Game Over | #333333 (gray) |

## Reglas de Cambio de Estado

- **Subida de vida**: Cada respuesta correcta recupera 15% de HP (máximo 100%)
- **Bajada de vida**: Cada respuesta incorrecta pierde 25% de HP (mínimo 0%)
- **Game Over**: Al llegar a 0% HP, el estudiante debe reiniciar o esperar recuperación
- **Bonus**: Racha de 5 correctas consecutivas recupera 10% extra de HP

## Implementación en Código

Los estados se mapean en `app.js` en la función `actualizarConsolaInterfaz()` usando rangos de HP.
