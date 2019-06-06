const sqls = {
    "init_sql" : function () {
        return "CREATE TABLE IF NOT EXISTS t_user(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(16) NOT NULL ," +
            "mobile VARCHAR(11) NOT NULL ," +
            "password VARCHAR(6) NOT NULL ," +
            "address VARCHAR(80) NOT NULL ," +
            "create_date TIMESTAMP NULL DEFAULT now())" +
            "ENGINE=InnoDB DEFAULT CHARSET=utf8";
    },
    "register_search_sql" : function (mobile) {
        return "select * from t_user where mobile = " + mobile
    },
    "register_insert_sql" : function (name,mobile,password,address) {
        return "insert into t_user (name,mobile,password,address) values ('" + name + "','" + mobile + "','" + password +"','" + address + "')"
    },
    "login_search_sql" : function (mobile,password) {
        return "select * from t_user where mobile = " + mobile + " and password =" + password
    },
    "getuserlist_sql" : function () {
        return "select * from t_user"
    }
}



export default sqls
