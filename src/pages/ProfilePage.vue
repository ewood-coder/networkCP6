<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';



const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.profilePosts)

const route = useRoute()

async function getProfile() {
	try {
		await profilesService.getProfile(route.params.profileId)
	} catch (error) {
		Pop.toast("could not get profile", 'error'),
			console.error(error)
	}
}

async function getProfilePosts() {
	try {
		await postsService.getProfilePosts(route.params.profileId)
	} catch (error) {
		Pop.toast("Could not get profile posts", 'error')
		console.error(error)
	}
}

onMounted(() => {
	AppState.useProfile = true
	AppState.currentPage = 1
	getProfile()
	getProfilePosts()
})

</script>


<template>

	<header class="sticky-top mt-0 pt-0">
		<SearchBar />
	</header>

	<main>
		<div class="container mt-2">
			<!-- NOTE v-if keeps the profile from trying to draw, before the network response is back -->
			<section class="row" v-if="profile">
				<img class="cover-img" :src="profile.coverImg" alt="">

				<div class="col-12 text-center">
					<img class="profile-img mt-3" :src="profile.picture" alt="">
					<h2 class="my-3">{{ profile.name }}</h2>
				</div>

				<!-------- CLASS -------->
				<div class="col-12 col-md-4 d-flex align-items-center justify-content-center">
					<span v-if="!profile.class"></span>

					<span v-else class="d-flex mt-4 fs-5">
						<div><u>Class</u>:</div>&nbsp;
						<div> {{ profile.class }} </div>
					</span>
				</div>

				<!-------- GRADUATED -------->
				<div class="col-12 col-md-4 d-flex align-items-center justify-content-center">
					<span v-if="profile.graduated == true" class="d-flex mt-4 fs-5">
						<div><u>Graduated</u>:</div>&nbsp;
						<span><i class="mdi mdi-check-bold"></i><i class="mdi mdi-school"></i></span>
					</span>

					<span v-else class="d-flex mt-4 fs-5">
						<div><u>Graduated</u>:</div>&nbsp;
						<span><i class="mdi mdi-cancel"></i><i class="mdi mdi-school"></i></span>
					</span>
				</div>

				<!-------- SITE LINKS -------->
				<div class="col-12 col-md-4 gap-2 d-flex align-items-center justify-content-center">
					<span v-if="!profile.github"></span>
					<span v-else class="d-flex">
						<div class="text-center mt-4" v-if="profile.github">
							<a :href="profile.github" target="_blank"><i class="mdi mdi-github fs-1 link"></i></a>
						</div>
					</span>

					<span v-if="!profile.linkedin"></span>
					<span v-else class="d-flex mt-4">
						<div class="text-center" v-if="profile.linkedin">
							<a :href="profile.linkedin" target="_blank"><i class="mdi mdi-linkedin fs-1 link"></i></a>
						</div>
					</span>
				</div>

				<!-------- BIO -------->
				<div class="col-12 mb-3 mb-md-5 d-flex align-items-center justify-content-center">
					<span v-if="!profile.bio"></span>

					<span v-else class="d-flex">
						<div class="my-5 text-center">{{ profile.bio }}</div>
					</span>
				</div>
			</section>
		</div>

		<section class="row justify-content-center">

			<h1 class="mb-4 text-center">Posts:</h1>

			<div v-for="post in posts" :key="post.id" class="col-10 mb-5">
				<PostCard :post="post" />
			</div>
		</section>

	</main>

</template>


<style lang="scss" scoped>
.cover-img {
	width: 100%;
	height: 20vh;
	margin-bottom: -10vh;
	object-fit: cover;
	object-position: center;
}

.profile-img {
	height: 100px;
	width: 100px;
	object-fit: cover;
	object-position: center;
}

.link {
	color: var(--bgLightBlue);
	transition: 0.4s;
}

.link:hover {
	color: var(--bgGreen);
}
</style>
