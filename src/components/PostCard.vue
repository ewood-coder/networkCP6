<script setup>
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { Post } from '../models/Post.js';
import { format, render, cancel, register } from 'timeago.js';
import { profilesService } from '../services/ProfilesService.js';




const isLiked = computed(() => {
	return props.post.likeIds.find(p => p == AppState.account?.id)
})

function likePost() {
	try {
		postsService.likePost(props.post)
	}
	catch (error) {
		Pop.toast('Could not like post', 'error');
	}
}
// -------------------------------------------------------------------
const props = defineProps({ post: { type: Post, required: true } })
console.log(props.post)

const account = computed(() => AppState.account)


async function destroyPost(postId) {
	try {
		const wantsToDestroy = await Pop.confirm("Are you sure you want to delete that post?")

		if (!wantsToDestroy) return

		logger.log('DESTROYING POST 🌐🗑️', postId)

		await postsService.destroyPost(postId)
	} catch (error) {
		Pop.error(error)
	}
}

const localeFunc = (number, index, totalSec) => {
	// number: the timeago / timein number;
	// index: the index of array below;
	// totalSec: total seconds between date to be formatted and today's date;
	return [
		['just now', 'right now'],
		['%ss', 'in %s seconds'],
		['1 min', 'in 1 minute'],
		['%s min', 'in %s minutes'],
		['1h', 'in 1 hour'],
		['%sh', 'in %s hours'],
		['1d', 'in 1 day'],
		['%sd', 'in %s days'],
		['1wk', 'in 1 week'],
		['%swks', 'in %s weeks'],
		['1 month', 'in 1 month'],
		['%s months', 'in %s months'],
		['1yr', 'in 1 year'],
		['%syr', 'in %s years']
	][index];
};
// register your locale with timeago
register('my-locale', localeFunc);
</script>

<template>
	<div class="bgColor text-light rounded shadow brdr">

		<div class="col-12">
			<div class="p-1 p-md-3 w-100 d-flex">

				<div class="d-flex">
					<RouterLink :to="{ name: 'Profile', params: { profileId: post.creatorId } }"
						class="align-content-center cursor">
						<div class="bgPic">
							<img :src=post.creator.picture alt="picture of creator" class="pfp p-0">
						</div>
					</RouterLink>
				</div>


				<div class="pt-3 ps-3 w-100">
					<h4 class="mb-0"> {{ post.creator.name }}</h4>


					<div class="mt-2 d-flex">
						{{ format(post.createdAt.getTime(), 'my-locale') }}

						<div v-if="post.creator.graduated == true" class="ps-4">
							<div><i class="mdi mdi-school"></i></div>
						</div>

						<div v-else>
							<div></div>
						</div>
					</div>
				</div>

				<div>
					<button v-if="post.creatorId == account?.id" @click="destroyPost(post.id)" class="btnDelete p-1"
						:title="`Delete Post`">
						<i class="mdi mdi-trash-can-outline fs-4 px-1 px-md-2"></i>
					</button>
				</div>
			</div>

			<div class="px-3 px-md-4 my-1 mt-3 mt-md-0 my-md-1 w-100 d-flex">
				<p class="word-break">{{ post.body }}</p>
			</div>

		</div>

		<div class="col-12 text-center" v-if="post.imgUrl">
			<img :src="post.imgUrl" alt="" class="img-fluid post-img mt-3">
		</div>
		<div class="col-12" v-else></div>

		<div class=" d-flex justify-content-end align-items-center px-3">
			<div v-if="!account?.id" class="d-flex gap-1">
				<i class="mdi mdi-heart-off-outline px-2 fs-1 btnLikeOff py-1" title="Login Required"></i>

				<div class="d-flex align-items-center mx-1 fs-5" title="Like Count">{{ post.likeIds.length }}</div>
			</div>

			<div v-else>
				<div v-if="post.creatorId == account?.id" class="d-flex">
					<i class="mdi mdi-heart-off-outline px-2 fs-1 btnLikeOff py-1" title="Can't like your own posts"></i>

					<div class="d-flex align-items-center mx-1 fs-5" title="Like Count">{{ post.likeIds.length }}</div>
				</div>
				<!-- --------------------------------------------------------------------------- -->
				<div v-else class="d-flex">
					<button v-if="!isLiked" @click="likePost()" class="btnLike py-1" :title="`Like Post`">
						<i class="mdi mdi-heart-outline px-1 fs-1"></i>
					</button>

					<button v-if="isLiked" @click="likePost()" class="btnAlreadyLiked py-1" :title="`Unlike Post`">
						<i class="mdi mdi-heart px-1 fs-1"></i>
					</button>

					<div class="d-flex align-items-center mx-1 fs-5" title="Like Count">{{ post.likeIds.length }}</div>
				</div>
			</div>
		</div>

	</div>

</template>

<style scoped lang="scss">
.word-break {
	overflow-wrap: anywhere;
}

.btnLike {
	color: white;
	background-color: #3f4161;
	border: none;
}

.btnAlreadyLiked {
	color: #e44b7e;
	background-color: #3f4161;
	border: none;
}

.btnLikeOff {
	color: white;
	background-color: #3f4161;
	border: none;
}

.btnDelete {
	color: red;
	background-color: #3f4161;
	border: solid 1px red;
	border-radius: 5px;
	transition: 0.4s ease-in-out;

}

.btnDelete:hover {
	color: white;
	background-color: #bf0101;
	border: solid 1px #bf0101;
	transition: 0.4s ease-in-out;
}

.bgPic {
	border-radius: 9999px;
	transition: 0.4s ease-in-out;
}

.bgPic:hover {
	background-color: var(--bgLightBlue);
	transition: 0.4s ease-in-out;
}

.cursor:hover {
	cursor: pointer;
}

.bgColor {
	background-color: #3f4161;
}

.brdr {
	overflow: hidden;
}

.post-img {
	width: 50%;
	height: auto;
	// max-width: 20em;
	// max-height: 20em;
	// object-fit: cover;
}

@media only screen and (max-width: 767px) {
	.post-img {
		width: 100%;
		height: auto;
	}

	.w100 {
		width: 100%;
	}
}

.responsive {
	width: 100%;
	height: auto;
}

.pfp {
	width: 5rem;
	height: 5rem;
	border-radius: 9999px;
	margin: 5px;
}
</style>
