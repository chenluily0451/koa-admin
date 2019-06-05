
const res = {
     "res_success" : (msg)=>{
        return{
            status:200,
            result:"success",
            msg:msg
        }
    },
    "res_success_data" : (msg,data)=>{
        return{
            status:200,
            result:"success",
            msg:msg,
            data:data
        }
    },
    "res_error400" : (msg)=>{
        return{
            status:400,
            result:"error",
            msg:msg
        }
    },
    "res_error500" : (msg)=>{
        return{
            status:500,
            result:"error",
            msg:msg
        }
    },
    "res_error401" : (msg)=>{
        return{
            status:401,
            result:"error",
            msg:msg
        }
    }
}

export default res
