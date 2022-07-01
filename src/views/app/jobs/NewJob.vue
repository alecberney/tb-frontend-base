<template>
  <div>
    <h1>New Job</h1>
    <div>
      <label></label>
      <input v-model="title" type="text"/>
      <input v-model="description" type="text"/>
      <input v-model="deadline" type="date"/>
      <input v-model="job_category_id" type="number"/>
      <button type="submit" @click="addJob"></button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NewJob",
  data() {
    return {
      title: null,
      description: null,
      deadline: null,
      job_category_id: null,
    }
  },
  methods: {
    ...mapActions([
      "storeJob",
    ]),
    addJob() {
      this.storeJob({
        'title': this.title,
        'description': this.description,
        'deadline': this.deadline,
        'job_categpry_id': this.job_category_id,
      })
    }
  },
}
</script>

<style scoped>

</style>