<template>
  <div class="centered">
    <div class="wrap">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="sass">
body
  font-family: $main-font
  margin: 0px
  padding: 0px
</style>

<style lang="sass" scoped>
.centered
  display: flex
  justify-content: center
  width: 100%

.wrap
  @include size-small-up
    max-width: 360px
  @include size-medium-up
    max-width: 720px
  @include size-desktop-up
    max-width: 1024px
  @include size-large-up
    max-width: 1264px
</style>
