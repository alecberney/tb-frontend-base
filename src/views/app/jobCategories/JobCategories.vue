<template>
  <div>
    <h1>Job Categories</h1>
    <p>{{ this.jobCategories }}</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "JobCategories",
  methods: {
    ...mapActions([
      "retrieveJobCategories",
    ]),
  },
  computed: {
    ...mapGetters({
      jobCategories: "getJobCategories",
    }),
  },
  created() {
    this.retrieveJobCategories()
  },
}
</script>

<style scoped>

</style>