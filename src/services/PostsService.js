
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class PostsService {

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
		const response = await api.get('api/posts')
		// NOTE logger is similar to console, will not break your application during deployment
		logger.log('GOT POSTS 🌐', response.data);
		AppState.posts = response.data.posts.map(pojo => new Post(pojo))
	}

	async getProfilePosts(profileId) {
		AppState.profilePosts = []
		const response = await api.get(`api/profiles/${profileId}/posts`)
		console.log('👩‍💻📥', response.data)
		const posts = response.data.posts.map(post => new Post(post))

		AppState.profilePosts = posts
	}
}

export const postsService = new PostsService()