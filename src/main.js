import { createApp } from 'vue'
import App from './App.vue'
import VueColumnsResizable from 'vue-columns-resizable';
 
const app = createApp(App); // Create a Vue app instance

// Use the plugin
app.use(VueColumnsResizable);

// Mount the app
app.mount('#app');
