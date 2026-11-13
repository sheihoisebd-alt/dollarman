<!--
	Points down at the Telegram button: a glowing capsule with three chevrons that light up in turn,
	and a soft ring pulsing out behind it. With reduced motion it is a still, fully lit arrow.
-->
<div class="pointer" aria-hidden="true">
	<span class="ring"></span>
	<span class="ring-late ring"></span>
	<span class="capsule">
		<svg viewBox="0 0 24 40" fill="none" class="chevrons">
			<defs>
				<linearGradient id="pointer-stroke" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" style:stop-color="var(--color-telegram-light)" />
					<stop offset="100%" stop-color="#ffffff" />
				</linearGradient>
			</defs>
			<path d="M5 6l7 7 7-7" />
			<path d="M5 16l7 7 7-7" />
			<path d="M5 26l7 7 7-7" />
		</svg>
	</span>
</div>

<style>
	.pointer {
		position: relative;
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 5.25rem;
		animation: float 2.4s ease-in-out infinite;
	}

	.capsule {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 4.25rem;
		border-radius: 999px;
		background:
			linear-gradient(180deg, rgb(42 171 238 / 0.28), rgb(20 121 184 / 0.12)) padding-box,
			linear-gradient(
					180deg,
					var(--color-telegram-light),
					rgb(42 171 238 / 0.15) 60%,
					var(--color-gold-400)
				)
				border-box;
		border: 1.5px solid transparent;
		box-shadow:
			0 0 18px rgb(42 171 238 / 0.55),
			0 0 44px rgb(42 171 238 / 0.3),
			inset 0 0 12px rgb(92 203 255 / 0.25);
		backdrop-filter: blur(4px);
	}

	.chevrons {
		width: 1.5rem;
		height: 2.5rem;
		filter: drop-shadow(0 0 6px rgb(92 203 255 / 0.9));
	}
	.chevrons path {
		stroke: url(#pointer-stroke);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		animation: cascade 1.5s ease-in-out infinite;
	}
	/* nth-of-type, not nth-child: <defs> is the svg's first child */
	.chevrons path:nth-of-type(2) {
		animation-delay: 0.2s;
	}
	.chevrons path:nth-of-type(3) {
		animation-delay: 0.4s;
	}

	.ring {
		position: absolute;
		inset: 0.5rem 0.875rem;
		border-radius: 999px;
		border: 2px solid rgb(42 171 238 / 0.6);
		animation: ripple 2s ease-out infinite;
	}
	.ring-late {
		animation-delay: 1s;
	}

	@keyframes cascade {
		0%,
		100% {
			opacity: 0.2;
			transform: translateY(-3px);
		}
		45% {
			opacity: 1;
			transform: translateY(2px);
		}
	}
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}
	@keyframes ripple {
		0% {
			opacity: 0.8;
			transform: scale(0.85);
		}
		100% {
			opacity: 0;
			transform: scale(1.7);
		}
	}

	@media (min-width: 640px) {
		.pointer {
			width: 5.5rem;
			height: 6.5rem;
		}
		.capsule {
			width: 3.25rem;
			height: 5.25rem;
		}
		.chevrons {
			width: 1.8rem;
			height: 3rem;
		}
		.ring {
			inset: 0.625rem 1.125rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ring {
			display: none;
		}
	}
</style>
