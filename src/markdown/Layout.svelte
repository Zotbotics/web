<script lang="ts">
  // FYI: can't use preprocessed style language (e.g. Stylus, SASS) with TailwindCSS @apply directive
  // in conjunction with MDX preprocessing
  // more info here https://github.com/pngwn/MDsveX/issues/116
</script>

<div class="prose prose-headings:text-primary prose-a:text-primary w-full max-w-full">
  <slot />
</div>
