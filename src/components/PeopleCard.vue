<script setup>
import { Profile } from '../models/Profile.js';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { onMounted } from 'vue';


const props = defineProps({ profile: { type: Profile, required: true } })

// onMounted(() => {
// 	console.log(props)
// })
</script>


<template>
	<div class="col-12 bgColor text-light rounded shadow brdr">
		<div class="p-1 p-md-3 w-100 d-flex">

			<div class="d-flex">
				<RouterLink :to="{ name: 'Profile', params: { profileId: props.profile.id } }"
					class="align-content-center cursor">
					<div class="bgPic">
						<img :src=props.profile.picture alt="picture of creator" class="pfp p-0">
					</div>
				</RouterLink>
			</div>


			<div class="pt-3 ps-3 w-100">
				<div class="align-items-center">
					<div class="mb-1">{{ props.profile.class }}</div>

					<h4 class="mb-0 pe-0">{{ props.profile.name }}</h4>
					<div v-if="props.profile.graduated == true">
						<div><i class="mdi mdi-school"></i></div>
					</div>

					<div v-else>
						<div></div>
					</div>


				</div>
			</div>

		</div>
	</div>
</template>




<style scoped lang="scss">
.word-break {
	overflow-wrap: anywhere;
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