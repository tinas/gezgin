<script>
import VIconStroke from '@/components/VIconStroke.vue'

export default {
  name: 'StationDetailCard',
  components: {
    VIconStroke
  },
  props: {
    vehicleType: {
      type: String,
      required: true
    },
    parkingUnits: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    vehicleBrand(parkingUnit) {
      return parkingUnit.vehicle != null && parkingUnit.state == 0 ? parkingUnit.vehicle.brand : 'Not Available'
    },
    isAvailable(parkingUnit) {
      return parkingUnit.vehicle == null || parkingUnit.state == 1
    }
  }
}
</script>

<template lang="pug">
  .card
    .header
      VIconStroke(:icon-name="vehicleType" icon-size="30" padding="15")
      h1 {{vehicleType}}
    .parking-units
      div(v-if="parkingUnits.length > 0")
        .parking-unit(v-for="item in parkingUnits" :key="item._id" :class="{'no-available':isAvailable(item)}")
          h3 {{vehicleBrand(item)}}
          h4 # {{item.code}}
      .parking-unit(v-else class="no-available-yet")
        h3 Not available yet
</template>

<style lang="scss" scoped>
.card {
  padding: 0 10px 10px 10px;
  min-width: 400px;
  background: var(--card-bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-25);
}

.header {
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-left: 10px;
  height: 100px;
  border-bottom: 0.5px solid var(--primary-30-color);
}

.parking-units {
  padding: 10px;
  overflow: auto;
  max-height: 710px;
}

.parking-unit + .parking-unit {
  margin-top: 10px;
}

.parking-unit {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  column-gap: 20px;
  padding: 5px 10px 5px 10px;
  background: var(--white-color);
  border-radius: var(--border-radius);
  border: var(--border) solid var(--white-color);
  transition: var(--transition);
  box-shadow: var(--box-shadow-1);

  &:hover {
    border: var(--border) solid var(--primary-80-color);
  }
}

h3 {
  font-weight: var(--semi-bold);
}

.no-available-yet {
  display: flex;
  justify-content: center;
  color: var(--yellow-color);
  border: var(--border) solid var(--yellow-color);
}

.no-available {
  color: var(--red-color);
  border: var(--border) solid var(--red-color);
}
</style>
