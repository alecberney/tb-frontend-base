<template>
  <div>
    <h1>JWT</h1>
    <p>{{ $keycloak.idToken }}</p>
    <h3>Decoded JWT</h3>
    <div v-for="(value, name) in $keycloak.idTokenParsed" v-bind:key="(value)">
      {{ name }}: {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenData"
}
</script>

<style scoped>

</style>