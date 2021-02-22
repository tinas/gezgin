<script>
import VIcon from '@/components/VIcon.vue'

import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'Login',
  components: {
    VIcon,
    IconLogo
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
          input(placeholder="name")
          input(placeholder="password")
          router-link(to="/dashboard" class="button") Login
        .question
          p Don't have an account yet?
            router-link(to="/register" class="link") Sign Up
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
</style>
