const sqls = {
    "search_sql" : function (mobile) {
        return "select * from t_user where mobile = " + mobile
    },
    "insert_sql" : function (name,mobile,password,address) {
        return "insert into t_user (name,mobile,password,address) values ('" + name + "','" + mobile + "','" + password +"','" + address + "')"
    }
}



export default sqls
