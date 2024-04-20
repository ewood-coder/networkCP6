<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


</script>

<template>
	<header class="newFont">
		<Navbar />
	</header>
	<main class="newFont">
		<router-view />
	</main>
	<!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
	--main-height: calc(100vh - 32px - 64px);
	--bgDarkBlue: #2b2d42;
	--bgPink: #E86A92;
	--bgGold: #FFD41C;
	--bgLightBlue: #2bb6cf;
	--bgTurquoise: #41e2ba;
	--bgGreen: #22c122;
	--bgWhite: #F7F7F9;
}

.newFont {
	font-family: "Roboto Mono", monospace;
}

.primaryColor {
	background-color: var(--bgDarkBlue);
}

.hidden {
	display: none;
}


// footer {
// 	display: grid;
// 	place-content: center;
// 	height: 32px;
// }</style>
