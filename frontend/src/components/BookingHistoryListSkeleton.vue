<script>
import VueSkelett from 'vue-skelett'

export default {
  name: 'BookingHistoryListSkeleton',
  components: {
    VueSkelett
  }
}
</script>

<template lang="pug">
  .s-history-list
    .s-history-list-item(v-for="item in 4" :key="item")
      .s-vehicle
        VueSkelett(type="circle" size="50")
        VueSkelett(width="300" height="20" radius="20")
      VueSkelett(width="400" height="20" radius="20")
</template>

<style lang="scss" scoped>
.s-history-list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.s-history-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.s-vehicle {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
