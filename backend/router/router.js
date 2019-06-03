import res from './response'
const router = require('koa-router')();

// 注册
router.get('/api/register', function (ctx, next) {
    let req_query = JSON.parse(ctx.request.query.data);
    if(!req_query.name || !req_query.mobile || !req_query.password){
        ctx.body = res.res_error400("参数错误")
    }else{
        console.log(req_query.name)
        console.log(req_query.mobile)
        console.log(req_query.password)
        ctx.body = res.res_success("注册成功")
    }

})

export default router;
//{"name":"chenlu","mobile":"18221136691","password":"123456","repassword":"123456","desc":"shanghai"}'
