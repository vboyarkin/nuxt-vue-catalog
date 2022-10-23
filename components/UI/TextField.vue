<template>
  <div>
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="onValueChange"
    />
    <button @click="resetValue">&#x2715;</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    resetValue() {
      this.$emit('input', '')
    },
    onValueChange(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="sass" scoped>
div
  position: relative

input
  border: solid 1px $color-inactive
  border-radius: 4px
  padding: 1rem 1.2rem
  margin-bottom: .8rem
  font-size: inherit
  width: 100%
  box-sizing: border-box
  flex-grow: 1

button
  background: none
  border: none
  position: absolute
  right: 3px
  top: 25%
  cursor: pointer
  color: $color-inactive
  padding: 0 8px 0 0
  @include animation-color-cnahge($color-active)
</style>
