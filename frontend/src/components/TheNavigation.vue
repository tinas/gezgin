<script>
import {mapState, mapActions} from 'vuex'

import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'TheNavigation',
  components: {
    IconLogo
  },
  computed: {
    ...mapState(['passengerName']),
    avatarText() {
      const nameSplit = this.passengerName.split(' ')
      let firstCharacter = ''
      let secondCharacter = ''

      switch (nameSplit.length) {
        case 1:
          return nameSplit[0].substring(0, 1).toUpperCase()
        case 2:
          firstCharacter = nameSplit[0].substring(0, 1).toUpperCase()
          secondCharacter = nameSplit[1].substring(0, 1).toUpperCase()
          return firstCharacter + secondCharacter
        default:
          return '?'
      }
    }
  },
  methods: {
    ...mapActions(['logout']),
    submitLogout() {
      this.logout()

      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
  .nav
    IconLogo(width="120" height="70")
    .menu
      router-link(to="dashboard" class="menu-item") Dashboard
      router-link(to="stations" class="menu-item") Stations
    .user
      h3(class="user-name") {{passengerName}}
      .avatar
        h3 {{avatarText}}
      button(class="logout" @click="submitLogout") Logout
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 100px;
  background: var(--white-color);
  border-bottom: 1px solid rgba(19, 56, 94, 0.1);

  @media (min-width: 1280px) {
    display: flex;
    align-items: center;
    height: 100px;
    padding-left: 100px;
    padding-right: 100px;
    background: var(--white-color);
    border-bottom: 1px solid rgba(19, 56, 94, 0.1);
  }
}

.menu {
  margin-left: 50px;
  height: 100%;
  display: flex;
  align-items: center;

  @media (min-width: 1280px) {
    margin-left: 100px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.menu-item {
  height: 100%;
  line-height: 100px;
  font-size: var(--h2-font-size);
  color: var(--primary-50-color);
  font-weight: var(--bold);
  transition: var(--transition);

  &:hover {
    color: var(--primary-80-color);
    border-bottom-color: var(--primary-80-color);
  }

  & + .menu-item {
    margin-left: 50px;
  }
}

.logo {
  width: 120px;
  height: 70px;
}

.router-link-exact-active {
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
}

.user {
  display: flex;
  align-items: center;
  margin-left: auto;
  color: var(--primary-color);
}

.user-name {
  display: none;

  @media (min-width: 1280px) {
    display: block;
  }
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 99px;
  background: var(--avatar-bg-color);
}

h3 {
  font-weight: var(--bold);
}

.logout {
  margin-left: 30px;
  padding: 10px;
  border: var(--border) solid var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    color: var(--red-color);
    border-color: var(--red-color);
  }
}
</style>
