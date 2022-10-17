// custom on:actions here, e.g. on:outside_click
declare namespace svelte.JSX {
  export interface HTMLAttributes {
    onoutside_click?: () => void
  }
}

// enable importing md and svx files, doesn't do file system autocomplete for some reason
declare module '*.md'
declare module '*.svx'

// https://kit.svelte.dev/docs/types#app
/// <reference types="@sveltejs/kit" />
