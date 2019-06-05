import sqls from './sqls';
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database:'koaAdmin',
    port: 3306
},);

conn.connect();
console.log(111111111111111)
// 查询重复
const register_search_sql = function(mobile){
    let re = {}
    return new Promise(function (resolve, reject) {
        conn.query(sqls.register_search_sql(mobile),"",function (err,res) {
            console.log(sqls.register_search_sql(mobile))
            if(err){console.log(err)}
            console.log(res)
            if(res.length > 0){
                re["msg"] =  "该手机号已注册，请更换手机号"
            }else{
                re["msg"] =  "";
            }
            resolve(re);
        });
    });

}

// 插入t_user
const register_insert_sql = function(name,mobile,password,address){
    let re = {}
    return new Promise(function(resolve,reject){
        conn.query(sqls.register_insert_sql(name,mobile,password,address),"",function (err,res) {
            console.log(sqls.register_insert_sql(name,mobile,password,address))
            if(err){console.log(err)}
            if(res.affectedRows != 1){
                re["msg"] =  "注册失败"
            }else{
                re["msg"] = ""
            }
            resolve(re);
        });
    })

}

// 登录查询
const login_search_sql = function (mobile,password) {
    let re = {}
    return new Promise(function (resolve,reject) {

        conn.query(sqls.login_search_sql(mobile,password),"",function (err,res) {
            console.log("sqls.login_search_sql(mobile,password)",sqls.login_search_sql(mobile,password))
            if(err){console.log(err)}
            console.log(res)
            if(res.length > 0){
                re["msg"] =  ""
            }else{
                re["msg"] =  "账号或密码有误";
            }
            resolve(re);
        });
    })
}

// 查询用户列表

const getuserlist_sql = function (mobile,password) {
    let re = []
    return new Promise(function (resolve,reject) {
        conn.query(sqls.getuserlist_sql(),"",function (err,res) {
            console.log("sqls.getuserlist_sql()",sqls.getuserlist_sql())
            if(err){console.log(err)}
            // console.log("res",res)
            res.forEach((val,i)=>{
                re.push(val)
            })
            resolve(re);
        });
    })
}



export {
    register_search_sql,
    register_insert_sql,
    login_search_sql,
    getuserlist_sql
};

