<script>
import {mapActions} from 'vuex'

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
      isLoading: false,
      bookings: []
    }
  },
  computed: {
    bookingLength() {
      return this.bookings && this.bookings.length > 0
    }
  },
  methods: {
    ...mapActions(['fetchBookings'])
  },
  async mounted() {
    this.bookings = await this.fetchBookings()
  }
}
</script>

<template lang="pug">
  div(v-if="isLoading")
    BookingHistoryListSkeleton
  .booking-history-list(v-else)
    div(class="list-wrapper" v-if="bookingLength")
      BookingHistoryListItem(v-for="booking in bookings" :key="booking._id" :booking="booking")
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
