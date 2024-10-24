import ChildComponent from '@/core/component/child.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'

import * as styles from './button.module.scss'
import template from './button.template.html'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant }) {
		super()

		if (!children) {
			throw new Error('Children is empty!')
		}

		this.children = children
		this.onClick = onClick
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$K(this.element).html(this.children).click(this.onClick)

		if (this.variant) {
			$K(this.element).addClass(styles[this.variant])
		}

		return this.element
	}
}
