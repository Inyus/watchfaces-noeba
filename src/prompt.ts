import type{Design}from'./schema';
export function makePrompt(seed:Design){return`Actúa como diseñador de interfaces para relojes. Diseña una esfera original para Xiaomi Smart Band 10 y devuelve ÚNICAMENTE un objeto JSON válido, sin Markdown, comentarios ni texto adicional.

Destino fijo: xiaomi-smart-band-10/o66. Lienzo: 212 × 520 px, vertical y con esquinas de píldora. Debe ser legible de un vistazo, sobrio, con buen contraste AMOLED y sin marcas, personajes o material protegido.

El JSON debe cumplir exactamente el esquema público watchfaces.noeba/v1:
- schemaVersion: "watchfaces.noeba/v1"
- target: "xiaomi-smart-band-10/o66"
- name: texto de 1–40 caracteres
- colors: background, primary, secondary como #RRGGBB
- clock: size entero 42–110, weight uno de "500","600","700","800","900", y entero 20–330
- widgets: date, steps, heartRate, battery como booleanos
- aod: booleano
- advanced: tapZones, scripts, editableStyles como booleanos. Déjalos en false salvo petición explícita; activarlos impide compilar el BIN directo y obliga a exportar un proyecto.

No añadas claves fuera del esquema. Mantén el fondo casi negro, la hora protagonista y el resto con aire. Toma este punto de partida y mejóralo sin romper el esquema:
${JSON.stringify(seed,null,2)}`}
