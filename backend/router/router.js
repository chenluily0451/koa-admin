import res from './response'
const router = require('koa-router')();
import * as co from "../mysql/connect"


// 注册
router.get('/api/register', async function (ctx, next) {
    let req_query = JSON.parse(ctx.request.query.data);
    if(!req_query.name || !req_query.mobile || !req_query.password){
        ctx.body = res.res_error400("参数错误")
    }else{
        let register_search_result = await co.register_search_sql(req_query.mobile)

        if(register_search_result.msg.length>0){
            ctx.body = res.res_error401(register_search_result.msg)
        }else{
            let register_insert_result = await co.register_insert_sql(req_query.name,req_query.mobile,req_query.password,req_query.address);
            console.log("register_insert_result",register_insert_result);
            if(register_insert_result.msg.length>0){
                ctx.body = res.res_error401(register_insert_result.msg)
            }else{
                ctx.body = res.res_success("注册成功")
            }
        };

    }

})

export default router;
//{"name":"chenlu","mobile":"18221136691","password":"123456","repassword":"123456","desc":"shanghai"}'
