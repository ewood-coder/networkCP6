<script setup>
import { AppState } from '../AppState.js';
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { useRouter } from 'vue-router';

async function nextPage() {
	try {
		await postsService.nextPage()
	}
	catch (error) {
		Pop.toast("Could not change page", 'error')
	}
}

async function previousPage() {
	try {
		await postsService.previousPage()
	}
	catch (error) {
		Pop.toast("Could not change page", 'error')
	}
}

const router = useRouter()
let searchTerm = ''

async function search(event) {
	router.push({ name: 'Search', query: { search: searchTerm } })
}

</script>

<template>
	<div class="p-2 pt-4 bgDarkBlue btmRightRound sticky-top">

		<form @submit.stop.prevent="search">
			<div class="input-group">
				<input v-model="searchTerm" type="search" class="form-control" placeholder="Search" aria-label="Search"
					aria-describedby="search-addon" />

				<button type="button" class="btn btn-outline-primary sendBtn" data-mdb-ripple-init><i
						class="mdi mdi-magnify fs-5 px-4"></i></button>
			</div>
		</form>

		<div>

			<div class="d-flex justify-content-center gap-4 gap-md-5 align-items-center my-2 mb-0">
				<div class=" text-light text-center fs5">
					Page:<br />
					{{ AppState.currentPage }} / {{ AppState.totalPages }}
				</div>

				<button :hidden="AppState.currentPage <= 1" class="custom-btn btn-3 my-2 text-light"
					@click="previousPage()">
					<span class="d-flex align-items-center justify-content-center">Previous</span>
				</button>

				<button :hidden="AppState.currentPage >= AppState.totalPages" class="custom-btn btn-3 my-2 text-light"
					@click="nextPage()">
					<span class="d-flex align-items-center justify-content-center">Next</span>
				</button>
			</div>
		</div>

	</div>
</template>

<style scoped>
@media only screen and (min-width: 768px) {
	.btmRightRound {
		border-radius: 0px 0px 15px 0px;
	}
}

.fs5 {
	font-size: 18px;
}

.bgDarkBlue {
	background-color: var(--bgDarkBlue);
}

.custom-btn {
	width: 130px;
	height: 40px;
	padding: 10px 25px;
	border: 2px solid;
	/* font-family: 'Lato', sans-serif; */
	font-family: "Libre Baskerville", serif;
	font-weight: 500;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
}

.btn-3 {
	line-height: 39px;
	padding: 0;
}

.btn-3:hover {
	background: transparent;
	color: white;
}

.btn-3 span {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
}

.btn-3:before,
.btn-3:after {
	position: absolute;
	content: "";
	left: 0;
	top: 0;
	background: white;
	transition: all 0.3s ease;
}

.btn-3:before {
	height: 0%;
	width: 2px;
}

.btn-3:after {
	width: 0%;
	height: 2px;
}

.btn-3:hover:before {
	height: 100%;
}

.btn-3:hover:after {
	width: 100%;
}

.btn-3 span:before,
.btn-3 span:after {
	position: absolute;
	content: "";
	right: 0;
	bottom: 0;
	background: white;
	transition: all 0.3s ease;
}

.btn-3 span:before {
	width: 2px;
	height: 0%;
}

.btn-3 span:after {
	width: 0%;
	height: 2px;
}

.btn-3 span:hover:before {
	height: 100%;
}

.btn-3 span:hover:after {
	width: 100%;
}

@media only screen and (max-width: 767px) {
	.custom-btn {
		width: 25%;
		height: 30px;
		/* padding: 10px 25px; */
		border: 2px solid;
		/* font-family: 'Lato', sans-serif; */
		font-family: "Libre Baskerville", serif;
		font-weight: 500;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: inline-block;
	}
}
</style>
