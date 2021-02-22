<script>
import {mapState} from 'vuex'

import TheNavigation from '@/components/TheNavigation.vue'
import TheDashboardContainer from '@/components/TheDashboardContainer.vue'
import VLoader from '@/components/VLoader.vue'
import BookingSelectVehicleCard from '@/components/BookingSelectVehicleCard.vue'

import IconTravel from '@/assets/icons/travel.svg'

export default {
  name: 'BookingStart',
  components: {
    TheNavigation,
    TheDashboardContainer,
    VLoader,
    BookingSelectVehicleCard,

    IconTravel
  },
  data() {
    return {
      showLoader: false
    }
  },
  computed: {
    ...mapState(['selectedVehicle'])
  },
  methods: {
    startBooking() {
      this.showLoader = true

      setTimeout(() => {
        this.showLoader = false
      }, 6000)
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
        .select-vehicle
          BookingSelectVehicleCard(vehicle-name="Bike" icon-name="bike")
          BookingSelectVehicleCard(vehicle-name="Scooter" icon-name="scooter")
          BookingSelectVehicleCard(vehicle-name="Car" icon-name="car")
        .form
          .form-input-wrapper
            h2(class="form-title") Parking Unit Code
            h3 Enter the code of the parking unit the
              span {{selectedVehicle}}
              | is connected to
            input(class="form-input" placeholder="e.g. 366140")
          .form-button-wrapper
            h2(class="form-title") Start when you feel ready 🤞
            button(class="start-button" :class="{'loading':showLoader}" :disabled="showLoader" @click="startBooking")
              VLoader(v-if="showLoader")
              div(v-else)
                h2 Start Booking
                IconTravel(class="start-button-image")
</template>

<style lang="scss" scoped>
.wrapper {
  margin-left: 250px;
  margin-right: 250px;
  color: var(--primary-color);
}

.header {
  text-align: center;
}

h2 {
  font-size: 2rem;
}

.select-vehicle {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.selected {
  color: var(--green-color);
}

.form {
  display: grid;
  grid-template-areas: 'input button';
  margin-top: 50px;
}

.form-input-wrapper {
  grid-column: input;
  align-self: center;
  justify-self: start;
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

.loading {
  cursor: not-allowed;

  &:hover {
    background: transparent;
    color: var(--primary-color);
  }
}

.start-button-image {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

h3 > span {
  font-weight: var(--bold);
}
</style>
