<template>
  <nav>
    <router-link to="/app/new-job">New Job</router-link> |
    <router-link to="/app/my-jobs">My Jobs</router-link> |
    <router-link to="/app/unassigned-jobs">Unassigned Jobs</router-link> |
    <router-link to="/app/job-categories">Job Categories</router-link> |
    <router-link to="/app/settings">Settings</router-link> |
    <router-link to="/app/token">Token</router-link>
  </nav>
</template>

<script>
export default {
  name: "SideNav"
}
</script>

<style scoped>

</style>