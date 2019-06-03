
const Koa = require('koa');
const app = new Koa();
import router from './router/router'

import conn from "./mysql/connect"


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3033,()=>{
    console.log("backend started ...");
});
