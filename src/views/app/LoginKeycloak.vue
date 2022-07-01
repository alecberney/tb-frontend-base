<template>
  <div>
    <h1>Login</h1>
  </div>
</template>

<script>
export default {
  name: "LoginKeycloak",
  beforeMount() {
    this.$keycloak.login();
  }
}
</script>

<style scoped>

</style>