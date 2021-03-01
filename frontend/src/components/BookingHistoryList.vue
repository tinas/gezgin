<script>
import {mapState} from 'vuex'

import BookingHistoryListSkeleton from '@/components/BookingHistoryListSkeleton.vue'
import BookingHistoryListItem from '@/components/BookingHistoryListItem.vue'

export default {
  name: 'BookingHistoryList',
  components: {
    BookingHistoryListSkeleton,
    BookingHistoryListItem
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['bookingHistory']),
    bookingLength() {
      return this.bookingHistory && this.bookingHistory.length > 0
    }
  }
}
</script>

<template lang="pug">
  div(v-if="isLoading")
    BookingHistoryListSkeleton
  .booking-history-list(v-else)
    div(class="list-wrapper" v-if="bookingLength")
      BookingHistoryListItem(v-for="booking in bookingHistory" :key="booking._id" :booking="booking")
    h2(v-else class="no-bookings") You do not have a booking history yet 🤷

</template>

<style lang="scss" scoped>
.booking-history-list {
  padding: 10px;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.no-bookings {
  text-align: center;
  padding: 150px 0;
  color: var(--primary-color);
}
</style>
