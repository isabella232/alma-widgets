import { DOMContent, integer } from '@/types'

export function createRootElement(
  className = '',
  tagName: keyof HTMLElementTagNameMap = 'div',
): HTMLElement {
  const element = document.createElement(tagName)
  element.className = className
  return element
}

export function createListElement(
  items: DOMContent[],
  listClass = '',
  itemClass = '',
): HTMLUListElement {
  const list = document.createElement('ul')
  list.className = listClass

  const listItems = items.map((i) => {
    const li = document.createElement('li')
    li.className = itemClass
    setDOMContent(li, i)
    return li
  })

  setDOMContent(list, listItems)

  return list
}

export function priceToCents(price: number): integer {
  return Math.round(price * 100)
}

export function priceFromCents(cents: integer): number {
  return Number((cents / 100).toFixed(2))
}

export function formatCents(cents: integer): string {
  return String(priceFromCents(cents)).replace('.', ',')
}

export function setDOMContent(container: HTMLElement, content: DOMContent): void {
  if (typeof content === 'string') {
    container.innerHTML = content
  } else {
    container.innerHTML = ''

    if (!Array.isArray(content)) {
      content = [content]
    }

    for (const el of content) {
      container.appendChild(el)
    }
  }
}

export function imageWithSrc(src: string, className = ''): HTMLImageElement {
  const image = new Image()
  image.src = src
  image.className = className
  return image
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCDate() === date2.getUTCDate() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear()
  )
}

export function isToday(date: Date): boolean {
  return isSameDate(date, new Date())
}

export function isYesterday(date: Date): boolean {
  const today = new Date()
  return isSameDate(date, new Date(today.setDate(today.getDate() - 1)))
}

export function humanizedDate(date: Date, addArticle = false, forceDate = false): string {
  if (isToday(date) && !forceDate) {
    return "aujourd'hui"
  }

  if (isYesterday(date) && !forceDate) {
    return 'hier'
  }

  const article = addArticle ? 'le ' : ''
  return article + date.toLocaleDateString()
}

export function joinInstallmentsCounts(installmentsCounts: integer[]): string {
  if (installmentsCounts.length === 1) {
    return String(installmentsCounts[0])
  } else if (installmentsCounts.length === 2) {
    return installmentsCounts.join(' ou ')
  } else {
    return (
      installmentsCounts.slice(0, installmentsCounts.length - 1).join(', ') +
      ` ou ${installmentsCounts[installmentsCounts.length - 1]}`
    )
  }
}
