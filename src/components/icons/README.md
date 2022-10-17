# What the heck is this? Why are you DIYing icons?

## How to import icons using this folder

You can import icons however you want; using a library to do such a simple task isn't preferable tho,
e.g. I'd like to avoid `yarn add font-awesome` if possible since that's more packages

1. Grab an SVG icon that you like, e.g.

- https://mui.com/material-ui/material-icons/?selected=AccountBox
- https://fontawesome.com/icons/rocket?s=solid&f=classic

2. Copy the SVG code

- for font awesome, there's an HTML bracket icon that will copy the SVG to your clipboard
- for mui, you can inspect element, find the SVG element, right-click on the tag and copy -> copy-element

3. Paste the code into a new Svelte file

4. Add {...$$restProps} to the main svg tag

- this means forward all not explicitly declared props to the svg element

5. Add any additional props or controls

- e.g. a common one I add is the "open" prop, and a directive to rotate the element when it's true/false
