<script>
import BookingHistoryListSkeleton from '@/components/BookingHistoryListSkeleton.vue'
import BookingHistoryListItem from '@/components/BookingHistoryListItem.vue'

export default {
  name: 'BookingHistoryList',
  components: {
    BookingHistoryListSkeleton,
    BookingHistoryListItem
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<template lang="pug">
  div(v-if="isLoading")
    BookingHistoryListSkeleton
  .booking-history-list(v-else)
    BookingHistoryListItem(v-for="item in 10" :key="item")
</template>

<style lang="scss" scoped>
.booking-history-list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
