<script setup>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import PostFormModal from '../components/PostFormModal.vue';
import SearchBar from '../components/SearchBar.vue';


const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)

async function getPosts() {
	try {
		await postsService.getPosts()
	}
	catch (error) {
		Pop.error(error);
	}
}


onMounted(() => {
	AppState.useProfile = false
	AppState.currentPage = 1
	getPosts()
})

</script>

<template>

	<div>
		<header class="sticky-top mt-0 pt-0">
			<SearchBar />
		</header>

		<main>
			<div class="container">

				<section>
					<section class="row">
						<div class="col-12 mt-3 d-flex align-items-center gap-4">
							<h2>Create Post: </h2>
							<!-- NOTE v-if="account != null" if the user is logged in, show the button -->
							<button v-if="account != null" class="fs-3 text-light sendBtn rounded px-2"
								title="Create a new post!" data-bs-toggle="modal" data-bs-target="#postFormModal">

								<i class="mdi mdi-plus"></i>
							</button>
						</div>
					</section>

					<hr class="mb-5" />

					<section class="row">
						<div class="d-flex align-items-center justify-content-center gap-3 my-3 mt-2 my-md-4 w-100">
							<h1 class="mb-1 text-center">Posts:</h1>
						</div>

						<div v-for="post in posts" :key="post.id" class="col-12 mb-5">
							<PostCard :post="post" />
						</div>
						<PostFormModal />
					</section>
				</section>

			</div>
		</main>
	</div>

</template>

<style scoped lang="scss">
.sendBtn {
	background-color: var(--bgLightBlue);
	border: none;
	transition: 0.4s;
}

.sendBtn:hover {
	background-color: var(--bgGreen);
}
</style>
