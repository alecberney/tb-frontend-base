<template>
  <div>
    <h1>Unassigned Jobs</h1>
    <p>{{ this.jobs }}</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UnassignedJobs",
  methods: {
    ...mapActions([
      "retrieveUnassignedJobs",
    ]),
  },
  computed: {
    ...mapGetters({
      jobs: "getUnassignedJobs",
    }),
  },
  created() {
    this.retrieveUnassignedJobs()
  },
}
</script>

<style scoped>

</style>