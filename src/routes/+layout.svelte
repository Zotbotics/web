<script lang="ts">
  // import the base css file to compile TailwindCSS into the application
  import '../app.css'

  import Header from '$components/header/index.svelte'
</script>

<main>
  <Header />
  <slot />
</main>
