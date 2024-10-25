import ChildComponent from '@/core/component/child.component'
import { $K } from '@/core/kquery/kquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { formatCardNumber } from '@/utils/format/format-card-number.util'
import { formatToCurrency } from '@/utils/format/format-to-currency.util'

import { CardService } from '@/api/card.service'

import * as styles from './card-info.module.scss'
import template from './card-info.template.html'

const CODE = '*****'

export class CardInfo extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance()

		this.cardService = new CardService()

		this.element = renderService.htmlToElement(template, [], styles)
	}

	#copyCardNumber(event) {
		navigator.clipboard.writeText(event.target.innerText).then(() => {
			event.target.innerText = 'Card number copied!'

			setTimeout(() => {
				event.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCVC(cardCVCElement) {
		const text = cardCVCElement.text()

		text === CODE
			? cardCVCElement.text(this.card.cvc)
			: cardCVCElement.text(CODE)
	}

	fillElements() {
		$K(this.element).html(
			renderService.htmlToElement(template, [], styles).innerHTML
		)

		$K(this.element)
			.findAll(':scope > div')
			.forEach(child => {
				child.addClass('fade-in')
			})

		$K(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber.bind(this))

		$K(this.element).find('#card-expire-date').text(this.card.expireDate)

		const cardCVCElement = $K(this.element).find('#card-cvc')

		cardCVCElement.text(CODE).css('width', '44px')

		$K(this.element)
			.find('#toggle-cvc')
			.click(this.#toggleCVC.bind(this, cardCVCElement))

		$K(this.element)
			.find('#card-balance')
			.text(formatToCurrency(this.card.balance))
	}

	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) {
			this.fetchData()
		}

		return this.element
	}
}
