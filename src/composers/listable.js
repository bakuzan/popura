import {requestList, postXml} from '../utils/request';
import {
	outputAnimeValues,
	outputMangaValues,
} from '../utils/output-api-values';

const debug = require('debug')('popura:listable');

/**
 * Composes an object that abstracts MAL's lists API
 *
 * @param  {object} state
 * @return {object} - An object that can manipulate MAL's lists
 */
export default function listable(state) {
	return {
		/**
		 * @param  {string} username = state.username
		 * @return {Promise}
		 */
		getAnimeList(username = state.username) {
			debug(`Getting animelist of ${username}`);
			return requestList(state.authToken, 'anime', username);
		},

		/**
		 * @param  {string} username = state.username
		 * @return {Promise}
		 */
		getMangaList(username = state.username) {
			debug(`Getting mangalist of ${username}`);
			return requestList(state.authToken, 'manga', username);
		},

		/**
		 * @param  {int} id
		 * @param  {object} values = {}
		 * @return {Promise}
		 */
		addAnime(id, values = {}) {
			if (!values.status) {
				values.status = 1;
			}

			return postXml(state.authToken, `/animelist/add/${id}.xml`, {
				body: {data: outputAnimeValues(values)},
			});
		},

		/**
		 * @param  {int} id
		 * @param  {object} values = {}
		 * @return {Promise}
		 */
		addManga(id, values = {}) {
			if (!values.status) {
				values.status = 1;
			}

			return postXml(state.authToken, `/mangalist/add/${id}.xml`, {
				body: {data: outputMangaValues(values)},
			});
		},

		/**
		 * @param  {int} id
		 * @param  {object} values = {}
		 * @return {Promise}
		 */
		updateAnime(id, values = {}) {
			return postXml(state.authToken, `/animelist/update/${id}.xml`, {
				body: {data: outputAnimeValues(values)},
			});
		},

		/**
		 * @param  {int} id
		 * @param  {object} values = {}
		 * @return {Promise}
		 */
		updateManga(id, values = {}) {
			return postXml(state.authToken, `/mangalist/update/${id}.xml`, {
				body: {data: outputMangaValues(values)},
			});
		},

		/**
		 * @param  {int} id
		 * @return {Promise}
		 */
		deleteAnime(id) {
			return postXml(state.authToken, `/animelist/delete/${id}.xml`);
		},

		/**
		 * @param  {int} id
		 * @return {Promise}
		 */
		deleteManga(id) {
			return postXml(state.authToken, `/mangalist/delete/${id}.xml`);
		},
	};
}