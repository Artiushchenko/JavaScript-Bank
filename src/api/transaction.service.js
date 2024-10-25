import { kyrQuery } from '@/core/kyr-query/kyr-query.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return kyrQuery({
			path:
				this.#BASE_URL +
				`?${new URLSearchParams({
					orderBy: 'desc'
				})}`,
			onSuccess
		})
	}
}
