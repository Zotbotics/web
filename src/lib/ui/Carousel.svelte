<script lang="ts">
  import { onMount } from 'svelte'
  import { clickOutside } from '$lib/actions/clickOutside'
  import Icon from '@iconify/svelte'
  import NavigateBefore from '@iconify/icons-mdi/navigate-before'
  import NavigateNext from '@iconify/icons-mdi/navigate-next'
  import WrenchIcon from '@iconify/icons-mdi/wrench'
  import CloseIcon from '@iconify/icons-mdi/close'
  import PlayArrow from '@iconify/icons-mdi/play'
  import Pause from '@iconify/icons-mdi/pause'

  /**
   * @prop duration of transition in ms
   */
  export let duration = 500

  /**
   * @prop how long to wait between automatic transitions; no automatic transitions if 0
   */
  export let interval = 0

  /**
   * @prop optional prop for number of slides (calculated manually later)
   */
  export let length = 0

  /**
   * @prop whether the prev/next buttons and dots should be shown
   */
  export let controls = false

  /**
   * @prop whether the auto-transition should be paused
   */
  export let pause = false

  /**
   * @prop whether the advanced controls should be shown
   */
  export let advanced = false

  /**
   * custom Svelte action for the carousel interaction
   */
  interface CarouselParams {
    active: number
    interval: number
    controls: boolean
    pause: boolean
  }

  /**
   * @param node the DOM node that will be the carousel
   * @param params control the behavior of the carousel
   * @returns update function that will run whenever the carousel params change
   */
  const carousel = (node: HTMLElement, params: CarouselParams) => {
    const children = [...node.children] as HTMLElement[]

    // the length of the carousel should be the number of children
    length = children.length

    const update = (new_params: CarouselParams) => {
      // if there ISN'T any interval or it's paused, but the auto interval is active, turn it off
      if ((!new_params.interval || pause) && activeInterval) {
        turn_off_auto()
      }

      // if there IS an interval and it isn't paused, but the auto interval is off, turn it on
      if (new_params.interval && !pause && !activeInterval) {
        turn_on_auto()
      }

      const children = [...node.children] as HTMLElement[]
      const left = children?.[new_params.active]?.offsetLeft
      children.forEach((c) => {
        c.style.transform = 'translateX(' + -left + 'px)'
      })
    }

    // whenever the active tab number changes, re-calculate the position of the underline
    update(params)

    return {
      update,
    }
  }

  /** index of the currently active slide (e.g. the first slide is slide 0) */
  let active = 0

  /** whether the carousel is going in reverse */
  let reverse = false

  /** carousel's interval for transitioning */
  let activeInterval: null | ReturnType<typeof setTimeout> = null

  /**
   * turn on the carousel's auto-transition
   */
  const turn_on_auto = () => {
    // if an interval already exists, don't make a new one
    if (activeInterval) {
      return
    }

    activeInterval = setInterval(() => {
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

  /**
   * turn off the carousel's auto-transition
   */
  const turn_off_auto = () => {
    if (activeInterval) {
      clearInterval(activeInterval)
      activeInterval = null
    }
  }

  /**
   * on mount, turn on the carousel's auto-transition if a non-zero interval was provided
   */
  onMount(() => {
    if (!interval) {
      return
    }
    turn_on_auto()
    return turn_off_auto
  })

  /** whether to show the menu */
  let menu = false

  const closeMenu = () => {
    menu = false
  }

  /**
   * go to the next slide
   */
  const next = () => {
    if (active < length - 1) {
      active += 1
    }

    // after adding 1 to active, switch directions if needed
    if (active === length - 1) {
      reverse = true
    }
  }

  /**
   * go to the previous slide
   */
  const prev = () => {
    if (active > 0) {
      active -= 1
    }

    // after subtracting 1 from active, switch directions if needed
    if (active === 0) {
      reverse = false
    }
  }

  /**
   * go directly to a slide number
   * @param i slide number to go to
   */
  const set = (i: number) => {
    active = i
  }

  /**
   * tailwind classes for both chevrons
   */
  const chevron_style =
    'w-1/12 py-4 px-1 absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-primary-500 hover:bg-secondary-500 text-secondary hover:text-primary opacity-20 hover:opacity-90 hover:cursor-pointer rounded-md z-10 transition-all'

  /**
   * needed to satisfy a11y
   */
  const handleKeypress = () => {
    return
  }
</script>

<!-- 
@component carousel component cycles through all of its div children in slideshow fashion
this isn't an essential component, so don't worry about the spaghetti code here
-->

<div class="relative h-full w-full">
  <!-- ------------------------------------------------------------------------------
    left chevron (previous slide)
  ------------------------------------------------------------------------------- -->
  {#if controls && active > 0}
    <div class="{chevron_style} left-0" on:click={prev} on:keypress={handleKeypress}>
      <Icon icon={NavigateBefore} />
    </div>
  {/if}

  <!-- ------------------------------------------------------------------------------
    main carousel body
  ------------------------------------------------------------------------------- -->
  <div
    use:carousel={{ active, interval, controls, pause }}
    class="carousel relative flex h-full w-full"
    style="--duration: {duration}ms"
  >
    <!-- the carousel defines a regular CSS variable --duration derived from the prop -->
    <!-- it's up to the parent to explicitly state the width/height of the carousel -->
    <slot />
  </div>

  <!-- carousel indicator dots -->
  {#if controls}
    <div
      class="absolute bottom-0 z-20 flex w-full justify-center bg-black/20 p-2 transition-colors hover:bg-black/40"
    >
      <ol class="flex justify-evenly" style="width: {length * 20}px">
        {#each Array(length) as _, i}
          <li
            class="inline-block h-3 w-3 cursor-pointer rounded-2xl transition-all hover:bg-secondary-500"
            on:click={() => set(i)}
            on:keypress={handleKeypress}
            class:bg-primary-500={active !== i}
            class:bg-secondary-500={active === i}
          />
        {/each}
      </ol>
    </div>
  {/if}

  {#if advanced}
    <!-- ----------------------------------------------------------------------------
      section at the top of the carousel with all extra controls,
      e.g. the menu and the menu toggle button
    ----------------------------------------------------------------------------- -->
    <div class="absolute top-0 w-full" use:clickOutside={closeMenu}>
      <!-- 
        button to toggle the menu with extra controls, absolutely positioned at top right
      -->
      <label
        class="swap swap-rotate absolute top-0 right-0 opacity-50 transition-opacity hover:opacity-100"
      >
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" bind:checked={menu} />

        <div class="btn-secondary swap-off btn-circle btn">
          <Icon icon={WrenchIcon} class="text-primary" />
        </div>

        <div class="btn-primary swap-on btn-circle btn">
          <Icon icon={CloseIcon} class="text-error" />
        </div>
      </label>

      <!-- --------------------------------------------------------------------------
        menu with additional controls, absolutely positioned at top left
      --------------------------------------------------------------------------- -->
      {#if menu}
        <div class="absolute top-0 mx-auto rounded-lg bg-secondary-500 p-2">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mx-4">Show Controls</span>
              <input type="checkbox" class="toggle-primary toggle" bind:checked={controls} />
            </label>
          </div>
          <div class="form-control">
            <label class="swap swap-rotate">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" bind:checked={pause} />

              <div class="swap-off btn-circle btn">
                <Icon icon={Pause} class="text-primary" />
              </div>

              <div class="swap-on btn-circle btn">
                <Icon icon={PlayArrow} class="text-primary" />
              </div>
            </label>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- ------------------------------------------------------------------------------
    right chevron (next slide)
  ------------------------------------------------------------------------------- -->
  {#if controls && active !== length - 1}
    <div class="{chevron_style} right-0" on:click={next} on:keypress={handleKeypress}>
      <Icon icon={NavigateNext} />
    </div>
  {/if}
</div>

<style lang="postcss">
  /* target all top level divs that are descendent of the carousel class */
  .carousel > :global(div) {
    /* make sure all the divs take up the full width and height, and that they transition when transforming */
    @apply h-full w-full shrink-0 transition-transform;

    /* use the dynamically generated --duration variable to re-assign the duration*/
    transition-duration: var(--duration);
  }
</style>
