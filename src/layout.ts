import type{Design}from'./schema';
export const WATCH_WIDTH=212;
export function clockMetrics(d:Design,aod=false){const size=aod?58:d.clock.size;return{size,top:aod?170:d.clock.y,centerX:106}}
export function widgetLayout(d:Design){const first=Math.max(330,d.clock.y+d.clock.size+58);return{dateTop:first-16,metricsTop:first+26}}
export function clampInteger(value:number,min:number,max:number,fallback:number){if(!Number.isFinite(value))return fallback;return Math.min(max,Math.max(min,Math.round(value)))}
