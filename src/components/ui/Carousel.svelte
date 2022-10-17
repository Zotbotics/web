<script lang="ts">
  /*
   * a carousel component accepts an array of divs as children/slots, e.g.
   * <Carousel>
   *  <div></div>
   *  <div></div>
   *  <div></div>
   * </Carousel>
   */

  import ChevronLeft from '$components/icons/ChevronLeft.svelte'
  import ChevronRight from '$components/icons/ChevronRight.svelte'
  import Wrench from '$components/icons/Wrench.svelte'
  import X from '$components/icons/X.svelte'
  import Play from '$components/icons/Play.svelte'
  import Pause from '$components/icons/Pause.svelte'

  import { fade } from 'svelte/transition'
  import { clickOutside } from '$lib/actions'

  //////////////////////////////////////////
  // props
  //////////////////////////////////////////

  // the duration of the transition in ms
  export let duration = 500

  // if not 0, then carousel will automatically slide back and forth
  export let interval = 0

  // length of the carousel (this is manually calculated by the custom action as well)
  export let length = 0

  // whether the prev/next buttons and indicator dots should be shown
  export let controls = false

  // whether the auto-scroll should be paused
  export let pause = false

  //////////////////////////////////////////
  // custom Svelte action
  //////////////////////////////////////////

  import { onMount } from 'svelte'

  interface CarouselParams {
    active: number
    interval: number
    controls: boolean
    pause: boolean
  }

  const carousel = (node: HTMLElement, params: CarouselParams) => {
    const children = [...node.children] as HTMLElement[]

    // the length of the carousel should be the number of children
    length = children.length

    const update = (new_params: CarouselParams) => {
      // if there ISN'T any interval or it's paused, but the auto interval is active, turn it off
      if ((!new_params.interval || pause) && carousel_interval) {
        turn_off_auto()
      }

      // if there IS an interval and it isn't paused, but the auto interval is off, turn it on
      if (new_params.interval && !pause && !carousel_interval) {
        turn_on_auto()
      }

      const children = [...node.children] as HTMLElement[]
      const left = children?.[new_params.active]?.offsetLeft
      children.forEach((c) => {
        c.style.transform = 'translateX(' + -left + 'px)'
      })
    }

    update(params)

    return {
      // whenever the active tab number changes, re-calculate the position of the underline
      update,
    }
  }

  //////////////////////////////////////////
  // carousel controls
  //////////////////////////////////////////
  // the index of the currently active slide (e.g. the first slide is slide 0)
  let active = 0

  // whether the carousel should go backwards or forwards
  let reverse = false

  //////////////////////////////////////////
  // carousel auto transition controls
  // the carousel auto transition may be turned off/on at any point
  //////////////////////////////////////////
  let carousel_interval: null | ReturnType<typeof setTimeout> = null

  const turn_on_auto = () => {
    // if an interval already exists, don't make a new one
    if (carousel_interval) {
      return
    }

    carousel_interval = setInterval(() => {
      // if the carousel is at the beginning or the end, switch the direction
      if (active === length - 1) {
        reverse = true
      }
      if (active === 0) {
        reverse = false
      }

      // depending on the direction, go to the previous or next slide
      if (reverse) {
        prev()
      } else {
        next()
      }
    }, interval)
  }

  const turn_off_auto = () => {
    if (carousel_interval) {
      clearInterval(carousel_interval)
      carousel_interval = null
    }
  }

  onMount(() => {
    // if the interval is 0, then don't create one
    if (!interval) {
      return
    }
    turn_on_auto()
    return turn_off_auto
  })

  //////////////////////////////////////////
  // carousel manual controls
  //////////////////////////////////////////
  // whether to show the menu
  let menu = false

  const closeMenu = () => {
    menu = false
  }

  const next = () => {
    if (active < length - 1) {
      active += 1
    }

    // after adding 1 to active, switch directions if needed
    if (active === length - 1) {
      reverse = true
    }
  }

  const prev = () => {
    if (active > 0) {
      active -= 1
    }

    // after subtracting 1 from active, switch directions if needed
    if (active === 0) {
      reverse = false
    }
  }

  // directly go to a slide
  const set = (i: number) => {
    active = i
  }

  // both chevrons share these styles, yeah its a lot lol
  const chevron_style =
    'w-1/12 py-4 px-1 absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-primary hover:bg-secondary fill-secondary hover:fill-primary opacity-20 hover:opacity-90 hover:cursor-pointer rounded-md z-10 transition-all'
</script>

<div class="h-full w-full relative">
  <!-- a chevron is 1/2 of the distance from the top, and translated 1/2 of its own width upwards -->

  <!-- ------------------------------------------ -->
  <!-- left chevron (previous slide ) -->
  <!-- ------------------------------------------ -->
  {#if controls && active > 0}
    <div class="{chevron_style} left-0" on:click={prev} transition:fade>
      <ChevronLeft class="h-8" />
    </div>
  {/if}

  <!-- ------------------------------------------ -->
  <!-- main carousel body -->
  <!-- ------------------------------------------ -->
  <div
    use:carousel={{ active, interval, controls, pause }}
    class="carousel w-full h-full relative"
    style="--duration: {duration}ms"
  >
    <!-- the carousel defines a regular CSS variable --duration derived from the prop -->
    <!-- it's up to the parent to explicitly state the width/height of the carousel -->
    <slot />
  </div>

  <!-- carousel indicator dots -->
  {#if controls}
    <div
      class="absolute bottom-0 w-full flex justify-center bg-black/20 hover:bg-black/40 p-2 transition-colors z-20"
    >
      <ol class="flex justify-evenly" style="width: {length * 20}px">
        {#each Array(length) as _, i}
          <li
            class="cursor-pointer h-3 w-3 hover:bg-secondary rounded-2xl inline-block transition-all"
            on:click={() => set(i)}
            class:bg-primary={active !== i}
            class:bg-secondary={active === i}
          />
        {/each}
      </ol>
    </div>
  {/if}

  <!-- ------------------------------------------ -->
  <!-- right chevron (next slide, only if not last slide) -->
  <!-- ------------------------------------------ -->
  {#if controls && active !== length - 1}
    <div class="{chevron_style} right-0" on:click={next} transition:fade>
      <ChevronRight class="h-8" />
    </div>
  {/if}
</div>

<style lang="stylus">
  /* target all top level divs that are descendent of the carousel class */
  .carousel > :global(div)
    /* make sure all the divs take up the full width and height, and that they transition when transforming */
    @apply shrink-0 w-full h-full transition-transform

    /* use the dynamically generated --duration variable to re-assign the duration*/
    transition-duration: var(--duration)
</style>
