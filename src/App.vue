<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <LoginData
        :username="keycloak.idTokenParsed.preferred_username"
        :name="keycloak.idTokenParsed.given_name"
        :surname="keycloak.idTokenParsed.family_name"
        :email="keycloak.idTokenParsed.email"
        :jwt="keycloak.idToken"
        :decoded-jwt="keycloak.idTokenParsed"
        :resource_access="keycloak.idTokenParsed.resource_access"
    />
  </div>
</template>

<script>
import LoginData from "@/components/LoginData";

export default {
  name: 'App',
  components: {
    LoginData,
  },
  props: {
    keycloak: Object
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
