<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import PeopleCard from '../components/PeopleCard.vue';


const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const profiles = computed(() => AppState.profiles)

const route = useRoute()
watch(route.query, () => {
	// if (route.query.search) {
	// }
})

onMounted(() => {
	AppState.currentPage = 1
	console.log(route.query.search)

	profilesService.searchProfiles(route.query.search)
	postsService.searchPosts(route.query.search)
})

</script>

<template>

	<div class="container-fluid">

		<section class="row">
			<div class="d-flex align-items-center justify-content-center gap-3 my-3 mt-2 my-md-4 w-100">
				<h1 class="mb-1 text-center">People:</h1>
			</div>

			<div v-for="profile in profiles" :key="profile.id" class="col-12 mb-5">
				<PeopleCard :profile="profile" />
			</div>
		</section>

		<section class="row">
			<div class="d-flex align-items-center justify-content-center gap-3 my-3 mt-2 my-md-4 w-100">
				<h1 class="mb-1 text-center">Posts:</h1>
			</div>

			<div v-for="post in posts" :key="post.id" class="col-12 mb-5">
				<PostCard :post="post" />
			</div>
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
