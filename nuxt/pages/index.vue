<template>
	<section>
		<h1>Posts</h1>
		<article v-for="post in posts">
			<h2><nuxt-link :to="`/posts/${post.id}`">{{ post.title }}</nuxt-link></h2>
		</article>
	</section>
</template>

<script>
import { fetch } from 'fetch-undici'

export default {
  async asyncData({ params }) {
  	const id = params.id
  	const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  	const posts = await response.json()
  	return { posts }
  }
}
</script>

<style src="./style.css" />
