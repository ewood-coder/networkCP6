<script setup>
import { logger } from '../utils/Logger.js';
import { ref } from 'vue'
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { Modal } from 'bootstrap';

const editablePostData = ref({
	body: '',
	imgUrl: '',
})

async function createPost() {
	try {
		logger.log('Creating post! 🌐', editablePostData)
		// NOTE .value pulls out the data stored inside of the ref object (whatever is inside the parentheses)

		await postsService.createPost(editablePostData.value)

		// NOTE form.reset()
		editablePostData.value = {
			body: '',
			imgUrl: '',
		}

		// NOTE closes Modal after submit
		Modal.getOrCreateInstance('#postFormModal').hide()
	}
	catch (error) {
		Pop.error(error);
	}
}
</script>


<template>
	<div class="modal fade" id="postFormModal" tabindex="-1" aria-labelledby="postFormModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="postFormModalLabel">Create a new post!</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<!-- NOTE .prevent is the equivalent of event.preventDefault() -->
					<form @submit.prevent="createPost()">

						<div class="form-floating mb-3">

							<textarea v-model="editablePostData.body" type="String" class="form-control rows" id="postBody"
								placeholder="Post Body" required maxlength="5000">
							</textarea>
							<label for="postBody">Share whats happening</label>
						</div>

						<div class="form-floating mb-3">
							<input v-model="editablePostData.imgUrl" type="url" class="form-control" id="postUrl"
								placeholder="Post Thumbnail" maxlength="500">
							<label for="postUrl">Insert Image Address...</label>
						</div>

						<div class="text-end">
							<button class="fs-4 text-light sendBtn rounded p-2 px-3" type="submit">
								<div>Post <i class="mdi mdi-send"></i></div>
							</button>
						</div>
					</form>


				</div>
			</div>
		</div>
	</div>

</template>


<style scoped>
.rows {
	min-height: 50vh;
}
</style>