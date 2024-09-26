<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
    <div v-if="comments.length">
      <h2>Comments:</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
      </ul>
    </div>
  </div>
  <div v-else>Загрузка</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const post = ref({})
const comments = ref([])
definePageMeta({
  title: computed(() => post.value.seo_title || 'Загрузка...'),
  meta: [
    { name: 'description', content: computed(() => post.value.seo_description || 'Загрузка...') },
    { property: 'og:title', content: computed(() => post.value.seo_title || 'Загрузка...') },
    { property: 'og:description', content: computed(() => post.value.seo_description || 'Загрузка...') },
    { name: 'keywords', content: computed(() => post.value.seo_keywords || '') }
  ]
})
onMounted(async () => {
  try {
    const postRes = await axios.get(`http://localhost:3001/posts/${route.params.id}`)
    post.value = postRes.data

    const commentsRes = await axios.get(`http://localhost:3001/comments?postId=${route.params.id}`)
    comments.value = commentsRes.data
    console.log(route.meta)
} catch (error) {
console.error('Error fetching post or comments:', error)
}
})
</script>