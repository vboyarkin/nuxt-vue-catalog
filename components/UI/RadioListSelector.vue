<template>
  <div class="radio-contaier">
    <h4><slot></slot></h4>
    <div v-for="option of options" :key="option.id" class="list-wrap">
      <input
        :id="'radio' + option.id"
        v-model="selectedOption"
        type="radio"
        :value="option.option"
      />
      <label :for="'radio' + option.id">{{ option.option }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedOption: {}
    }
  },
  computed: {},
  watch: {
    selectedOption(selectedOption) {
      this.$emit('selection-change', selectedOption)
    }
  }
}
</script>

<style lang="sass">
.radio-contaier
  display: flex
  flex-direction: column
</style>
