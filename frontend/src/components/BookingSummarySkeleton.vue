<script>
import VueSkelett from 'vue-skelett'

export default {
  name: 'BookingSummarySkeleton',
  components: {
    VueSkelett
  }
}
</script>

<template lang="pug">
  .s-booking-summary-cards
    .s-booking-summary-card(v-for="item in 3" :key="item")
      .s-text-wrapper
        VueSkelett(width="150" height="30" radius="30" class="margin-bottom-20")
        VueSkelett(width="200" height="15" radius="15" class="margin-bottom-20")
        VueSkelett(width="200" height="15" radius="15" class="margin-bottom-20")
      .s-image-wrapper
        VueSkelett(type="circle" size="130")
</template>

<style lang="scss" scoped>
.s-booking-summary-cards {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-bottom: 20px;
}

.s-booking-summary-card {
  display: grid;
  grid-template-areas: 'text image';
  grid-template-columns: 1fr 130px;
  gap: 50px;
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius);
  background: var(--white-color);
  box-shadow: var(--box-shadow-25);
}

.s-text-wrapper {
  grid-column: text;
  margin-left: 10px;
  margin-bottom: 20px;
  padding-top: 30px;
}

.s-image-wrapper {
  grid-column: image;
  align-self: center;
}

.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>
