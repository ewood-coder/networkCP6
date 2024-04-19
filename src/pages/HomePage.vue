<script setup>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { blogsService } from '../services/BlogsService.js';
import { AppState } from '../AppState.js';
import BlogCard from '../components/BlogCard.vue';
import BlogFormModal from '../components/BlogFormModal.vue';
import { loadState, saveState } from '../utils/Store.js';
import { profilesService } from '../services/ProfilesService.js';
import ProfilePage from './ProfilePage.vue';


const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const blogs = computed(() => AppState.blogs)

async function getBlogs() {
	try {
		await blogsService.getBlogs()
	}
	catch (error) {
		Pop.error(error);
	}
}


onMounted(() => {
	getBlogs()
})

</script>

<template>
	<div class="container">

		<section>
			<section class="row">
				<div class="col-12 mt-3 d-flex align-items-center gap-4">
					<h2>Create Post: </h2>
					<!-- NOTE v-if="account != null" if the user is logged in, show the button -->
					<button v-if="account" class="fs-3 text-light sendBtn rounded px-2" title="Create a new post!"
						data-bs-toggle="modal" data-bs-target="#blogFormModal">

						<i class="mdi mdi-plus"></i>
					</button>
				</div>
			</section>

			<hr class="mb-5" />

			<section class="row">
				<h1 class="mb-4 text-center">Posts:</h1>
				<div v-for="blog in blogs" :key="blog.id" class="col-12 mb-5">
					<BlogCard :blog="blog" />
				</div>
				<BlogFormModal />
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
