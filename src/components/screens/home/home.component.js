import { BaseScreen } from '@/core/component/base-screen.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'

import * as styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles)

		$K(element).find('h1').css('color', 'green')

		return element
	}
}
