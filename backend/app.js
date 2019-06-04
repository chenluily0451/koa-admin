
const Koa = require('koa');
const app = new Koa();
import router from './router/router'




app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3033,()=>{
    console.log("backend started ...");
});
