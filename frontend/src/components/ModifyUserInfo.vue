<template>
    <div>
        <el-row>
            <div class="mainContent">
                <div class="grid-content bg-purple-light">
                    <el-form ref="form" :label-position="'top'" :rules="rules" :model="form" label-width="80px">
                        <el-form-item  label="姓名" prop="name">
                            <el-input  v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号" :disabled=true></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="form.password" type="password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="repassword">
                            <el-input v-model.trim="form.repassword" type="password" placeholder="请输入确认密码"></el-input>
                        </el-form-item>
                        <el-form-item label="地址详情">
                            <el-input type="textarea" placeholder="请输入地址" v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item class="btn-wrap">
                            <el-button type="danger" @click="submitForm('form')">修改</el-button>
                            <el-button @click="cancel()">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
    import req from "../router/request";

    export default {
        name: 'ModifyUserInfo',
        data() {
            var validateMobile = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入手机号'));
                    } else {
                        if (!/^((13[0-9])|(17[0-9])|(18[0-9])|(15[0-9]))\d{8}$/.test(value)) {
                            callback(new Error('手机号格式不对'));
                        }
                        callback();
                    }
            };
            var validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length<6) {
                        callback(new Error('密码不能低于6位'));
                    }
                    callback();
                }
            };
            var validatePwd2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                form: {
                    name: '',
                    mobile:'',
                    password:'',
                    repassword:'',
                    address: '',
                    id:this.$route.params.id
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {validator: validateMobile, trigger: 'blur'  }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {validator: validatePwd, trigger: 'blur'  }
                    ],
                    repassword: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        {validator: validatePwd2, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateUserRequest(this.form)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateUserRequest(data){
                this.axios.post(req.updateUser,data).then((response)  =>{
                    console.log(response)
                    this.$alert(response.data.msg, '提示', {
                        confirmButtonText: '确定',
                        callback:() =>{
                            if (response.data.status == 200){
                                this.$router.push("../list");
                            }
                        }
                    });

                })
            },
            cancel(){
                this.$router.push("/list")
            }
        },
        mounted() {
            let userid = this.$route.params.id
            this.axios.get(req.getuserinfo,{params: {id: userid}}).then((response)  =>{
                if(response.status == 200){
                    response.data.data.forEach((val)=> {
                        this.form.name = val.name;
                        this.form.password = val.password;
                        this.form.mobile = val.mobile;
                        this.form.repassword = val.password;
                        this.form.address = val.address;
                    })
                }
            });
        }
    }
</script>
<style lang="scss">
    .mainContent{
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        text-align: left;

        .btn-wrap{
            text-align: center;
        }
    }

</style>
