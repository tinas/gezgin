<script>
import IconBike from '@/assets/icons/bike.svg'
import IconCar from '@/assets/icons/car.svg'
import IconScooter from '@/assets/icons/scooter.svg'

export default {
  name: 'VIconForCard',
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
    size: {
      type: String,
      required: true
    }
  }
}
</script>

<template lang="pug">
  .icon-wrapper
    .icon
      IconBike(v-if="iconName === 'bike'" :width="size" :height="size")
      IconCar(v-else-if="iconName === 'car'" :width="size" :height="size")
      IconScooter(v-else-if="iconName === 'scooter'" :width="size" :height="size")
</template>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 999px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: var(--primary-color);
  background: var(--white-color);
  border-radius: 999px;
}
</style>
