
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
import router from './router/router'


app.use(views('error',{
    extension: 'html'
}));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());




app.listen(3033,()=>{
    console.log("backend started ...");
});
