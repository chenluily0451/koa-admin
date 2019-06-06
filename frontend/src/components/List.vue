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
</style>
