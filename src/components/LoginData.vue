<template>
  <div>
    <h1>Data</h1>
    <ul>
      <li>{{ username }}</li>
      <li>{{ name }}</li>
      <li>{{ surname }}</li>
      <li>{{ email }}</li>
    </ul>
    <h2>JWT</h2>
    <p>{{ jwt }}</p>
    <h3>Decoded JWT</h3>
    <div v-for="(value, name) in decodedJwt" v-bind:key="(value)">
      {{ name }}: {{ value }}
    </div>
    <h3> Request return message</h3>
    <p v-if="error"> {{ error.message }} </p>
    <p v-else> {{ response }} </p>
  </div>
</template>

<script>
import { apiRequest } from '@/apicalls'

export default {
  name: "LoginData",
  props: {
    name: String,
    surname: String,
    username: String,
    email: String,
    jwt: String,
    decodedJwt: Object,
    resource_access: Object,
  },
  data() {
    return {
      error: null,
      response: null
    }
  },
  beforeMount() {
    //this.$cookies.set('token', this.jwt);
    apiRequest(this.jwt)
        .then(response => {
          this.response = response.data;
        })
        .catch(error => {
          this.error = error;
        })
  }
}
</script>

<style scoped>

</style>