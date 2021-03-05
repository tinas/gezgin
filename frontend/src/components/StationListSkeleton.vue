<script>
import VueSkelett from 'vue-skelett'

export default {
  name: 'StationListSkeleton',
  components: {
    VueSkelett
  }
}
</script>

<template lang="pug">
  .s-station-list-wrapper
    .s-station-item(v-for="item in 5" :key="item")
      VueSkelett(width="200" height="30" radius="30")
      .s-skeleton-vehicles
        VueSkelett(type="circle" size="40")
        VueSkelett(type="circle" size="40")
        VueSkelett(type="circle" size="40")
</template>

<style lang="scss" scoped>
.s-station-list-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 50px;
}

.s-station-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--white-color);
  border-radius: var(--border-radius);
}

.s-skeleton-vehicles {
  display: flex;
  column-gap: 5px;
}
</style>
