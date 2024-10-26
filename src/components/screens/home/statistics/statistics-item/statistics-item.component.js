import ChildComponent from '@/core/component/child.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'

import * as styles from './statistics-item.module.scss'
import template from './statistics-item.template.html'

/**
 * StatisticsItem is a class representing a statistic item component.
 */
export class StatisticsItem extends ChildComponent {
	/**
	 * Constructs a StatisticsItem instance.
	 * @param {string} label - The label to be displayed in the statistics item.
	 * @param {string|number} value - The value to be displayed in the statistics item.
	 * @param {('purple'|'green')} variant - The variant that determines the appearance of the statistics item. Allowed values: 'purple' or 'green'.
	 */
	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant) {
			throw new Error(
				'Label, value and variant (purple, green) required!'
			)
		}

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$K(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$K(this.element).find('#statistics-label').text(this.label)
		$K(this.element).find('#statistics-value').text(this.value)

		return this.element
	}
}
