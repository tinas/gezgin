<script>
import {mapState, mapActions} from 'vuex'
import {formatDistanceToNowStrict} from 'date-fns'

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
      isLoading: true,
      currentBooking: null,
      vehicle: null,
      timeAgo: 0,
      price: 0
    }
  },
  computed: {
    ...mapState(['originParkingUnit'])
  },
  methods: {
    ...mapActions(['fetchCurrentBooking']),

    pricingRefresh() {
      const createdAt = new Date(this.currentBooking.createdAt)
      this.timeAgo = formatDistanceToNowStrict(createdAt, {unit: 'minute'})
      const calculatePrice = this.timeAgo.split(' ')[0] * this.vehicle.pricePerMinute
      this.price = calculatePrice.toFixed(2)
    }
  },
  async mounted() {
    this.currentBooking = await this.fetchCurrentBooking()

    this.isLoading = false

    if (!this.currentBooking) return

    this.vehicle = this.originParkingUnit.vehicle

    this.pricingRefresh()

    setInterval(() => {
      this.pricingRefresh()
    }, 60000)
  }
}
</script>

<template lang="pug">
  div(v-if="isLoading")
    CurrentBookingCardSkeleton
  .current-booking(v-else)
    div(v-if="currentBooking")
      .header
        VIconForCard(:icon-name="currentBooking.parkingUnit.vehicleType" class="vehicle" size="60")
        .pricing
          h3 Price:
            span ${{price}}
          h3 Elapsed Time:
            span {{timeAgo}}
        h4(class="parking-unit-code") Parking Unit Code:
          span # {{currentBooking.parkingUnit.code}}
      .content
        .content-text
          h1 {{vehicle.brand}}
          h3 You started a booking from {{currentBooking.origin.name}} station
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
      margin-left: 10px;
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
