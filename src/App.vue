<template>
  <div id="app">
    <SideNav />
    <router-view/>
    <p>Connected user: {{ this.$store.getters.getUser }}</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import SideNav from "@/components/SideNav";
import { mapActions } from "vuex"

export default {
  components: {
    SideNav
  },
  /*props: {
    keycloak: Object
  },*/
  methods: {
    ...mapActions(["retrieveUser"]),
  },
  created() {
    this.retrieveUser(this.$keycloak.idTokenParsed.preferred_username)
  },
}
</script>