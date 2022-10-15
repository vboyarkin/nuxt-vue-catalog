<template>
  <div class="filter-panel">
    <Loader v-if="isFetching" size="medium" />
    <CheckboxListSelector
      property-name="category"
      :options="appliedFilters.category"
      :add-text-field="true"
      @selection-change="onCategorySelectionChange"
    >
      Категория
    </CheckboxListSelector>
    <RangeSelector
      :limits="filters.price"
      @range-change="onRangeSelectionChange"
    >
      Цена
    </RangeSelector>
    <RadioListSelector
      :options="filters.discount"
      @selection-change="onDiscountSelectionChange"
    >
      Размер скидки
    </RadioListSelector>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './UI/Loader.vue'
import CheckboxListSelector from '@/components/UI/CheckboxListSelector.vue'
import RadioListSelector from '@/components/UI/RadioListSelector.vue'
import RangeSelector from '@/components/UI/RangeSelector.vue'

export default {
  components: {
    CheckboxListSelector,
    RadioListSelector,
    RangeSelector,
    Loader
  },
  props: {
    isFetching: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      appliedFilters: 'products/appliedFilters',
      filters: 'products/filters'
    })
  },
  methods: {
    ...mapActions({ applyFilters: 'products/applyFilters' }),
    onCategorySelectionChange(category) {
      this.applyFilters({
        ...this.appliedFilters,
        category
      })
    },
    onDiscountSelectionChange(discount) {
      this.applyFilters({
        ...this.appliedFilters,
        discount
      })
    },
    onRangeSelectionChange(min, max) {
      this.applyFilters({
        ...this.appliedFilters,
        price: { min, max }
      })
    }
  }
}
</script>

<style lang="sass">
.filter-panel h4
  text-align: left
  margin-left: 1rem

.list-wrap
  text-align: left
  margin-left: 1.1rem
</style>
