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
      required: true,
      validator: function(value) {
        return ['bike', 'scooter', 'car'].indexOf(value) !== -1
      }
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
    IconBike(v-if="iconName === 'bike'" :width="iconSize" :height="iconSize")
    IconCar(v-else-if="iconName === 'car'" :width="iconSize" :height="iconSize")
    IconScooter(v-else-if="iconName === 'scooter'" :width="iconSize" :height="iconSize")
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
