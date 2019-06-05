import VueRouter from 'vue-router'
import Login from "../components/Login"
import Register from "../components/Register"
import List from "../components/List"


const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/list', component: List }
]

const router = new VueRouter({
    routes
});

router.beforeEach((to,from,next)=>{
    // 临时解决
    if(!localStorage.getItem("userStorage")){
        if(to.path.indexOf("list") > -1){
            next({path:'/login'})
        }
    }
    next()
});

export default router;
