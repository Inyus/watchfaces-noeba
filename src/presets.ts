import type{Design}from'./schema';
export type Preset={id:string;name:string;keywords:string[];palette:string[];mood:string;composition:string;example:string;builtIn?:boolean;seed?:Design};
export const starterPresets:Preset[]=[
{id:'dark-series',name:'Dark series vibe',keywords:['dark','oscura','noche','night','caravana','rv','desert','crime','thriller','breaking bad'],palette:['#050807','#d5a84a','#67d3b0'],mood:'cinematic, tense, nocturnal, dusty, high contrast',composition:'A story scene fills the lower half; very large time above it; tiny data stays aligned at the bottom.',example:'A night caravan in the desert, amber windows, cold stars and large readable digits.',builtIn:true},
{id:'cartoon-tv',name:'Cartoon / TV character',keywords:['cartoon','dibujos','character','personaje','simpsons','homer','titó','tito','sx3','tv'],palette:['#121026','#ffd642','#ff6b91'],mood:'playful, bold, expressive, saturated',composition:'Character artwork gets one clear focal slot; the clock avoids the face and uses the theme palette; widgets become small graphic labels.',example:'A sleepy sofa character with warm yellow digits, or a children’s TV host in a neon set.',builtIn:true},
{id:'clean-minimal',name:'Clean minimal',keywords:['minimal','limpio','clean','simple','elegante','sobrio','monochrome'],palette:['#030506','#f2f5f4','#72e2c4'],mood:'quiet, precise, premium, spacious',composition:'Time dominates the upper-middle area; one accent line and a restrained data stack below.',example:'Near-black field, continuous typography, one mint accent and generous breathing room.',builtIn:true}
];
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function scorePreset(idea:string,p:Preset){const text=normalize(idea);return p.keywords.reduce((n,k)=>n+(text.includes(normalize(k))?1:0),0)}
export function matchPreset(idea:string,presets:Preset[]){return presets.map(p=>({p,score:scorePreset(idea,p)})).sort((a,b)=>b.score-a.score).find(x=>x.score>0)?.p}
export function loadPresets(){try{const saved=JSON.parse(localStorage.getItem('watchfaces.noeba/presets')||'[]') as Preset[];return[...starterPresets,...saved.filter(p=>!starterPresets.some(x=>x.id===p.id))]}catch{return starterPresets}}
export function savePresets(presets:Preset[]){localStorage.setItem('watchfaces.noeba/presets',JSON.stringify(presets.filter(p=>!p.builtIn)))}
