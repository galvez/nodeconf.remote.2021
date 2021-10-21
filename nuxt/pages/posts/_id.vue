<template>
	<section>
		<article>
			<h1>{{ post.title }}</h1>
			<div v-html="post.body" />
		</article>
	</section>
</template>

<script>
import { fetch } from 'fetch-undici'

export default {
  async asyncData({ params }) {
  	const id = params.id
  	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  	const post = await response.json()
  	return { post }
  }
}
</script>

<style src="../style.css" />
