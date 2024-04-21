<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue'


</script>

<template>
	<!-- NOTE: You can have more than one <header> tag in your html. It's like having multiple <h1> elements -->
	<header class="newFont">
		<Navbar />
	</header>
	<main class="newFont">
		<router-view />
	</main>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

hr {
	z-index: 1020;
}

:root {
	--main-height: calc(100vh - 32px - 64px);
	--bgDarkBlue: #2b2d42;
	--bgPink: #E86A92;
	--bgGold: #FFD41C;
	--bgLightBlue: #2bb6cf;
	--bgTurquoise: #41e2ba;
	--bgGreen: #22c122;
	--bgGray: #868686;
	--bgRed: #da0000;
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

.sendBtn {
	background-color: var(--bgLightBlue);
	border: none;
	transition: 0.4s;
	color: white;
}

.sendBtn:hover {
	background-color: var(--bgGreen);
	color: white;
}


// footer {
// 	display: grid;
// 	place-content: center;
// 	height: 32px;
// }</style>
