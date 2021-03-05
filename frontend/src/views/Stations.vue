<script>
import {mapActions} from 'vuex'

import TheNavigation from '@/components/TheNavigation.vue'
import TheDashboardContainer from '@/components/TheDashboardContainer.vue'
import VIconStroke from '@/components/VIconStroke.vue'
import StationDetail from '@/components/StationDetail.vue'

import StationListSkeleton from '@/components/StationListSkeleton.vue'
import StationDetailSkeleton from '@/components/StationDetailSkeleton.vue'

export default {
  name: 'Stations',
  components: {
    TheNavigation,
    TheDashboardContainer,
    VIconStroke,
    StationDetail,
    StationListSkeleton,
    StationDetailSkeleton
  },
  data() {
    return {
      isLoading: true,
      stations: [],
      selectedStation: null
    }
  },
  methods: {
    ...mapActions(['fetchStations']),
    isThere(station, vehicleType) {
      return station.parkingUnits?.some(p => p.vehicleType == vehicleType)
    },
    setSelectedStation(station) {
      this.selectedStation = station
    }
  },
  async mounted() {
    this.stations = await this.fetchStations()

    if (this.stations.length == 0) return

    this.selectedStation = this.stations[0]
    this.isLoading = false
  }
}
</script>

<template lang="pug">
  .stations
    TheNavigation
    TheDashboardContainer
      .wrapper
        .station-list
          h1 Station List
          h2 Track the instant status of stations
          StationListSkeleton(v-if="isLoading")
          .station-list-wrapper(v-else)
            .staion-list-item(
                v-for="station in stations"
                :key="station._id"
                :class="{'active': selectedStation.name==station.name}"
                @click='setSelectedStation(station)'
                )
                h2 {{station.name}}
                .vehicle-types
                  VIconStroke(v-if="isThere(station, 'Bike')" icon-name="Bike" icon-size="20" padding="10")
                  VIconStroke(v-if="isThere(station, 'Scooter')" icon-name="Scooter" icon-size="20" padding="10")
                  VIconStroke(v-if="isThere(station, 'Car')" icon-name="Car" icon-size="20" padding="10")
        StationDetailSkeleton(v-if="isLoading")
        div(v-else)
          StationDetail(v-if="selectedStation" :station="selectedStation")
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  column-gap: 50px;
  height: calc(100vh - 50);
  color: var(--primary-color);
}

.station-list-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 50px;
}

.staion-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 50px;
  padding: 10px;
  height: 70px;
  background: var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  border: var(--border) solid var(--white-color);
  cursor: pointer;

  h2 {
    font-weight: var(--semi-bold);
  }

  &:hover {
    border: var(--border) solid var(--primary-50-color);
  }
}

.active {
  border: var(--border) solid var(--primary-color);
  box-shadow: var(--box-shadow-25);

  &:hover {
    border: var(--border) solid var(--primary-color);
    cursor: default;
  }
}

.vehicle-types {
  display: flex;
  column-gap: 10px;
}
</style>
