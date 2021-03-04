<script>
import {mapActions} from 'vuex'

import TheNavigation from '@/components/TheNavigation.vue'
import TheDashboardContainer from '@/components/TheDashboardContainer.vue'
import VLoader from '@/components/VLoader.vue'

import IconTravel from '@/assets/icons/travel.svg'

export default {
  name: 'BookingStart',
  components: {
    TheNavigation,
    TheDashboardContainer,
    VLoader,

    IconTravel
  },
  data() {
    return {
      showLoader: false,
      parkingUnitCode: '',
      errorMessage: ''
    }
  },
  computed: {
    disableButton() {
      return this.parkingUnitCode.length != 6 || this.showLoader
    }
  },
  methods: {
    ...mapActions(['fetchParkingUnitByCode', 'startBooking']),

    async book() {
      this.showLoader = true

      try {
        const parkingUnit = await this.fetchParkingUnitByCode(this.parkingUnitCode)

        if (parkingUnit.state == 1) {
          this.errorMessage = 'This station is currently unavailable'
          return
        }

        await this.startBooking(parkingUnit._id)

        this.$router.push('/dashboard')
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
  }
}
</script>

<template lang="pug">
  div
    TheNavigation
    TheDashboardContainer
      .wrapper
        .header
          h1 New Booking
          h2 Select the starting vehicle
        .form
          .form-input-wrapper
            h2(class="form-title") Parking Unit Code
            h3 Enter the code of the parking unit
            input(class="form-input" type="number" v-model="parkingUnitCode" placeholder="e.g. 366140")
            p(class="form-error" v-if="parkingUnitCode.length != 6") please enter a 6 digit number
            p(class="form-error" v-if="errorMessage") {{errorMessage}}
          .form-button-wrapper
            h2(class="form-title") Start when you feel ready 🤞
            button(class="start-button" :disabled="disableButton" @click="book")
              VLoader(v-if="showLoader")
              div(v-else)
                h2 Start Booking
                IconTravel(class="start-button-image")
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

h2 {
  font-size: 2rem;
}

.selected {
  color: var(--green-color);
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
    margin-top: 100px;
  }
}

.form-input-wrapper {
  align-self: center;
  justify-self: start;

  @media (min-width: 1280px) {
    grid-column: input;
    margin-right: 20px;
  }
}

.form-title {
  margin-bottom: 15px;
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
  grid-column: button;
  justify-self: end;
  border: 1px solid var(--primary-30-color);
  border-radius: var(--border-radius);
  max-width: 600px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1280px) {
    grid-column: button;
  }
}

.start-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 150px;
  margin-top: 30px;
  padding: 15px 30px;
  color: var(--primary-color);
  border: var(--border) solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  h2 {
    font-weight: var(--bold);
  }

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
}

.start-button-image {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

button:disabled {
  cursor: not-allowed;

  &:hover {
    background: transparent;
    color: var(--primary-color);
  }
}
</style>
