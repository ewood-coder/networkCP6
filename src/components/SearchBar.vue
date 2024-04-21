<script setup>
</script>

<template>
	<div class="p-3 bgDarkBlue sticky-top">
		<div class="input-group">
			<input type="search" class="form-control" placeholder="Search" aria-label="Search"
				aria-describedby="search-addon" />
			<button type="button" class="btn btn-outline-primary sendBtn" data-mdb-ripple-init><i
					class="mdi mdi-magnify fs-5 px-4"></i></button>
		</div>
	</div>
</template>

<style scoped>
.bgDarkBlue {
	background-color: var(--bgDarkBlue);
}
</style>
