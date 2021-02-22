<script>
import IconBike from '@/assets/icons/bike.svg'
import IconCar from '@/assets/icons/car.svg'
import IconScooter from '@/assets/icons/scooter.svg'
import IconDirection from '@/assets/icons/direction.svg'
import IconRoute from '@/assets/icons/travel.svg'
import IconGasStation from '@/assets/icons/gas-station.svg'
import IconWorld from '@/assets/icons/world.svg'

export default {
  name: 'VIcon',
  components: {
    IconBike,
    IconCar,
    IconScooter,
    IconDirection,
    IconRoute,
    IconGasStation,
    IconWorld
  },
  props: {
    axisY: {type: String, requied: true},
    axisX: {type: String, requied: true},
    size: {type: String, requied: true},
    iconName: {type: String, requied: true}
  },

  computed: {
    iconPosition() {
      return {
        marginTop: `${this.axisY}px`,
        marginLeft: `${this.axisX}px`
      }
    }
  }
}
</script>

<template lang="pug">
  .icon(:style="iconPosition")
    IconBike(:width="size" :height="size" v-if="iconName === 'bike'")
    IconCar(:width="size" :height="size" v-else-if="iconName === 'car'")
    IconScooter(:width="size" :height="size" v-else-if="iconName === 'scooter'")
    IconDirection(:width="size" :height="size" v-else-if="iconName === 'direction'")
    IconRoute(:width="size" :height="size" v-else-if="iconName === 'route'")
    IconGasStation(:width="size" :height="size" v-else-if="iconName === 'station'")
    IconWorld(:width="size" :height="size" v-else-if="iconName === 'world'")
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 999px;
  color: var(--primary-color);
  box-shadow: var(--box-shadow);
}
</style>
