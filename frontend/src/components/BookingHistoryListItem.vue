<script>
import {format, formatDistanceStrict, formatDistanceToNowStrict} from 'date-fns'

import VIconStroke from '@/components/VIconStroke.vue'

export default {
  name: 'BookingHistoryListItem',
  components: {
    VIconStroke
  },
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    createdAt() {
      return format(new Date(this.booking.createdAt), 'yyyy-MM-dd / HH:mm')
    },
    updatedAt() {
      return format(new Date(this.booking.updatedAt), 'yyyy-MM-dd / HH:mm')
    },
    elapsedTime() {
      return formatDistanceToNowStrict(new Date(this.booking.createdAt), {addSuffix: true})
    },
    totalbookingTime() {
      return formatDistanceStrict(new Date(this.booking.updatedAt), new Date(this.booking.createdAt), {unit: 'minute'})
    }
  },
  methods: {
    setActive() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<template lang="pug">
  .list-item-container(@click="setActive" :class="{'list-item-container-active':isActive}")
    div(v-if="isActive" class="expand")
      .booking-info
        h2(class="route") {{booking.origin.name}} > {{booking.destination.name}}
        .booking-info-line
          h2 Route
          .line-wrapper
            h3(class="line-text") Starting Station:
              h3 {{booking.origin.name}}
            h3(class="line-text") Finished Station:
              h3 {{booking.destination.name}}
        .booking-info-line
          h2 Date
          .line-wrapper
            h3(class="line-text") Starting Date:
              h3 {{createdAt}}
            h3(class="line-text") Due Date:
              h3 {{updatedAt}}
        .booking-info-line
          h2 Totals
          .line-wrapper
            h3(class="line-text") Total Time:
              h3 {{totalbookingTime}}
            h3(class="line-text") Total Price:
              h3 ${{booking.totalPrice}}
      .vehicle-icon
        VIconStroke(:icon-name="booking.parkingUnit.vehicleType" icon-size="150")
    div(v-else class="collapse")
      .vehicle
        VIconStroke(:icon-name="booking.parkingUnit.vehicleType" icon-size="20" padding="10")
        h2 {{booking.origin.name}} > {{booking.destination.name}}
      h2 {{elapsedTime}}
</template>

<style lang="scss" scoped>
.list-item-container {
  padding: 20px;
  cursor: pointer;
  background: var(--white-color);
  border-radius: var(--border-radius);
}

.list-item-container-active {
  box-shadow: var(--box-shadow-25);
}

.expand {
  display: grid;
  grid-template-areas: 'text icon';
  grid-template-columns: 1fr 300px;
}

.booking-info {
  grid-column: text;
}

.booking-info-line {
  display: flex;
  flex-direction: column;
  column-gap: 50px;

  & + .booking-info-line {
    margin-top: 20px;
  }
}

.line-wrapper {
  display: flex;
  column-gap: 50px;
  margin-top: 10px;
}

.vehicle {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.route {
  margin-bottom: 30px;
  color: var(--primary-color);
  font-weight: var(--black);
}

.vehicle-icon {
  grid-column: icon;
  justify-self: center;
  align-self: center;
  color: var(--primary-80-color);
}

.content {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.line-text {
  display: flex;

  h3 {
    margin-left: 16px;
    font-weight: var(--bold);
    color: var(--primary-color);
  }
}

.collapse {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);

  &:hover {
    color: var(--primary-color);
  }
}

h2 {
  font-weight: var(--bold);
}
</style>
