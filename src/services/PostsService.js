
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class PostsService {

	async searchPosts(query) {
		const response = await api.get(`api/posts?query=${query}`)
		logger.log('SEARCHING FOR POSTS', query)
		AppState.posts = response.data.posts.map(p => new Post(p))
	}

	async destroyPost(postId) {
		const response = await api.delete(`api/posts/${postId}`)
		logger.log('DESTROYED POST 💥🧨💣', response.data)

		const posts = AppState.posts

		const postIndex = posts.findIndex(post => post.id == postId)
		// AppState.posts = posts.filter(post => post.id != postId)

		if (postIndex == -1) throw new Error("You messed on findIndex, big dawg")

		posts.splice(postIndex, 1)
		AppState.posts = posts
	}

	async createPost(postData) {
		const response = await api.post('api/posts', postData)
		logger.log('CREATED POST 🌐🔧', response.data)
		const newPost = new Post(response.data)
		// unshift if data is sorted newest to oldest
		AppState.posts.unshift(newPost)
		// push if data is sorted oldest to newest
		// AppState.posts.push(newPost)
	}

	async getPosts() {
		const response = await api.get('api/posts?page=' + AppState.currentPage)
		// NOTE logger is similar to console, will not break your application during deployment
		logger.log('GOT POSTS 🌐', response.data);
		AppState.posts = response.data.posts.map(postData => new Post(postData))

		AppState.currentPage = response.data.page
		AppState.totalPages = response.data.totalPages
	}

	async getProfilePosts(profileId) {
		AppState.profilePosts = []
		const response = await api.get(`api/profiles/${profileId}/posts?page=${AppState.currentPage}`)
		console.log('👩‍💻📥', response.data)
		const posts = response.data.posts.map(post => new Post(post))

		AppState.profilePosts = posts
		AppState.currentPage = response.data.page
		AppState.totalPages = response.data.totalPages
	}

	async nextPage() {
		AppState.currentPage++
		if (AppState.useProfile) {
			await postsService.getProfilePosts(AppState.activeProfile.id)
		}
		else {
			await postsService.getPosts()
		}
	}

	async previousPage() {
		AppState.currentPage--
		if (AppState.useProfile) {
			await postsService.getProfilePosts(AppState.activeProfile.id)
		}
		else {
			await postsService.getPosts()
		}
	}

	async likePost(post) {
		const response = await api.post(`api/posts/${post.id}/like`)
		console.log(response.data)

		const foundPost = AppState.posts.find(p => p.id == post.id)
		if (foundPost) {
			foundPost.likeIds = response.data.likeIds
		}
		const foundProfilePost = AppState.profilePosts.find(p => p.id == post.id)
		if (foundProfilePost) {
			foundProfilePost.likeIds = response.data.likeIds
		}
	}
}

export const postsService = new PostsService()