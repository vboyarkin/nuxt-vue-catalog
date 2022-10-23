<template>
  <button class="cart-btn" @click="$emit('click', $event)">
    <slot>Button</slot>
  </button>
</template>

<style lang="sass" scoped>
button
  color: white
  background: $color-active
  border: none
  border-radius: 3px
  padding: 8px 22px
  margin: 0px
  font-family: inherit
  cursor: pointer
  @include animation-bg
</style>
