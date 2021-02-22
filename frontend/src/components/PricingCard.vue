<script>
import VIconForCard from '@/components/VIconForCard.vue'

export default {
  name: 'PricingCard',
  components: {
    VIconForCard
  },
  props: {
    title: {
      type: String,
      required: true,
      validator: function(value) {
        return ['Bike', 'Scooter', 'Car'].indexOf(value) !== -1
      }
    },
    content: {
      type: String,
      required: true
    },
    pricing: {
      type: String,
      required: true
    },
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
  .card
    .title
      h1 {{title}}
    .content
      h3 {{content}}
      .icon-wrapper
        .icon
          VIconForCard(:icon-name="iconName" size="50")
    .pricing
      h2 {{pricing}}
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 30px;
  width: 450px;
  min-height: 370px;
  color: var(--white-color);
  background: var(--primary-color);
  border-radius: 0.7em;
  box-shadow: var(--box-shadow);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-weight: var(--bold);
}

.content {
  display: flex;
}

.pricing {
  position: absolute;
  bottom: 30px;
}
</style>
