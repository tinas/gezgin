<script>
import {mapActions} from 'vuex'

import VIcon from '@/components/VIcon.vue'

import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'Login',
  components: {
    VIcon,
    IconLogo
  },
  data() {
    return {
      isValid: true,
      email: '',
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions(['login']),

    async submitLogin() {
      if (!this.email) {
        this.isValid = false
        return
      }

      try {
        await this.login(this.email)

        this.$router.push('/dashboard')
      } catch (e) {
        this.errorMessage = e.response?.data?.message ?? e.message ?? 'An unknown error occured'
      }
    }
  },
  watch: {
    email(val) {
      this.errorMessage = ''

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
  .login
    .nav
      router-link(to="/")
        IconLogo(width="200" height="118")
    .container
      .form-wrap
        h1 Welcome!
        h3 Enter your info below to sign in.
        .icon-container
          VIcon(axis-y="-250" axis-x="800" size="30" icon-name="bike")
        .form
          h4(class="error-message" v-if="!isValid") Please fill email field
          h4(class="error-message" v-if="errorMessage") {{errorMessage}}
          input(placeholder="email" type="email" v-model="email")
          button(class="button" @click="submitLogin") Login
        .question
          p Don't have an account yet?
            router-link(to="register" class="link") Sign Up
        .icon-container
          VIcon(axis-y="50" axis-x="400" size="30" icon-name="car")
      .image-wrap
        img(src="@/assets/images/sign-in.png")
        .icon-container
          VIcon(axis-y="-200" axis-x="700" size="30" icon-name="scooter")
</template>

<style lang="scss" scoped>
.login {
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
