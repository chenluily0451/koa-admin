const sqls = {
    "register_search_sql" : function (mobile) {
        return "select * from t_user where mobile = " + mobile
    },
    "register_insert_sql" : function (name,mobile,password,address) {
        return "insert into t_user (name,mobile,password,address) values ('" + name + "','" + mobile + "','" + password +"','" + address + "')"
    },
    "login_search_sql" : function (mobile,password) {
        return "select * from t_user where mobile = " + mobile + " and password =" + password
    }
}



export default sqls
