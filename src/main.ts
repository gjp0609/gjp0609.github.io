import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const iconListPromise = import('@element-plus/icons');
import { store, key } from './store';
import router from './router/index';
import App from './App.vue';

import '../docs/material-design-icons/material-design-icons.css';
import './styles/base.scss';

const app = createApp(App);

const iconList = ['Notebook'];

app.use(ElementPlus);
app.use(store, key);
app.use(router);
console.log(iconListPromise);
iconListPromise.then((icons) => {
    console.log(icons);
    for (const iconName of iconList) {
        // @ts-ignore
        app.component(iconName, icons[iconName]);
    }
});
app.mount('#app');
