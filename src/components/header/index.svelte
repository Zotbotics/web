<script lang="ts">
  import CaretIcon from '$components/icons/Caret.svelte'
  let open = false

  const on = () => {
    open = true
  }

  const off = () => {
    open = false
  }
</script>

<div class="navbar shadow">
  <div class="navbar-start h-ful">
    <a href="/" class="h-16 w-24 overflow-hidden">
      <img src="/zotbotics.png" alt="logo" class="w-full h-full" />
    </a>
  </div>
  <div class="navbar-end text-primary">
    <ul class="menu menu-horizontal p-0">
      <li><a href="/">Join Us</a></li>
      <li on:mouseenter={on} on:mouseleave={off}>
        <a href="/"><span>About Us</span><CaretIcon {open} class="h-4 fill-primary" /></a>
        <ul class="p-2 bg-base-100 shadow">
          <li><a href="/">Contact</a></li>
          <li><a href="/">Officers</a></li>
        </ul>
      </li>
      <li><a href="/">Events</a></li>
    </ul>
  </div>
</div>
