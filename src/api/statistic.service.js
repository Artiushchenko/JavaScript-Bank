import { kyrQuery } from '@/core/kyr-query/kyr-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return kyrQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
