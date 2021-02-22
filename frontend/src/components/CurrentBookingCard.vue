<script>
import CurrentBookingCardSkeleton from '@/components/CurrentBookingCardSkeleton.vue'
import VIconForCard from '@/components/VIconForCard.vue'

import IconPlaceholder from '@/assets/icons/placeholder.svg'

export default {
  name: 'CurrentBookingCard',
  components: {
    CurrentBookingCardSkeleton,
    VIconForCard,
    IconPlaceholder
  },
  data() {
    return {
      isLoading: false,
      currentBooking: true
    }
  }
}
</script>

<template lang="pug">
  div(v-if="isLoading")
    CurrentBookingCardSkeleton
  .current-booking(v-else)
    div(v-if="currentBooking")
      .header
        VIconForCard(icon-name="bike" class="vehicle" size="60")
        .pricing
          h3 Amount:
            span 5$
          h3 Time:
            span 10 minutes
        h4(class="parking-unit-code") Platform Code:
          span #546698
      .content
        .content-text
          h1 Razor E300
          h3 You started a booking from Kadıköy station
        router-link(to="/booking-end" class="end-booking-button") End Booking
          IconPlaceholder(class="button-image")
    .no-booking(v-else)
      h1 Has no current booking yet
      router-link(to="/booking-start" class="start-booking-button") Start a new booking 
</template>

<style lang="scss" scoped>
.current-booking {
  background: var(--primary-color);
  color: var(--white-color);
  border-radius: var(--border-radius);
}

.no-booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.start-booking-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 64px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--white-color);
  font-size: var(--h3-font-size);
  font-weight: var(--bold);
  border: var(--border) solid var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    color: var(--white-color);
  }
}

.header {
  display: flex;
  align-items: center;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
}

.pricing {
  display: flex;
  margin-left: 200px;
  margin-right: 50px;

  h3 {
    font-weight: var(--bold);
    color: var(--white-70-color);

    & + h3 {
      margin-left: 50px;
    }

    > span {
      font-weight: var(--bold);
      color: var(--white-color);
      margin-left: 20px;
    }
  }
}

.content {
  display: grid;
  grid-template-areas: 'text button';
  grid-template-columns: 1fr 200px;
  padding: 40px 50px 40px 200px;
}

.content-text {
  grid-column: text;
  justify-self: start;

  h1 {
    margin-top: -8px;
  }
}

.end-booking-button {
  grid-column: button;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 15px 30px;
  color: var(--white-color);
  border: var(--border) solid var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-size: 1.4rem;
  font-weight: var(--bold);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    color: var(--white-color);
  }
}

.button-image {
  width: 50px;
  height: 50px;
}

.vehicle {
  position: absolute;
  margin-top: 70px;
  margin-left: 30px;
  width: 120px;
  height: 120px;
}

.parking-unit-code {
  margin-left: auto;
  margin-right: 50px;
  color: var(--white-70-color);

  > span {
    margin-left: 10px;
    font-weight: var(--bold);
  }
}
</style>
