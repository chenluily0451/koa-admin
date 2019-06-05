<template>
    <div>
        <div class="mainContent">
            <el-collapse  accordion>
                <template v-for="(item,index) in userList">
                    <el-collapse-item :title=item.mobile>
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
