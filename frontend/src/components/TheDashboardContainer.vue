<script>
export default {
  name: 'TheDashboardContainer'
}
</script>

<template lang="pug">
  .dashboard-container
    slot
</template>

<style lang="scss">
body {
  background: var(--dashboard-bg);
}
</style>

<style lang="scss" scoped>
.dashboard-container {
  margin: 20px;
}
</style>
