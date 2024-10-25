import { BaseScreen } from '@/core/component/base-screen.component'
import { $K } from '@/core/kquery/kquery.lib'
import formService from '@/core/services/form.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { AuthService } from '@/api/auth.service'

import * as styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })

		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $K(this.element).find('label:first-child')
		const passwordLabel = $K(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}

		if (!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target)

		if (!this.#validateFields(formValues)) {
			return
		}

		const type = this.#isTypeLogin ? 'login' : 'register'

		this.authService.main(type, formValues)
	}

	#changeFormType = event => {
		event.preventDefault()

		$K(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Login')

		$K(event.target).text(this.#isTypeLogin ? 'Sign in' : 'Register')

		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Button({ children: 'Submit' })],
			styles
		)

		$K(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter e-mail',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$K(this.element).find('#change-form-type').click(this.#changeFormType)

		$K(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
