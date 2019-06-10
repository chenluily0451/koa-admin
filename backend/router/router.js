import res from './response';
const router = require('koa-router')();
// 解析request的body的功能(post请求)

import * as co from "../mysql/connect";


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

});

// 登录
router.post('/api/login', async function (ctx, next) {
    let req = ctx.request.body
    if(!req.mobile || !req.password){
        ctx.body = res.res_error400("参数错误")

    }else{
        let login_search_result = await co.login_search_sql(req.mobile,req.password);
        console.log("login_search_result",login_search_result);
        if(login_search_result.msg.length>0){
            ctx.body = res.res_error401(login_search_result.msg)
        }else{
            ctx.body = res.res_success("登录成功")
        }
    }
});

// 获取用户列表
router.get('/api/getUserList', async function (ctx, next) {
    let getuserlist_result = await co.getuserlist_sql();
    console.log("getuserlist_result",getuserlist_result)
    ctx.body = res.res_success_data("返回成功",getuserlist_result)
});


// 删除用户表
router.post('/api/deleteUserList', async function (ctx, next) {
    let req = ctx.request.body;
    if(!req.id){
        ctx.body = res.res_error400("参数错误")
    }else{
        let deleteuserlist_result = await co.deleteuserlist_sql(req.id);
        console.log("deleteuserlist_result",deleteuserlist_result)
        if(deleteuserlist_result.msg.length>0){
            ctx.body = res.res_error401(deleteuserlist_result.msg)
        }else{
            ctx.body = res.res_success("删除成功",deleteuserlist_result)
        }
    }
});

// 更新用户表
router.post("/api/updateUser",async  function (ctx,next) {
    let req = ctx.request.body;
    console.log(req)
    if(!req.id){
        ctx.body = res.res_error400("参数错误")
    }else{
        let updateuser_result = await co.updateuser_sql(req.id,req.name,req.password,req.address);
        if(updateuser_result.msg.length>0){
            ctx.body = res.res_error401(updateuser_result.msg)
        }else{
            ctx.body = res.res_success("更新成功",updateuser_result)
        }
    }
});

// 通过id获取用户信息
router.get("/api/getuserinfo", async function (ctx,next) {
    let req_query = ctx.request.query;
    if(!req_query.id){
        ctx.body = res.res_error400("参数错误")
    }else{
        let getuserinfo_result = await co.getuserinfo_sql(req_query.id);
        console.log("getuserinfo_result",getuserinfo_result);
        ctx.body = res.res_success_data("查询成功",getuserinfo_result)

    }
});

// 404
router.get("*",async (ctx,next)=>{
    console.log("页面找不到了")
    ctx.response.status = 404;
    await ctx.render("404.html")
})


export default router;
