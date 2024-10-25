import { kyrQuery } from '@/core/kyr-query/kyr-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return kyrQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
						})}`
					: ''
			}`,
			onSuccess
		})
	}
}
