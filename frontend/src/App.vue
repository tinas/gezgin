<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
@import url('./assets/reset.css');
@import url('./assets/theme.css');
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400&display=swap');

html {
  height: 100%;
  overflow: auto;
}

body {
  background: var(--bg-color);
  height: 100%;
  overflow: auto;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
