import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { store, key } from './store';
import router from './router/index';
import App from './App.vue';

import '../docs/common/css/material-design-icons/material-design-icons.css';
import './styles/base.scss';

const app = createApp(App);

app.use(ElementPlus);
app.use(store, key);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount('#app');
