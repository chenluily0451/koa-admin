
const Koa = require('koa');
const app = new Koa();
import conn from "./mysql/connect"


app.use(()=>{
    console.log("backend started ...")
})
app.listen(3033);
