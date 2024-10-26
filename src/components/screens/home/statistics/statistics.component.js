import ChildComponent from '@/core/component/child.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'

import { formatToCurrency } from '@/utils/format/format-to-currency.util'

import { StatisticService } from '@/api/statistic.service'

import * as styles from './statistics.module.scss'
import template from './statistics.template.html'

import { StatisticsItem } from './statistics-item/statistics-item.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'

export class Statistics extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Statistics')],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.statisticService.main(data => {
			if (!data) {
				return
			}

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)

			if (loaderElement) {
				loaderElement.remove()
			}

			const statisticsItemsElement = $K(this.element).find(
				'#statistics-items'
			)
			statisticsItemsElement.text('')

			// const circleChartElement = $K(this.element).find('#circle-chart')
			// circleChartElement.text('')

			statisticsItemsElement
				.append(
					new StatisticsItem(
						'Income:',
						formatToCurrency(data[0].value),
						'green'
					).render()
				)
				.append(
					new StatisticsItem(
						'Expense:',
						formatToCurrency(data[1].value),
						'purple'
					).render()
				)
		})
	}

	render() {
		if (this.store.user) {
			$K(this.element).append(new Loader().render())

			this.fetchData()
		}

		return this.element
	}
}
