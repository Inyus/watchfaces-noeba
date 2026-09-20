# Watchfaces Noeba

<<<<<<< HEAD
Open-source browser tools for Xiaomi Smart Band 10 watchfaces.
=======
A browser-only, experimental watchface designer and compiler for the Xiaomi Smart Band 10 (`o66`, 212×520).

## What it does

- Guided visual builder with active and AOD previews.
- Universal prompt generator for Gemini, Claude, ChatGPT, and other mainstream models. The model returns schema-validated design JSON, never fragile binary bytes.
- JSON import, schema validation, structural round-trip inspection, and installable `.bin` download with a fresh nine-digit internal ID.
- Source ZIP export with `wfDef.json` and an FPRJ handoff for advanced work in Mi Create or EasyFace.
- Entirely client-side compilation. No design, asset, or prompt is uploaded.

## Local development

```bash
npm install
npm test
npm run build
npm run dev
```

## Scope

The native compiler covers the verified/basic Band 10 subset: images, raster digit widgets, date, steps, heart rate, battery, and a separate AOD face. Tap targets, scripts, editable groups, pointers, and named multi-style faces are not emitted. Designs requesting those capabilities are exported as source projects instead of guessed binaries.

The Xiaomi package format is community reverse-engineered, not an official specification. Every output should be tested on the target band and firmware.

## Credits and license

MIT licensed. The binary package structure, RLE codecs, and format research are adapted from [`utsabfdahal/band10-toolkit`](https://github.com/utsabfdahal/band10-toolkit), also MIT licensed. Its original license is preserved in [`LICENSE.upstream`](LICENSE.upstream).
>>>>>>> 51ae3d9 (feat: launch browser-only Smart Band 10 watchface compiler)


## Live deployment

The public app is deployed at [watchfaces.noeba.cat](https://watchfaces.noeba.cat/). Cloudflare Workers Builds deploys `main` after CI-tested changes are merged.
