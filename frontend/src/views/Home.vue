<script>
import PricingCard from '@/components/PricingCard.vue'
import VIcon from '@/components/VIcon.vue'

import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'Home',
  components: {
    PricingCard,
    VIcon,

    //svg
    IconLogo
  }
}
</script>

<template lang="pug">
  .home
    .icon-container
      VIcon(axisY="100" axisX="700" size="30" iconName="direction")
    .nav
      router-link(to="/")
        IconLogo(width="200" height="118")
      .menu
          router-link(to="login" class="button") Sign In
          router-link(to="register" class="button") Sign Up
    .container
      .text-intro
        h1
          | Bike, Scooter and
          br
          | Car rental in one app
        h3 Nowadays, when we want to rent a bike, scooter or car, we constantly use different applications. So why don't we collect all these in one app?
        router-link(to="register" class="button")
          | Let's Go!
        .icon-container
          VIcon(axis-y="80" axis-x="300" size="30" icon-name="world")
      .intro-right
        img(src="@/assets/images/intro.png" class="image-intro")
        .icon-container
          VIcon(axis-y="80" axis-x="500" size="30" icon-name="route")
    .container
      img(src="@/assets/images/demo.png" class="image-demo")
      .text-demo
        h1 How does it work?
        h3 First of all, you must register with our application. You can choose the vehicle you want according to the distance and make a booking.
        h3 After the booking, you can leave the vehicle at the station you rented or at a different station.
        h3 You pay a specific fee for every minute you use.
        .icon-container
          VIcon(axis-y="50" axis-x="50" size="30" icon-name="station")
    .pricing
      PricingCard(title="Bike" content="If you enjoy pedaling. The bike is for you." pricing="10 cents per minute." icon-name="Bike")
      PricingCard(title="Scooter" content="The scooters are powered entirely by electricity." pricing="25 cents per minute." icon-name="Scooter")
      PricingCard(title="Car" content="If you are interested in electric cars and want to have this experience." pricing="40 cents per minute." icon-name="Car")
    footer
      p gezgin ©2021 Ahmet Tınastepe
</template>

<style lang="scss" scoped>
.home {
  margin: 50px 200px 0 200px;
  color: var(--primary-color);
}

.nav {
  display: flex;
  justify-content: space-between;
}

.container {
  margin-top: 100px;
  display: grid;
  grid-template-columns: [left] 1fr [right] 1fr;

  & + .container {
    margin-top: 200px;
  }
}

.icon-container {
  position: absolute;
}

.menu {
  display: flex;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 52px;
  color: var(--primary-color);
  font-weight: var(--bold);
  border: var(--border) solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  & + .button {
    margin-left: 20px;
  }

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
}

h3 {
  line-height: 1.4;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-right: 100px;
}

.text-intro {
  grid-column: left;
  padding-top: 80px;
}

.text-demo {
  grid-column: right;
}

.intro-right {
  grid-column: right;
  align-items: start;
  justify-self: center;
}

.image-intro {
  width: 500px;
}

.image-demo {
  grid-column: left;
  justify-self: start;
  align-self: center;
  width: 600px;
}

.pricing {
  display: flex;
  justify-content: space-between;
  margin-top: 200px;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 200px;
  padding-bottom: 24px;
  font-weight: var(--bold);
}
</style>
