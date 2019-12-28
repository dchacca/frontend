import './style.css'
import Vue from 'vue'

Vue.component('my-component', require('./components/Example.vue').default);

const app = new Vue({
    el: '#app',
});