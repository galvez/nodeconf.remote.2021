<template>
  <section>
    <h1>Posts</h1>
    <article v-for="post in posts">
      <h2><router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link></h2>
    </article>
  </section>
</template>

<script>
import { useHydration } from 'fastify-vite-vue/client'
import { fetch } from 'fetch-undici'

export const path = '/'

export async function getPayload () {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await response.json()
  return posts
}

export default {
  async setup () {
    const { $payload } = await useHydration({ getPayload })
    return { posts: $payload }
  }
}
</script>

<style src="./style.css" />
