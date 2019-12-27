import './style.css'
import Vue from 'vue'
import MyComponent from './components/Example.vue'
Vue.config.productionTip = false;

Vue.component('my-component', MyComponent);
const app = new Vue({
    el: '#app',
});
