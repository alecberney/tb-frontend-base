<template>
  <div>
    <h1>My Jobs</h1>
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