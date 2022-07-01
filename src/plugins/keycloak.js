import Vue from 'vue';
import Keycloak from 'keycloak-js';

const initOptions = {
    url: `${process.env.VUE_APP_CLOAK_URL}`,
    realm: `${process.env.VUE_APP_CLOAK_REALM}`,
    clientId: `${process.env.VUE_APP_CLOAK_CLIENT_ID}`,
};

const _keycloak = new Keycloak(initOptions);

/*const Plugin = {
    install: (app) => {
        app.$keycloak = _keycloak;
    },
};*/

const Plugin = {
    install: Vue => {
        Vue.$keycloak = _keycloak;
    },
};

// Singleton
Plugin.install = Vue => {
    Vue.$keycloak = _keycloak;
    Object.defineProperties(Vue.prototype, {
        $keycloak: {
            get() {
                return _keycloak;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;