import { kyrQuery } from '@/core/kyr-query/kyr-query.lib'
import { NotificationService } from '@/core/services/notification.service'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.notificationService = new NotificationService()
	}

	main(type, body) {
		return kyrQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			},
			method: 'POST'
		})
	}
}
