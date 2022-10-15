<template>
  <div class="text-filler" :class="size">
    <h4><slot></slot></h4>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    }
  }
}
</script>

<style lang="sass" scoped>
.text-filler
  display: flex
  width: 100%
  color: $color-active

  align-content: center
  align-items: center
  justify-content: center

.small
  height: 15vh
  h4
    font-size: 1.3rem
.medium
  height: 47vh
  h4
    font-size: 1.4rem
.large
  height: 90vh
  h4
    font-size: 1.6rem
</style>
