<script setup>
import { logger } from '../utils/Logger.js';
import { ref } from 'vue'
import Pop from '../utils/Pop.js';
import { blogsService } from '../services/BlogsService.js';
import { Modal } from 'bootstrap';

const editableBlogData = ref({
	body: '',
	imgUrl: '',
})

async function createBlog() {
	try {
		logger.log('Creating blog! ✈️', editableBlogData)
		// NOTE .value pulls out the data stored inside of the ref object (whatever is inside the parentheses)

		await blogsService.createBlog(editableBlogData.value)

		// NOTE form.reset()
		editableBlogData.value = {
			body: '',
			imgUrl: '',
		}

		// NOTE closes Modal after submit
		Modal.getOrCreateInstance('#blogFormModal').hide()
	}
	catch (error) {
		Pop.error(error);
	}
}
</script>


<template>
	<div class="modal fade" id="blogFormModal" tabindex="-1" aria-labelledby="blogFormModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="blogFormModalLabel">Create a new post!</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<!-- NOTE .prevent is the equivalent of event.preventDefault() -->
					<form @submit.prevent="createBlog()">

						<div class="form-floating mb-3">

							<textarea v-model="editableBlogData.body" type="String" class="form-control rows" id="blogBody"
								placeholder="Post Body" required maxlength="5000">
							</textarea>
							<label for="blogBody">Share whats happening</label>
						</div>

						<div class="form-floating mb-3">
							<input v-model="editableBlogData.imgUrl" type="url" class="form-control" id="blogUrl"
								placeholder="Blog Thumbnail" maxlength="500" required>
							<label for="blogUrl">Insert Image Address...</label>
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
.sendBtn {
	background-color: var(--bgLightBlue);
	border: none;
	transition: 0.4s;
}

.sendBtn:hover {
	background-color: var(--bgGreen);
}

.rows {
	min-height: 50vh;
}
</style>