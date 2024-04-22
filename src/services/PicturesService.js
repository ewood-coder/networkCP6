
import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class PicturesService {

	async getPictures() {
		const response = await api.get('api/ads')
		// NOTE logger is similar to console, will not break your application during deployment
		logger.log('GOT ADS 💲💲💲', response.data);
		AppState.pictures = response.data.map(pictureData => new Picture(pictureData))

		console.log(AppState.pictures)
	}

}

export const picturesService = new PicturesService()