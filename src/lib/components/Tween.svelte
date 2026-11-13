<!--
	A number that glides to its new value instead of jumping (calculator results).
	The formatted final value is what renders on the server and for reduced motion.
-->
<script lang="ts">
	import { untrack } from 'svelte';
	import { animate } from 'motion';

	let { value, format }: { value: number; format: (n: number) => string } = $props();

	let shown = $state(untrack(() => value));

	$effect(() => {
		const target = value;
		const from = untrack(() => shown);
		if (from === target || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = target;
			return;
		}
		const controls = animate(from, target, {
			duration: 0.6,
			ease: [0.2, 0.7, 0.2, 1],
			onUpdate: (v) => (shown = v)
		});
		return () => controls.stop();
	});
</script>

{format(shown)}
