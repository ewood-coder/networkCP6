<script setup>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import PostFormModal from '../components/PostFormModal.vue';
import { loadState, saveState } from '../utils/Store.js';
import { profilesService } from '../services/ProfilesService.js';
import ProfilePage from './ProfilePage.vue';


const profile = computed(() => AppState.activeProfile)
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
	getPosts()
})

</script>

<template>
	<div class="container">

		<section>
			<section class="row">
				<div class="col-12 mt-3 d-flex align-items-center gap-4">
					<h2>Create Post: </h2>
					<!-- NOTE v-if="account != null" if the user is logged in, show the button -->
					<button v-if="account != null" class="fs-3 text-light sendBtn rounded px-2" title="Create a new post!"
						data-bs-toggle="modal" data-bs-target="#postFormModal">

						<i class="mdi mdi-plus"></i>
					</button>
				</div>
			</section>

			<hr class="mb-5" />

			<section class="row">
				<h1 class="mb-4 text-center">Posts:</h1>
				<div v-for="post in posts" :key="post.id" class="col-12 mb-5">
					<PostCard :post="post" />
				</div>
				<PostFormModal />
			</section>
		</section>

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
