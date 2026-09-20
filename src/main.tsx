import{StrictMode}from'react';import{createRoot}from'react-dom/client';import App,{jsonSchema}from'./App';
if(location.pathname==='/schema/v1.json'){document.body.innerHTML=`<pre>${JSON.stringify(jsonSchema,null,2).replace(/</g,'&lt;')}</pre>`}else createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
