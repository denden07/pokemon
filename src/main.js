import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import VueAxios from 'vue-axios'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VueSweetalert2 from 'vue-sweetalert2';


import './assets/main.css'
import { createStore } from 'vuex'
const store = createStore({
   state() {
    return {
        count:12,
    };
   } 
})
const app = createApp(App)

app.use(store); 
app.use(router)
app.use(VueAxios, axios);
app.use(LoadingPlugin);
app.use(VueSweetalert2);

app.mount('#app')
