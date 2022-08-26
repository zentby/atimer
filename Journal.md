
## Context API and useReducer

I started the state save/load with a hooks. Later I found the operations became more complicated so I introduced `useReducers` to manipulate the big object.
A while later I found that I have multiple operations across different component levels, e.g. adding a timer and pause a timer. 

Then I introduced `Context` API. I moved the reducers into context and serve the `state` and `dispatch` globally. To avoid consistent global re-render, I also 
moved the time counting from reducer into the display component. Now the UI has the minimal re-render for time ticking.

These changes makes the app performance still under control. No redux yet!

## Older browser support

Since my app was designed to run in an older iPad (iOS 10), the initial setup didn't work well.

Neither the vite or material-ui supports the browser from their websites. But I still gave it a shot anyway.

It turns out adding `build.target: 'es2015'` in `vite.config.js` did the trick!

My backup plan was to use `@vitejs/plugin-legacy` or `core-js` but now they are not needed :)


## PWA support

[vite-plugin-pwa](https://vite-plugin-pwa.netlify.app) is a plugin of vite to support PWA in vite apps.

Simple configure the `manifest.json` in `/public` folder and include the plugin in the `vite.config.js` file, it will handle everything you need to set it up.