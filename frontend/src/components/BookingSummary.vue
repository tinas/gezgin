<script>
import BookingSummarySkeleton from '@/components/BookingSummarySkeleton.vue'
import BookingSummaryCard from '@/components/BookingSummaryCard.vue'

export default {
  name: 'BookingSummary',
  components: {
    BookingSummarySkeleton,
    BookingSummaryCard
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template lang="pug">
  .booking-summary
    h1 Booking Summary
    h3 A summary of your bookings so far is listed below.
    div(v-if="isLoading")
      BookingSummarySkeleton
    .booking-summary-cards(v-else)
      BookingSummaryCard(card-title="Bike")
      BookingSummaryCard(card-title="Scooter")
      BookingSummaryCard(card-title="Car")
</template>

<style lang="scss" scoped>
.booking-summary {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
  background: var(--card-bg-color);
  border-radius: var(--border-radius);
}

h1 {
  margin: 10px 0 10px 0;
  font-size: 2rem;
  color: var(--primary-50-color);
}

h3 {
  margin: 0 0 30px 0;
  color: var(--primary-50-color);
}

.booking-summary-cards {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 20px;
}
</style>
