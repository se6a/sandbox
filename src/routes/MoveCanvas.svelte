<svelte:head>
	<title>Test 1</title>
</svelte:head>

<script>
	setTimeout(() => scrollTo(0,0), 100);

	let boxPosX = Math.round(Math.random() * document.body.scrollWidth);
	let boxPosY = Math.round(Math.random() * document.body.scrollHeight);
	let _$Box;

	function goToBox() {
		const crntPos_x = window.scrollX;
		const crntPos_y = window.scrollY;
		const { left, top, width, height } = _$Box.getBoundingClientRect();
		const { clientWidth, clientHeight } = document.body;

		const offset_x = crntPos_x
			+ left + width / 2
			- clientWidth / 2;

		const offset_y = crntPos_y
			+ top + height / 2
			- clientHeight / 2;

		scrollTo(offset_x, offset_y);
	}

	function goToBoxAnimated() {
		const fps = 120; 
		let frames = 30;

		
		const { left, top, width, height } = _$Box.getBoundingClientRect();
		const { clientWidth, clientHeight } = document.body;

		const offset_x = (
				left + width / 2
				- clientWidth / 2
			) / frames;

		const offset_y = (
				top + height / 2
				- clientHeight / 2
			) / frames;

		function move() {

			const crntOff_x = window.scrollX + offset_x;
			const crntOff_y = window.scrollY + offset_y;


			scrollTo(crntOff_x, crntOff_y);
			frames--;

			if (frames > 0) {
				setTimeout(() => {
					requestAnimationFrame(move)
				}, 1000 / fps);
			}
		};

		requestAnimationFrame(move);
	}
</script>

<main class="Content" on:click={goToBoxAnimated}>
	<p class="Info">
		Klick auf Body um zur blauen Box zu scrollen.
		Refresh Page für neue Position der Box.
	</p>
	<article id="Box" class="Item" style="--x: {boxPosX}px; --y: {boxPosY}px;" bind:this={_$Box}></article>
</main>

<style>
	.Info {
    position: absolute;
    font-size: 5vmin;
		font-weight: 600;
    color: white;
		top: 2vmin;
		left: 5vmin;
		white-space: pre-line;
  }

	:global(body), .Content {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.Content {
		position: relative;
		background: linear-gradient(45deg, black, white);
		width: 200%;
		height: 200vh;
		padding: 50vh 50vw;
		border: 3px solid lawngreen;
	}

	.Item {
		background-color: cornflowerblue;
		width: 200px;
		height: 200px;
		left: var(--x);
		top: var(--y);
		position: relative;
		transition: transform 400ms;
		transform-origin: left top;
	}

</style>