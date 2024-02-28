# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Some notes:

This template uses Vue3 + Vite as the main bundler engine and Pinia as the main state managenement library.

### Vue Composition-Api

We recommend to work with Composition-Api in your components and views, by adding

the "setup" attribute in your script tags as follows:
```
<script setup>
```

You will see a prebuilt store named "notesStore.ts" , this store is working in Composition-api way

We recommend to work the same way as this example store.


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Component test with Cypress
```sh
npm run build

npm run test:component
```

### if you want to run while the cypress browser is open:

```npm run test:component:open```


### Lint with [ESLint](https://eslint.org/)
```
npm run lint
```
