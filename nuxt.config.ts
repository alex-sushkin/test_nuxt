// import { defineNuxtConfig } from 'nuxt'
import axios from 'axios'

export default defineNuxtConfig({
  ssr: true, // Включаем SSR (Server-Side Rendering)
  head: {
    title: 'My Nuxt App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Nuxt.js app' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'http://localhost:3000',
    async routes() {
      const { data: posts } = await axios.get('http://localhost:3001/posts')
      return posts.map(post => `/posts/${post.id}`)
    }
  }
})