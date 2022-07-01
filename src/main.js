import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import authentication from "@/plugins/keycloak";
import updateToken from "/src/middleware/keycloakUpdateToken";

Vue.config.productionTip = false

Vue.use(authentication);

// keycloak tuto followed:
// https://medium.com/js-dojo/authentication-made-easy-in-vue-js-with-keycloak-c03c7fff67bb
// https://davidtruxall.com/secure-a-vue-js-app-with-keycloak/
// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin

const KEYCLOAK_ON_LOAD = 'login-required';

Vue.$keycloak
    .init({
        onLoad: `${KEYCLOAK_ON_LOAD}`,
        //checkLoginIframe: false, // Good for debugging if refresh bug -> not in prod!
        checkLoginIframeInterval: 600, // Every 10 min
    })
    .then(() => { //.then((authenticated) => {
        new Vue({
            router,
            store,
            render: h => h(App),
      }).$mount('#app');
        window.onfocus = () => {
            updateToken();
        };
    });