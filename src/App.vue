<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { computed, onMounted, ref } from 'vue';
import Pop from './utils/Pop.js';
import { picturesService } from './services/PicturesService.js';


const pictures = computed(() => AppState.pictures)

async function getPictures() {
	try {
		await picturesService.getPictures()
	}
	catch (error) {
		Pop.error(error);
	}
}

onMounted(() => {
	getPictures()
})

</script>

<template>

	<header class="newFont">
		<Navbar />
	</header>

	<div class="container-fluid">

		<div class="row justify-content-start align-items-start">
			<div class="col-12 col-md-9 col-lg-10 p-0">
				<main class="newFont">
					<router-view />
				</main>
			</div>

			<div class="mb-5 col-2 col-md-3 col-lg-2 sticky-top hidden1 text-center">
				<img v-for="picture in pictures" :key="picture.id" :src="picture.tall" class="mt-3 img-fluid imgHeight"
					alt="">
			</div>

		</div>
	</div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

.imgHeight {
	height: 44vh;
}

@media only screen and (max-width: 767px) {
	.hidden1 {
		display: none;
	}
}

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

.ads {
	width: 100%;
}


// footer {
// 	display: grid;
// 	place-content: center;
// 	height: 32px;
// }</style>
