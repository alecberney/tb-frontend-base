import Vue from 'vue'
import App from './App.vue'
import * as Keycloak from 'keycloak-js';

Vue.config.productionTip = false

let initOptions = {
  url: `${process.env.VUE_APP_CLOAK_URL}`,
  realm: `${process.env.VUE_APP_CLOAK_REALM}`,
  clientId: `${process.env.VUE_APP_CLOAK_CLIENT_ID}`,
  onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    //Vue.$log.info("Authenticated");
    console.log('Authenticated');

    new Vue({
      el: '#app',
      render: h => h(App, { props: { keycloak: keycloak } })
    })
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(1000).then((refreshed) => {
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
  }, 6000)

}).catch(() => {
  //Vue.$log.error("Authenticated Failed");
  console.log('Authenticated Failed');
});

/*new Vue({
  render: h => h(App),
}).$mount('#app')*/
