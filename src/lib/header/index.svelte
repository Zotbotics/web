<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton'
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <a href="/" class="btn btn-base p-1">
      <img src="/mascot.png" alt="mascot" width="40px" height="40px" />
      <span
        class="bg-gradient-to-br from-primary-500 via-tertiary-500 to-secondary-500 box-decoration-clone bg-clip-text text-transparent"
      >
        Zotbotics Makerspace
      </span>
    </a>
  </svelte:fragment>

  <nav class="list-nav" slot="trail">
    <ul class="flex">
      <li>
        <a href="/about">
          <span class="badge bg-primary-500">🤓</span>
          <span class="flex-auto">About Us</span>
        </a>
      </li>
      <li>
        <a href="/involve">
          <span class="badge bg-secondary-400">🔧</span>
          <span class="flex-auto">Get Involved</span>
        </a>
      </li>
      <li>
        <a href="/news">
          <span class="badge bg-tertiary-400">📰</span>
          <span class="flex-auto">News</span>
        </a>
      </li>
      <li>
        <a href="/contact">
          <span class="badge bg-primary-400">📞</span>
          <span class="flex-auto">Contact</span>
        </a>
      </li>
    </ul>
  </nav>
</AppBar>

<style>
  .list-nav li {
    margin-top: 0;
  }
</style>
