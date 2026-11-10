<script lang="ts">
	import { resolve } from '$app/paths';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="{data.tag.name}: beginner trading articles"
	description="Beginner-friendly articles about {data.tag.name.toLowerCase()} from Dollar Man Learning."
	path="/blog/tag/{data.tag.slug}"
/>

<div class="container-page py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={resolve('/blog')} class="font-medium text-silver-200 hover:underline">Blog</a>
	</nav>
	<h1 class="mt-2 text-4xl font-extrabold tracking-tight text-ink">{data.tag.name}</h1>
	<div class="mt-8"><PostList posts={data.posts} /></div>
</div>
