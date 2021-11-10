import { createApp } from 'vue'
import App from './App.vue'

setTimeout(() => {
  const div = document.createElement("div");
  div.id = "hay-vue-app";
  document.body.appendChild(div);
  createApp(App).mount('#hay-vue-app')
}, 10000);

