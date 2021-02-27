<script>
import IconLogo from '@/assets/svg/logo.svg'

export default {
  name: 'TheNavigation',
  components: {
    IconLogo
  }
}
</script>

<template lang="pug">
  .nav
    IconLogo(width="120" height="70")
    .menu
      router-link(to="/dashboard" class="menu-item") Dashboard
    .user
      h3(class="user-name") Ahmet Tınastepe
      .avatar
        h3 AT
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
</style>
