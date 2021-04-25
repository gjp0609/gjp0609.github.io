import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { store, key } from './store';
import router from './router/index';
import App from './App.vue';

import '../static/material-design-icons/material-design-icons.css';
import './styles/base.scss';

const app = createApp(App);

app.use(ElementPlus);
app.use(store, key);
app.use(router);
app.mount('#app');
