<script>
import VueSkelett from 'vue-skelett'

export default {
  name: 'StationDetailSkeleton',
  components: {
    VueSkelett
  }
}
</script>

<template lang="pug">
  .s-station-detail
    .s-card(v-for="item in 3" :key="item")
      .s-card-header
        VueSkelett(type="circle" size="80")
        VueSkelett(width="200" height="40" radius="40")
      .s-parking-units
        VueSkelett(v-for="item in 8" :key="item" width="100%" height="30" radius="30")
</template>

<style lang="scss" scoped>
.s-station-detail {
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
}

.s-card {
  width: 420px;
  padding: 10px;
  background: var(--card-bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-25);
}

.s-card-header {
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-left: 10px;
  height: 100px;
  border-bottom: 0.5px solid var(--skeleton-first-color);
}

.s-parking-units {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
}
</style>
