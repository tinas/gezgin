<script>
import IconBike from '@/assets/icons/bike.svg'
import IconCar from '@/assets/icons/car.svg'
import IconScooter from '@/assets/icons/scooter.svg'

export default {
  name: 'VIconStroke',
  components: {
    IconBike,
    IconCar,
    IconScooter
  },
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      required: true
    },
    padding: {
      type: String,
      default: '20'
    }
  },
  computed: {
    paddingSize() {
      return {padding: `${this.padding}px`}
    }
  }
}
</script>

<template lang="pug">
  .icon(:style="paddingSize")
    IconBike(v-if="iconName === 'Bike'" :width="iconSize" :height="iconSize")
    IconCar(v-else-if="iconName === 'Car'" :width="iconSize" :height="iconSize")
    IconScooter(v-else-if="iconName === 'Scooter'" :width="iconSize" :height="iconSize")
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border) solid;
  border-radius: 999px;
}
</style>
