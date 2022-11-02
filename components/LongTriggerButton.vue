<template>
  <div class="container">
    <button @click="trigger">
      <span :class="{ rotated: shouldRotate }">
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    rotateContent: {
      type: Boolean,
      default: false
    },
    rotatedByDefault: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldRotate() {
      return this.rotateContent && this.value !== this.rotatedByDefault
    }
  },
  methods: {
    trigger() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 28px

button
  font-family: consolas
  font-size: 30px
  color: rgba(0,0,0, 0.35)
  border: none
  background: none
  cursor: pointer
  padding: 0px
  margin: 0px
  width: 100%
  height: 100%
  padding-left: 5px
  @include animation-bg(rgb(0 0 0 / 3%))

span
  display: block
  transition: transform .15s ease-in-out
.rotated
  transform: rotate(180deg)
</style>
