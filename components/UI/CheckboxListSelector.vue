<template>
  <div class="checkbox-contaier">
    <h4><slot></slot></h4>
    <TextField
      v-if="addTextField"
      :value="categoriesTextFilter"
      @input="onTextFieldValueChange"
    />
    <div v-for="(item, i) of filteredItems" :key="item.id" class="list-wrap">
      <input
        :id="'checkbox' + item.id"
        :checked="item.checked"
        type="checkbox"
        @click="(e) => onCheckboxClick(e, i)"
      />
      <label :for="'checkbox' + item.id">{{ item.option }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TextField from './TextField.vue'

export default {
  components: {
    TextField
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    addTextField: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  // data() {
  //   return {
  //     textFilter: ''
  //   }
  // },
  computed: {
    ...mapGetters({
      categoriesTextFilter: 'products/categoriesTextFilter'
    }),
    filteredItems() {
      return this.options.filter((x) =>
        x.option
          .toLowerCase()
          .includes(this.categoriesTextFilter.toLowerCase().trim())
      )
    }
  },
  methods: {
    ...mapMutations({
      updateCategoriesTextFilter: 'products/updateCategoriesTextFilter'
    }),
    onTextFieldValueChange(value) {
      this.updateCategoriesTextFilter(value)
    },
    onCheckboxClick(e, i) {
      const newCheckedOptions = this.options.slice()
      newCheckedOptions[i] = {
        ...newCheckedOptions[i],
        checked: !newCheckedOptions[i].checked
      }

      this.$emit('selection-change', newCheckedOptions)
    }
  }
}
</script>

<style lang="sass" scoped>
.checkbox-contaier
  display: flex
  flex-direction: column
</style>
