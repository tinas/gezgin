<script>
import StationDetailCard from '@/components/StationDetailCard.vue'

export default {
  name: 'StationDetail',
  components: {
    StationDetailCard
  },
  props: {
    station: {
      type: Object,
      required: true
    }
  },
  computed: {
    bikes() {
      return this.filterByVehicleType('Bike')
    },
    scooters() {
      return this.filterByVehicleType('Scooter')
    },
    cars() {
      return this.filterByVehicleType('Car')
    }
  },
  methods: {
    filterByVehicleType(vehicleType) {
      return this.station.parkingUnits?.filter(p => p.vehicleType == vehicleType)
    }
  }
}
</script>

<template lang="pug">
  .station-detail
    StationDetailCard(vehicle-type="Bike" :parking-units="bikes")
    StationDetailCard(vehicle-type="Scooter" :parking-units="scooters")
    StationDetailCard(vehicle-type="Car" :parking-units="cars")
</template>

<style lang="scss" scoped>
.station-detail {
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
}
</style>
