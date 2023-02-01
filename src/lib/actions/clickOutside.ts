/**
 * Svelte action for clicking outside
 * @param node HTML element to observe
 * @param callback called if mouse clicked outside element
 */
export function clickOutside(node: HTMLElement, callback?: Function) {
  const handleClick = (event: Event) => {
    if (!node.contains(event.target as HTMLInputElement)) {
      node.dispatchEvent(new CustomEvent('outside_click'))
      if (callback) callback()
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}
