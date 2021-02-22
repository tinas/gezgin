<script>
export default {
  name: 'VLoader',
  props: {
    fontSize: {
      type: [Number, String],
      default: 50
    }
  },
  computed: {
    fontSizeStyle() {
      return {fontSize: `${this.fontSize}px`}
    }
  }
}
</script>

<template lang="pug">
  .v-loader(:style="fontSizeStyle")
</template>

<style lang="scss" scoped>
.v-loader {
  background: currentcolor;
  position: relative;
  animation: loader-15 1s ease-in-out infinite;
  animation-delay: 0.4s;
  width: 0.25em;
  height: 0.5em;
  margin: 0 0.5em;
  &:after,
  &:before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: inherit;
    animation: inherit;
  }
  &:before {
    right: 0.5em;
    animation-delay: 0.2s;
  }
  &:after {
    left: 0.5em;
    animation-delay: 0.6s;
  }
}

@keyframes loader-15 {
  0%,
  100% {
    box-shadow: 0 0 0 currentcolor, 0 0 0 currentcolor;
  }
  50% {
    box-shadow: 0 -0.25em 0 currentcolor, 0 0.25em 0 currentcolor;
  }
}
</style>
