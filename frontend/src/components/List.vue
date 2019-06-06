<template>
    <div>
        <div class="mainContent">
            <div class="btnWrap">
                <el-button @click="quit()" class="quit">退出</el-button>
            </div>
            <el-collapse  accordion>
                <template v-for="(item,index) in userList">
                    <el-collapse-item :title=item.mobile v-bind:key=index>
                        <div>ID：{{item.id}}</div>
                        <div>姓名：{{item.name}}</div>
                        <div>地址：{{item.address}}</div>
                        <div class="control">操作：
                            <el-button type="danger" plain @click="del(item.id,index)" class="controlBtn">删除</el-button>
                            <el-button type="primary" plain @click="modify(item.id,index)" class="controlBtn">修改</el-button>
                        </div>
                    </el-collapse-item>
                </template>
            </el-collapse>
            <div v-if="nodata">
                <p style="text-align: center">暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
    import req from "../router/request";
    export default {
        name: 'List',
        data() {
            return {
                "userList":"",
                "nodata":false
            }
        },
        methods: {
            "quit":function () {
                localStorage.clear();
                this.$router.push("/")
            },
            "del":function (id,index) {
                this.$confirm('是否删除此用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    console.log(id)
                    this.axios.post(req.del,{id:id}).then((response)  =>{
                        if(response.data.status == 200){
                            this.userList.splice(index,1);
                            this.$message({
                                type: 'success',
                                message: response.data.msg
                            });
                        }
                    })

                });
            },
            "modify":function (id) {
                this.$router.push("/modifyUserInfo/" + id)
            }
        },
        mounted() {
            this.axios.get(req.getUserList).then((response)  =>{
                if(response.data.data && response.data.data.length ){
                    this.userList =response.data.data;
                }else{
                    this.nodata = true
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    .btnWrap{
        text-align: right;
        margin-bottom: 20px;
    }
    .control{
        .controlBtn{
            float: right;
            margin-right: 10px;
        }
    }
</style>
