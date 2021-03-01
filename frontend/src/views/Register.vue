<script>
import {mapActions} from 'vuex'

import VIcon from '@/components/VIcon.vue'

import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'Register',
  components: {
    VIcon,
    IconLogo
  },
  data() {
    return {
      isValid: true,
      name: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    ...mapActions(['createPassenger']),
    async submitPassenger() {
      if (!this.name || !this.email || !this.phone) {
        this.isValid = false
        return
      }

      const passengerToCreate = {
        name: this.name,
        email: this.email,
        phone: this.phone
      }

      await this.createPassenger(passengerToCreate)

      this.$router.push('/dashboard')
    }
  },
  watch: {
    name(val) {
      if (!val) {
        this.isValid = false
        return
      }

      this.isValid = true
    },
    email(val) {
      if (!val) {
        this.isValid = false
        return
      }

      this.isValid = true
    },
    phone(val) {
      if (!val) {
        this.isValid = false
        return
      }

      this.isValid = true
    }
  }
}
</script>

<template lang="pug">
  .register
    .nav
      router-link(to="/")
        IconLogo(width="200" height="118")
    .container
      .form-wrap
        h1 Join the gezgin!
        h3 Enjoy the experience of driving a Bike, Scooter and Electric Car.
        .icon-container
          VIcon(axis-y="-250" axis-x="800" size="30" icon-name="bike")
        .form
          h4(class="error-message" v-if="!isValid") Please fill all fields
          input(placeholder="name" v-model="name")
          input(placeholder="email" type="email" v-model="email")
          input(placeholder="phone" type="tel" v-model="phone")
          button(class="button" @click="submitPassenger") Register
        .question
          p Already have an account?
            router-link(to="/login" class="link") Sign In
        .icon-container
          VIcon(axis-y="10" axis-x="500" size="30" icon-name="car")
      .image-wrap
        img(src="@/assets/images/sign-up.png")
        .icon-container
          VIcon(axis-y="-200" axis-x="700" size="30" icon-name="scooter")
</template>

<style lang="scss" scoped>
.register {
  margin: 50px 200px 0 200px;
  color: var(--primary-color);
}

.container {
  margin-top: 100px;
  display: grid;
  grid-template-columns: [left] 1fr [right] 1fr;
}

.form-wrap {
  grid-column: left;
}

.form {
  margin-top: 50px;
  max-width: 300px;
}

.image-wrap {
  grid-column: right;
  justify-self: start;
  align-items: center;

  img {
    width: 500px;
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width: 150px;
  height: 40px;
  color: var(--primary-color);
  font-weight: var(--bold);
  border: var(--border) solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
}

.question {
  margin-top: 30px;
  display: flex;
  color: var(--primary-50-color);
}

.link {
  margin-left: 10px;
  color: var(--primary-50-color);
  font-weight: var(--bold);
  transition: var(--transition);

  &:hover {
    color: var(--primary-color);
  }
}

.icon-container {
  position: absolute;
}

.error-message {
  margin-bottom: 10px;
  font-weight: var(--bold);
  color: var(--red-color);
}
</style>
