<template>
  <div class="wrap">
    <div class="text-container">
      <input v-model="leftValue" type="number" :placeholder="minValue" />
      <span class="dash">—</span>
      <input v-model="rightValue" type="number" :placeholder="maxValue" />
    </div>

    <div class="flex-container">
      <div class="range-container" :style="cssVars">
        <input
          v-model="leftValue"
          type="range"
          :min="minValue"
          :max="maxValue"
        />
        <input
          v-model="rightValue"
          type="range"
          :min="minValue"
          :max="maxValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      leftValue: this.minValue,
      rightValue: this.maxValue
    }
  },
  computed: {
    cssVars() {
      return {
        '--active-interval-offset':
          (100 * (this.leftValue - this.minValue)) /
            (this.maxValue - this.minValue) +
          '%',
        '--interval-width':
          (100 * (this.rightValue - this.leftValue)) /
            (this.maxValue - this.minValue) +
          '%'
      }
    }
  },
  watch: {
    minValue(val) {
      this.leftValue = val
    },
    maxValue(val) {
      this.rightValue = val
    },
    leftValue() {
      this.leftValue = Number(this.leftValue)

      if (this.leftValue > this.rightValue) {
        const t = this.leftValue
        this.leftValue = this.rightValue
        this.rightValue = t
      }

      this.$emit('range-change', this.leftValue, this.rightValue)
    },
    rightValue() {
      this.rightValue = Number(this.rightValue)

      if (this.rightValue < this.leftValue) {
        const t = this.rightValue
        this.rightValue = this.leftValue
        this.leftValue = t
      }

      this.$emit('range-change', this.leftValue, this.rightValue)
    }
  }
}
</script>

<style lang="sass" scoped>
$thumb-diameter: 1em
$color-thumb-bg: white
$input-color: #000
$input-text-width: 6em

@mixin track()
  background: none

@mixin thumb()
  border: solid 1px $color-active
  border-radius: 50%
  width: $thumb-diameter
  height: $thumb-diameter
  background: $color-thumb-bg
  pointer-events: auto
  cursor: pointer

.range-container
  display: grid
  margin: 1em 0em
  background: linear-gradient(0deg, transparent 0 45%, $color-inactive 45% 55%, transparent 55%)
  z-index: 2

  // active interval line
  &::after
    content: ''
    background: linear-gradient(0deg, transparent 0 45%, $color-active 45% 55%, transparent 55%)
    grid-column: 1
    grid-row: 2
    z-index: 2
    width: var(--interval-width)
    margin-left: var(--active-interval-offset)

input[type="range"]
  color: $input-color
  font: inherit
  grid-column: 1
  grid-row: 2
  background: none
  margin: 0
  font: inherit
  color: $input-color
  pointer-events: none
  z-index: 3

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb,
  &
    -webkit-appearance: none

  &::-webkit-slider-runnable-track
    @include track
  &::-moz-range-track
    @include track

  &::-webkit-slider-thumb
    @include thumb
  &::-moz-range-thumb
    @include thumb

input[type="number"]
  border: solid 1px $color-inactive
  border-radius: 4px
  padding: 1rem 1.2rem
  font-size: inherit
  width: 1px

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type=number]
  -moz-appearance: textfield

.text-container
  display: flex
  align-items: center
  input
    flex-grow: 1

span.dash
  margin: 5px
  color: $color-inactive
</style>
