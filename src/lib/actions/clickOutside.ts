// reference: https://svelte.dev/tutorial/actions
////////////////////////////////////////////

export default function clickOutside(node: HTMLElement) {
  const handleClick = (event: Event) => {
    if (!node.contains(event.target as HTMLInputElement)) {
      node.dispatchEvent(new CustomEvent('outside_click'))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}
