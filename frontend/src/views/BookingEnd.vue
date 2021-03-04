<script>
import {mapState, mapActions} from 'vuex'
import {formatDistanceToNowStrict} from 'date-fns'

import TheNavigation from '@/components/TheNavigation.vue'
import TheDashboardContainer from '@/components/TheDashboardContainer.vue'
import VLoader from '@/components/VLoader.vue'
import IconPlaceholder from '@/assets/icons/placeholder.svg'

export default {
  name: 'BookingEnd',
  components: {
    TheNavigation,
    TheDashboardContainer,
    VLoader,
    IconPlaceholder
  },
  data() {
    return {
      isDone: false,
      showLoader: false,
      parkingUnitCode: '',
      bookingCreatedAt: '',
      totalPrice: 0,
      totalTime: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapState(['originParkingUnit']),

    disableButton() {
      return this.parkingUnitCode.length != 6 || this.showLoader
    }
  },
  methods: {
    ...mapActions(['fetchCurrentBooking', 'fetchParkingUnitByCode', 'finishBooking']),

    async endBooking() {
      this.showLoader = true

      try {
        const parkingUnit = await this.fetchParkingUnitByCode(this.parkingUnitCode)

        if (parkingUnit.vehicleType != this.originParkingUnit.vehicleType) {
          this.errorMessage = `Enter a parking unit code belonging to the ${this.originParkingUnit.vehicleType} category`
          return
        }

        if (parkingUnit.state == 0) {
          this.errorMessage = `There is already a ${parkingUnit.vehicleType} at this parking station`
          return
        }

        this.totalTime = formatDistanceToNowStrict(this.bookingCreatedAt, {unit: 'minute'})
        const calculateTotalPrice = this.totalTime.split(' ')[0] * this.originParkingUnit.vehicle.pricePerMinute
        this.totalPrice = calculateTotalPrice.toFixed(2)

        await this.finishBooking({destinationParkingUnit: parkingUnit, totalPrice: this.totalPrice})

        this.isDone = true
      } catch (e) {
        this.errorMessage = e.response?.data?.message ?? e.message ?? 'An unknown error occured'
      } finally {
        this.showLoader = false
      }
    }
  },
  watch: {
    parkingUnitCode(newVal) {
      this.errorMessage = ''
    }
  },
  async mounted() {
    const request = await this.fetchCurrentBooking()

    this.bookingCreatedAt = new Date(request.createdAt)
  }
}
</script>

<template lang="pug">
  div
    TheNavigation
    TheDashboardContainer
      .wrapper
        .header
          h1 Finish Booking
          h2 Enter the parking unit code to complete the booking
        .form
          .form-input-wrapper
            h2(class="form-title") Parking Unit Code
            h3 Enter the code of the parking unit the car is connected to
            input(class="form-input" type="number" v-model="parkingUnitCode" placeholder="e.g. 366140")
            p(class="form-error" v-if="parkingUnitCode.length != 6") please enter a 6 digit number
            p(class="form-error" v-if="errorMessage") {{errorMessage}}
          .form-button-wrapper(v-if="isDone")
            h2(class="form-title") Booking completed!
            .results
              h3 Total Price:
                span(class="result-value") ${{totalPrice}}
              h3 Total Time:
                span(class="result-value") {{totalTime}}
            router-link(to="/dashboard" class="dashboard-button") Dashboard
          .form-button-wrapper(v-else)
            h2(class="form-title") End the booking and view the drive results 👌
            button(class="finish-button" :disabled="disableButton" @click="endBooking")
              VLoader(v-if="showLoader")
              div(v-else)
                h2 End Booking
                IconPlaceholder(class="finish-button-image")
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  color: var(--primary-color);

  @media (min-width: 1280px) {
    margin-left: 250px;
    margin-right: 250px;
  }
}

.header {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-self: center;
  row-gap: 50px;
  margin-top: 100px;

  @media (min-width: 1280px) {
    display: grid;
    grid-template-areas: 'input button';
    justify-items: center;
    margin-top: 100px;
  }
}

.form-input-wrapper {
  align-self: center;
  justify-self: center;

  @media (min-width: 1280px) {
    grid-column: input;
    margin-right: 20px;
  }
}

.form-title {
  margin-bottom: 15px;
  line-height: 1.4;
  font-weight: var(--bold);
}

.form-input {
  margin-top: 30px;
  max-width: 500px;
  font-size: 2rem;
}

.form-error {
  margin-top: 5px;
  color: var(--red-color);
  font-weight: var(--bold);
}

.form-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid var(--primary-30-color);
  border-radius: var(--border-radius);
  max-width: 600px;
  padding: 50px 25px;

  @media (min-width: 1280px) {
    grid-column: button;
  }
}

.finish-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 270px;
  height: 150px;
  margin-top: 30px;
  padding: 15px 30px;
  color: var(--primary-color);
  border: var(--border) solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  h2 {
    font-size: 2rem;
    font-weight: var(--bold);
  }

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
}

.finish-button-image {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

.results {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;

  h3 + h3 {
    margin-left: 50px;
  }
}

.result-value {
  margin-left: 10px;
  font-weight: var(--bold);
}

.dashboard-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  width: 250px;
  padding: 20px;
  font-size: 2rem;
  font-weight: var(--bold);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    color: var(--white-color);
    background: var(--primary-color);
  }
}

button:disabled {
  cursor: not-allowed;

  &:hover {
    background: transparent;
    color: var(--primary-color);
  }
}
</style>
