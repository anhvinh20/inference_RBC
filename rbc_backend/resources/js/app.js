import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import axios from 'axios';
import VueAxios from 'vue-axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(VueAxios, axios);
