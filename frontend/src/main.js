import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
  router,
  axios
}).$mount('#app')


axios.interceptors.response.use(
    response=> {
      if(response.status != 200 || response.data.status != 200) {
        Vue.prototype.$message({
          type:'error',
          message:'出错'
        });
      }
      return response;
    },
    (error) => {
      return Promise.reject(error)
    }
)
// axios.interceptors.request.use(
//     response=> {
//       if(response.status != 200 || response.data.status != 200) {
//         Vue.prototype.$message({
//           type:'error',
//           message:'出错'
//         });
//       }
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
// )
