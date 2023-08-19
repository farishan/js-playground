## What is this?

A module to "hide" or facading the DOM API.

## Objective

1. Make the DOM API syntax more friendly and intuitive.
2. "Hide" or make a facade for DOM API, so the game can easily ported to other JavaScript runtime other than the browser, NodeJS for example.
3. Do not expose something like `document.body.appendChild`