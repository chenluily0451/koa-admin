<template>
    <div>
        <el-row>
            <div class="mainContent">
                <div class="grid-content bg-purple-light">
                    <el-form ref="form" :label-position="'top'" :rules="rules" :model="form" label-width="80px">
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="form.password" type="password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item class="btn-wrap">
                            <el-button type="primary" @click="submitForm('form')">登录</el-button>
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
        name: 'Login',
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
            return {
                form: {
                    mobile:'18221136691',
                    password:'123456',
                },
                rules: {

                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {validator: validateMobile, trigger: 'blur'  }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginRequest(this.form)
                    } else {
                        return false;
                    }
                });
            },
            loginRequest(data){
                this.axios.post(req.login,data).then((response)  =>{
                    this.$alert(response.data.msg, '提示', {
                        confirmButtonText: '确定'
                    });
                })
            }
        }
    }
</script>
