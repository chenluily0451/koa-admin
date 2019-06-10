
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


// 全局出错处理
const handler = async (ctx, next) =>{
    try{
        await next();
    }catch(err){
        ctx.response.status = err.statusCode ||err. status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>出错啦</p>';
        ctx.app.emit('error', err, ctx);
    }
}

app.on('error', function(err){
    console.log(err);
})




app.listen(3033,()=>{
    console.log("backend started ...");
});
