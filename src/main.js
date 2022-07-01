import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as Keycloak from 'keycloak-js';

Vue.config.productionTip = false

let keycloak = Keycloak({
  url: `${process.env.VUE_APP_CLOAK_URL}`,
  realm: `${process.env.VUE_APP_CLOAK_REALM}`,
  clientId: `${process.env.VUE_APP_CLOAK_CLIENT_ID}`
});

keycloak.init({ onLoad: 'login-required' }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    //Vue.$log.info("Authenticated");
    console.log('Authenticated');

    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App, { props: { keycloak: keycloak } })
    })
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(30000).then((refreshed) => {
      if (refreshed) {
        //Vue.$log.info('Token refreshed' + refreshed);
        console.log('Token refreshed ' + refreshed);
      } else {
        //Vue.$log.warn('Token not refreshed, valid for '
            //+ Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        console.log('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)
            + ' seconds');
      }
    }).catch(() => {
      //Vue.$log.error('Failed to refresh token');
      console.log('Failed to refresh token');
    });
  }, 30000)

}).catch(() => {
  //Vue.$log.error("Authenticated Failed");
  console.log('Authenticated Failed');
});

export {
  keycloak
}

/*new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')*/
