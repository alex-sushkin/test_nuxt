<template>
  <div>
    <h1>Posts</h1>
    <ul v-if="posts">
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="`/posts/${post.id}`">{{ post.title }}</nuxt-link>
      </li>
    </ul>
    <p>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/posts')
  posts.value = res.data
  console.log(res)
})
</script>