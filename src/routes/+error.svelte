<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Dollar Man Learning</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container-page max-w-2xl py-20 text-center">
	<p class="text-sm font-semibold text-silver-200">Error {page.status}</p>
	<h1 class="mt-2 text-3xl font-bold text-ink">
		{page.status === 404 ? 'We could not find that page' : 'Something went wrong'}
	</h1>
	<p class="mt-3 text-body">Try the free course or go back to the home page.</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href={resolve('/')}
			class="btn-metal inline-flex min-h-12 items-center rounded-xl px-5 font-semibold">Home</a
		>
		<a
			href={resolve('/course')}
			class="inline-flex min-h-12 items-center rounded-xl border border-line-strong px-5 font-semibold text-ink"
			>Free course</a
		>
	</div>
</div>
