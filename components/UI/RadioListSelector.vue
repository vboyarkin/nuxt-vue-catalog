<template>
  <div class="radio-contaier">
    <h4><slot></slot></h4>
    <div v-for="option of options" :key="option.id" class="list-wrap">
      <input
        :id="'radio' + option.id"
        v-model="selectedOption"
        :name="name"
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
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    checkedOption: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      selectedOption: {}
    }
  },
  watch: {
    selectedOption(selectedOption) {
      this.$emit('selection-change', selectedOption)
    },
    checkedOption(value) {
      this.selectedOption = value
    }
  },
  methods: {
    onChange(e) {
      this.$emit('selection-change', e.target.value)
    }
  }
}
</script>

<style lang="sass">
.radio-contaier
  display: flex
  flex-direction: column
</style>
