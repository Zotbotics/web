<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/all.css'
  import '../app.css'

  import { AppShell } from '@skeletonlabs/skeleton'
  import Header from '$lib/header/index.svelte'
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft" />

  <svelte:fragment slot="sidebarRight" />

  <svelte:fragment slot="pageHeader" />

  <main class="min-h-screen">
    <slot />
  </main>

  <svelte:fragment slot="pageFooter" />

  <svelte:fragment slot="footer">
    <img src="/banner.png" alt="banner" width="100%" height="72px" />
  </svelte:fragment>
</AppShell>
