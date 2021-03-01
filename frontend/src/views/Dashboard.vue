<script>
import {mapActions} from 'vuex'

import TheNavigation from '@/components/TheNavigation.vue'
import TheDashboardContainer from '@/components/TheDashboardContainer.vue'
import CurrentBookingCard from '@/components/CurrentBookingCard.vue'
import BookingSummary from '@/components/BookingSummary.vue'
import BookingHistoryList from '@/components/BookingHistoryList.vue'

export default {
  name: 'Dashboard',
  components: {
    TheNavigation,
    TheDashboardContainer,
    CurrentBookingCard,
    BookingSummary,
    BookingHistoryList
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions(['fetchBookings'])
  },
  async mounted() {
    await this.fetchBookings()
    this.isLoading = false
  }
}
</script>

<template lang="pug">
  .dashboard
    TheNavigation
    TheDashboardContainer
      .wrapper
        .main
          CurrentBookingCard
          .bookings
            h1 Bookings
            .booking-list
              BookingHistoryList(:is-loading="isLoading")
        .sidebar
          BookingSummary(:is-loading="isLoading")
</template>

<style lang="scss" scoped>
.wrapper {
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1280px) {
    display: grid;
    grid-template-areas: 'main sidebar';
    grid-template-columns: 1fr 460px;
    column-gap: 50px;
  }
}

.main {
  width: 100%;

  @media (min-width: 1280px) {
    grid-column: main;
  }
}

.sidebar {
  display: none;

  @media (min-width: 1280px) {
    display: block;
    grid-column: sidebar;
  }
}

.bookings {
  margin-top: 30px;
  color: var(--primary-50-color);
}

.booking-list {
  max-height: 430px;
  padding-right: 10px;
  overflow-y: auto;
}
</style>
