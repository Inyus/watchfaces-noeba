import type{Design}from'./schema';import type{Lang}from'./i18n';
export function makePrompt(seed:Design,lang:Lang='es'){const intro=lang==='en'?`Act as a watch-interface designer. Design an original face for Xiaomi Smart Band 10 and return ONLY a valid JSON object, with no Markdown, comments, or extra text.

Fixed target: xiaomi-smart-band-10/o66. Canvas: 212 × 520 px, vertical with pill-shaped corners. It must be glanceable, restrained, high-contrast on AMOLED, and contain no brands, characters, or protected material.`:`Actúa como diseñador de interfaces para relojes. Diseña una esfera original para Xiaomi Smart Band 10 y devuelve ÚNICAMENTE un objeto JSON válido, sin Markdown, comentarios ni texto adicional.

Destino fijo: xiaomi-smart-band-10/o66. Lienzo: 212 × 520 px, vertical y con esquinas de píldora. Debe ser legible de un vistazo, sobrio, con buen contraste AMOLED y sin marcas, personajes o material protegido.`;const rules=lang==='en'?`The JSON must exactly follow the public watchfaces.noeba/v1 schema:
- schemaVersion: "watchfaces.noeba/v1"
- target: "xiaomi-smart-band-10/o66"
- name: 1–40 characters
- colors: background, primary, secondary as #RRGGBB
- clock: integer size 42–110, weight one of "500","600","700","800","900", and integer y 20–330
- widgets: date, steps, heartRate, battery as booleans
- aod: boolean
- advanced: tapZones, scripts, editableStyles as booleans. Leave them false unless explicitly requested; enabling them prevents direct BIN compilation and requires project export.

Do not add keys outside the schema. Keep the background nearly black, make the time dominant, and leave breathing room. Improve this starting point without breaking the schema:`:`El JSON debe cumplir exactamente el esquema público watchfaces.noeba/v1:
- schemaVersion: "watchfaces.noeba/v1"
- target: "xiaomi-smart-band-10/o66"
- name: texto de 1–40 caracteres
- colors: background, primary, secondary como #RRGGBB
- clock: size entero 42–110, weight uno de "500","600","700","800","900", y entero 20–330
- widgets: date, steps, heartRate, battery como booleanos
- aod: booleano
- advanced: tapZones, scripts, editableStyles como booleanos. Déjalos en false salvo petición explícita; activarlos impide compilar el BIN directo y obliga a exportar un proyecto.

No añadas claves fuera del esquema. Mantén el fondo casi negro, la hora protagonista y el resto con aire. Toma este punto de partida y mejóralo sin romper el esquema:`;return`${intro}\n\n${rules}\n${JSON.stringify(seed,null,2)}`}
