<template>
  <nav>
    <router-link to="/app/new-job">New Job</router-link> |
    <router-link to="/app/my-jobs">My Jobs</router-link> |
    <router-link to="/app/unassigned-jobs">Unassigned Jobs</router-link> |
    <router-link to="/app/job-categories">Job Categories</router-link> |
    <router-link to="/app/settings">Settings</router-link> |
    <router-link to="/app/token">Token</router-link> |
    <a @click="logout">Logout</a>
  </nav>
</template>

<script>
export default {
  name: "SideNav",
  methods: {
    logout() {
      this.$keycloak.logout();
    }
  }
}
</script>

<style scoped>

</style>