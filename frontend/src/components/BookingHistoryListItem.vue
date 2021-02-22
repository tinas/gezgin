<script>
import VIconStroke from '@/components/VIconStroke.vue'

export default {
  name: 'BookingHistoryListItem',
  components: {
    VIconStroke
  },
  data() {
    return {
      isActive: false
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
        h2(class="vehicle-name") Razor E300
        .booking-info-line
          h3(class="line-text") Starting Station:
            h3 Kadıköy
          h3(class="line-text") Finished Station:
            h3 Tuzla
        .booking-info-line
          h3(class="line-text") Total Time:
            h3 30 minutes
          h3(class="line-text") Total Amount:
            h3 8$
      .vehicle-icon
        VIconStroke(icon-name="bike" icon-size="60")
    div(v-else class="collapse")
      .vehicle
        VIconStroke(icon-name="bike" icon-size="20" padding="10")
        h2 Razor E300
      .route
        h2 Kadıköy > Tuzla
</template>

<style lang="scss" scoped>
.list-item-container {
  padding: 20px;
  cursor: pointer;
  background: var(--white-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    color: var(--primary-80-color);
  }
}

.list-item-container-active {
  box-shadow: var(--box-shadow-25);
}

.expand {
  display: grid;
  grid-template-areas: 'text icon';
  grid-template-columns: 1fr 200px;
}

.booking-info {
  grid-column: text;

  h2 {
    color: var(--primary-color);
    font-weight: var(--black);
    font-size: 2.2rem;
  }
}

.vehicle {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.vehicle-name {
  margin-bottom: 20px;
}

.vehicle-icon {
  grid-column: icon;
  justify-self: end;
  align-self: center;
  color: var(--primary-color);
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

.booking-info-line {
  display: flex;
  column-gap: 50px;

  & + .booking-info-line {
    margin-top: 20px;
  }
}

.collapse {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-weight: var(--bold);
}
</style>
