<script>
import VueSkelett from 'vue-skelett'

export default {
  name: 'CurrentBookingCardSkeleton',
  components: {
    VueSkelett
  }
}
</script>

<template lang="pug">
  .s-container
    .s-header
      VueSkelett(type="circle" size="120" class="s-vehicle")      
      .s-pricing
        VueSkelett(width="200" height="20" radius="20")
        VueSkelett(class="s-time" width="200" height="20" radius="20")
      VueSkelett(class="s-parking-unit-code" width="200" height="20" radius="20")
    .s-content
      .s-content-text
        VueSkelett(width="300" height="40" radius="40")
        VueSkelett(class="sub-text" width="500" height="20" radius="20")
        VueSkelett(class="sub-text" width="300" height="20" radius="20")
      .s-content-button
        VueSkelett(width="200" height="100" radius="5")
</template>

<style lang="scss" scoped>
.s-container {
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.s-header {
  display: flex;
  align-items: center;
  height: 70px;
  margin-right: 50px;
  border-bottom: 1px solid var(--divider-color);
}

.s-vehicle {
  position: absolute;
  margin-top: 70px;
  margin-left: 30px;
  border-radius: var(--border-radius-999);
}

.s-pricing {
  display: flex;
  margin-left: 200px;
  margin-right: 50px;
}

.s-time {
  margin-left: 50px;
}

.s-parking-unit-code {
  margin-left: auto;
}

.s-content {
  display: grid;
  grid-template-areas: 'text button';
  grid-template-columns: 1fr 200px;
  padding: 40px 50px 40px 200px;
}

.s-content-text {
  grid-column: text;
  justify-self: start;
}

.sub-text {
  margin-top: 30px;

  & + .sub-text {
    margin-top: 5px;
  }
}

.s-content-button {
  grid-column: button;
}
</style>
