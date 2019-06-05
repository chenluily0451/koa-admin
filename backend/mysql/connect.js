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
        conn.query(sqls.search_sql(mobile),"",function (err,res) {
            console.log(sqls.search_sql(mobile))
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
        conn.query(sqls.insert_sql(name,mobile,password,address),"",function (err,res) {
            console.log(sqls.insert_sql(name,mobile,password,address))
            if(err){console.log(err)}
            console.log("res123123",res)
            if(res.affectedRows != 1){
                re["msg"] =  "注册失败"
            }else{
                re["msg"] = ""
            }
            resolve(re);
        });
    })

}









// conn.query(deleteSQL, function (err0, res0) {
//     if (err0) console.log(err0);
//     console.log("DELETE Return ==> ");
//     console.log(res0);
//
//     //insert
//     conn.query(insertSQL, function (err1, res1) {
//         if (err1) console.log(err1);
//         console.log("INSERT Return ==> ");
//         console.log(res1);
//
//         //query
//         conn.query(selectSQL, function (err2, rows) {
//             if (err2) console.log(err2);
//
//             console.log("SELECT ==> ");
//             for (var i in rows) {
//                 console.log(rows[i]);
//             }
//
//             //update
//             conn.query(updateSQL, function (err3, res3) {
//                 if (err3) console.log(err3);
//                 console.log("UPDATE Return ==> ");
//                 console.log(res3);
//
//                 //query
//                 conn.query(selectSQL, function (err4, rows2) {
//                     if (err4) console.log(err4);
//
//                     console.log("SELECT ==> ");
//                     for (var i in rows2) {
//                         console.log(rows2[i]);
//                     }
//                 });
//             });
//         });
//     });
// });


export {register_search_sql,register_insert_sql};

