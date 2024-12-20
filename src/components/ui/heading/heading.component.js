import ChildComponent from '@/core/component/child.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'

import * as styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
	constructor(title = '') {
		super()

		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$K(this.element).text(this.title)

		return this.element
	}
}
