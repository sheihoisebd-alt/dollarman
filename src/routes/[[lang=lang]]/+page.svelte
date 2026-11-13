<script lang="ts">
	import HomePage from '#lib/components/HomePage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<HomePage lang={data.lang} modules={data.modules} faqs={data.faqs} />
