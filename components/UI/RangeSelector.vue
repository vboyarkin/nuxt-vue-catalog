<template>
  <div class="range-contaier">
    <h4><slot></slot></h4>
    <DoubleRange
      :min-value="limits.min"
      :max-value="limits.max"
      @range-change="onRangeChange"
    />
  </div>
</template>

<script>
import DoubleRange from './DoubleRange.vue'
export default {
  components: { DoubleRange },
  props: {
    limits: {
      type: Object,
      default: () => ({
        min: 0,
        max: 1000
      }),
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    }
  },
  methods: {
    onRangeChange(...args) {
      this.$emit('range-change', ...args)
    }
  }
}
</script>

<style lang="sass" scoped></style>
