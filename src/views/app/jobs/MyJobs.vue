<template>
  <div>
    <h1>My Jobs</h1>
    <div v-for="(value, name) in this.$store.getters.getJobs" v-bind:key="(value)">
      {{ name }}: {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MyJobs"
}
</script>

<style scoped>

</style>