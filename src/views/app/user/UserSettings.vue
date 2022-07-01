<template>
  <div>
    <h1>User Settings</h1>
    <h2>{{ this.$store.getters.getUser.require_status_email }}</h2>
    <h2>{{ this.$store.getters.getUser.require_files_email }}</h2>
    <h2>{{ this.$store.getters.getUser.require_messages_email }}</h2>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
}
</script>

<style scoped>

</style>