<script>
import {mapState, mapActions} from 'vuex'
import VIconStroke from '@/components/VIconStroke.vue'

export default {
  name: 'BookingSelectVehicleCard',
  components: {
    VIconStroke
  },
  props: {
    vehicleName: {
      type: String,
      required: true,
      validator: function(value) {
        return ['Bike', 'Scooter', 'Car'].indexOf(value) !== -1
      }
    },
    iconName: {
      type: String,
      required: true,
      validator: function(value) {
        return ['bike', 'scooter', 'car'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    ...mapState(['selectedVehicle']),
    activeClass() {
      return {active: this.selectedVehicle === this.vehicleName}
    }
  },
  methods: {
    ...mapActions(['setSelectedVehicle'])
  }
}
</script>

<template lang="pug">
  button(class="vehicle-card" :class="activeClass" @click="setSelectedVehicle(vehicleName)")
    VIconStroke(:icon-name="iconName" icon-size="60")
    h1 {{vehicleName}}
</template>

<style lang="scss" scoped>
.vehicle-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 100px 10px 100px;
  max-width: 300px;
  color: var(--primary-50-color);
  background: var(--white-color);
  border: 2px solid var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    color: var(--primary-80-color);
    box-shadow: var(--box-shadow-25);
  }
}

.active {
  color: var(--green-color);
  border: 2px solid var(--green-color);
  box-shadow: var(--box-shadow-25);
  cursor: default;

  &:hover {
    color: var(--green-color);
  }
}

h1 {
  margin-top: 20px;
  margin-bottom: 0;
}
</style>
