<script>
import VIconStroke from '@/components/VIconStroke.vue'

export default {
  name: 'BookingSummaryCard',
  components: {
    VIconStroke
  },
  props: {
    cardTitle: {
      type: String,
      required: true,
      validator: function(value) {
        return ['Bike', 'Scooter', 'Car'].indexOf(value) !== -1
      }
    },
    totalBooking: {type: Number, default: 0},
    totalAmount: {type: Number, default: 0},
    iconName: {
      type: String,
      required: true,
      validator: function(value) {
        return ['bike', 'scooter', 'car'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<template lang="pug">
  .booking-summary-card
      .text-wrapper
        h1 {{cardTitle}}
        .total
          h3(class="title") Total Booking:
          h3(class="value") {{totalBooking}}
        .total
          h3(class="title") Total Amount:
          h3(class="value") {{totalAmount}}$
      .image-wrapper
        VIconStroke(:icon-name="iconName" icon-size="50" class="icon-container")
</template>

<style lang="scss" scoped>
.booking-summary-card {
  display: grid;
  grid-template-areas: 'text image';
  grid-template-columns: 1fr 130px;
  gap: 50px;
  width: 100%;
  border-radius: var(--border-radius);
  background: var(--white-color);
  box-shadow: var(--box-shadow-25);
}

.text-wrapper {
  grid-column: text;
  margin-left: 20px;
  margin-bottom: 20px;
}

h1 {
  color: var(--primary-color);
}

.image-wrapper {
  grid-column: image;
  align-self: center;
}

.icon-container {
  width: 115px;
  height: 115px;
  color: var(--primary-color);
}

.total {
  display: flex;
  font-weight: var(--bold);

  & + .total {
    margin-top: 20px;
  }
}

.title {
  color: var(--primary-80-color);
}

.value {
  margin-left: 10px;
}
</style>
