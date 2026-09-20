import{describe,it,expect}from'vitest';import{encodeImage,encodeList}from'./imageCodec';
const r=(w=2,h=2)=>({width:w,height:h,rgba:new Uint8Array(w*h*4).fill(255)});
describe('image encoder',()=>{it('encodes image and list blocks',()=>{expect(encodeImage(r()).length).toBeGreaterThan(12);expect(encodeList([r(),r()]).length).toBeGreaterThan(20)})});
