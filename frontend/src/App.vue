<template>
  <div id="app">
    <h1>Short Link Service</h1>
    <input v-model="url" placeholder="Enter URL" />
    <button @click="createLink">Create</button>
    <div v-if="shortUrl">
      <p>Short URL: <a :href="shortUrl">{{ shortUrl }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const url = ref('')
const shortUrl = ref('')

const createLink = async () => {
  if (!url.value) return
  const res = await axios.post('/api/links', { url: url.value })
  shortUrl.value = res.data.short_url
}
</script>
