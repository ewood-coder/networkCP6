<script setup>
import { onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';


const accountData = ref({
	name: '',
	picture: '',
	coverImg: '',
	bio: '',
	linkedin: '',
	github: '',
	graduated: '',
	class: '',
})

onMounted(() => {
	// accountData.value = AppState.account // they become the same thing, until saved they they are different
	accountData.value = { ...AppState.account } // creates a copy, with no reference, so as we change it, it doesn't change the account in the appstate
})

async function saveAccount() {
	try {
		await accountService.updateAccount(accountData.value)
		Pop.toast("Account saved!", 'success')
	} catch (error) {
		Pop.toast("Could not save account changes", 'error')
		console.error(error)
	}
}

</script>


<template>
	<hr class="mb-3" />
	<form @submit.prevent="saveAccount()" class="row">
		<div class="mb-3 col-12 col-md-4 mb-5">
			<label for="account-name">Name</label>
			<input v-model="accountData.name" class="form-control" type="text" id="account-name" minlength="3" required
				maxlength="25" />
		</div>
		<div class="mb-3 col-12 col-md-4 mb-5">
			<label for="account-picture">Picture</label>
			<input v-model="accountData.picture" class="form-control" type="url" id="account-picture" maxlength="500">
		</div>
		<div class="mb-3 col-12 col-md-4 mb-5">
			<label for="account-cover-image">Cover Image</label>
			<input v-model="accountData.coverImg" class="form-control" type="url" id="account-cover-image" maxlength="500">
		</div>



		<div class="mb-3 col-12 col-md-6 mb-5">
			<label for="account-class">Class Year</label>
			<input v-model="accountData.class" class="form-control" type="text" id="account-class" maxlength="100">
		</div>

		<!-- SELECT MENU -->
		<div class="mb-3 col-12 col-md-6 mb-5">
			<label for="account-graduated">Graduated</label>

			<select v-model="accountData.graduated" class="form-select text-center" aria-label="Default select example">
				<option selected disabled>Select an Option:</option>
				<option :value="true">Yes</option>
				<option :value="false">No / Not Yet</option>
			</select>
		</div>



		<div class="mb-3 col-12 col-md-6 mb-5">
			<label for="account-github-link">GitHub</label>
			<input v-model="accountData.github" class="form-control" type="url" id="account-github-link" maxlength="500">
		</div>
		<div class="mb-3 col-12 col-md-6 mb-5">
			<label for="account-linkedin-link">Linkedin</label>
			<input v-model="accountData.linkedin" class="form-control" type="url" id="account-linkedin-link"
				maxlength="500">
		</div>



		<div class="mb-3 col-12 mb-5">
			<label for="account-bio">Bio</label>
			<textarea v-model="accountData.bio" name="account-bio" id="account-bio" rows="5" class="form-control"
				maxlength="500"></textarea>
		</div>

		<div class="mb-3 col-12 d-flex justify-content-center">
			<button class="btn btn-success text-light">Save <i class="mdi mdi-floppy"></i></button>
		</div>

	</form>
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
</style>
