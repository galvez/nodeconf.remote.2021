<template>
  <section>
    <article>
      <h1>{{ post.title }}</h1>
      <div v-html="post.body" />
    </article>
  </section>
</template>

<script>
import { useRoute } from 'vue-router'
import { useHydration } from 'fastify-vite-vue/client'
import { fetch } from 'fetch-undici'

export const path = '/posts/:id'

export async function getData ({ req, params }) {
  const id = params.id
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await response.json()
  return { post }
}

export default {
  async setup () {
    const { $data } = await useHydration({ getData })
    return $data
  }
}
</script>

<style src="./style.css" />
