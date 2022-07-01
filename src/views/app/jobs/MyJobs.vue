<template>
  <div>
    <h1>My Jobs</h1>
    <!--<div v-for="(value, name) in this.$store.getters.getJobs" v-bind:key="(value)">
      {{ name }}: {{ value }}
    </div>-->
    <p>{{ this.jobs }}</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MyJobs",
  methods: {
    ...mapActions([
      "retrieveJobs",
    ]),
  },
  computed: {
    ...mapGetters({
      jobs: "getJobs",
    }),
  },
  created() {
    this.retrieveJobs()
  },
}
</script>

<style scoped>

</style>