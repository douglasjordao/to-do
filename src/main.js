import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Loading, QSpinnerFacebook, Notify } from 'quasar';

import App from './App.vue';
import router from './router';

import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    Loading,
    Notify,
  },
  config: {
    loading: {
      spinner: QSpinnerFacebook,
      spinnerColor: 'yellow',
      spinnerSize: 140,
      backgroundColor: 'gray',
      messageColor: 'black',
    },
    dark: true,
  },
});

app.mount('#app');
